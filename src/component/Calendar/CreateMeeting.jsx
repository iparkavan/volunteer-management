import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from 'primereact/calendar';

import CalendarIcon from '../../assets/images/calender_1x.png';
import SuccessTik from '../../assets/images/blue_tik1x.png';
import ClockIcon from '../../assets/icons/clock.svg';
import PlusIcon from '../../assets/images/plus_temp.png';
import CancelIcon from '../../assets/images/cancel-colour1x.png';
import Tooltip from '../../shared/Tooltip';
import { CreateMeetingFields } from '../../utils/formFields';
import { Button } from '../../shared';
import { getProgramMentees } from '../../services/userprograms';
import MuiModal from '../../shared/Modal';
import DataTable from '../../shared/DataGrid';
import { CalendarMentee } from '../../mock';
import {
  createCalendarEvent,
  getCalendarEvent,
  updateCalendarEvent,
} from '../../services/scheduler';
import { calendarStatus } from '../../utils/constant';

export default function CreateMeeting() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const id = searchParams.get('id');
  const { programMenteeList, loading: menteeLoading } = useSelector(
    (state) => state.userPrograms
  );
  const {
    loading: calendarLoading,
    status,
    getEvent,
  } = useSelector((state) => state.events);
  const [internalLoading, setInternalLoading] = useState(false);
  const [createMeetingLoading, setCreateMeetingLoading] = useState(false);
  const [addMenteeModal, setMentalModal] = useState(false);
  const [datePopup, setDatepopup] = useState({
    type: '',
    show: false,
    title: '',
  });
  const [customSelect, setCustomSelect] = useState({
    type: '',
    start_date: '',
    end_date: '',
    repeat_time: '',
    repeat_type: '',
  });
  const [eventSelect, setEventSelect] = useState(null);
  const today = new Date();

  const [dateFormat, setDateFormat] = useState({});
  const [dateError, setDateError] = useState({ date: '', repeat: '' });
  const [menteeAllList, setAllMenteeList] = useState([]);
  const dispatch = useDispatch();
  const [selectedDays, setSelectedDays] = useState([]);
  const [monthlyOn, setMonthlyOn] = useState();

  useEffect(() => {
    if (getEvent && id) {
      setCustomSelect({
        type: getEvent.meeting_type || '',
        start_date: getEvent.start_date || '',
        end_date: getEvent.end_date || '',
        repeat_time: getEvent.interval || '',
        repeat_type: getEvent.req || '',
      });
      setSelectedDays(getEvent.byday ? getEvent.byday.split(',') : []);
    }
  }, [getEvent, id]);

  const daysOfWeek = [
    { key: 'SU', value: 'S' },
    { key: 'MO', value: 'M' },
    { key: 'TU', value: 'T' },
    { key: 'WE', value: 'W' },
    { key: 'TH', value: 'T' },
    { key: 'FR', value: 'F' },
    { key: 'SA', value: 'S' },
  ];
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getFieldState,
    getValues,
    setError,
    setValue,
  } = useForm({
    // defaultValues: {
    //   title: getEvent?.title || '',
    //   date: getEvent?.date || '',
    //   start: getEvent?.start || '',
    //   end: getEvent?.end || '',
    //   notification_time: getEvent?.notification_time || '',
    //   date_category: getEvent?.date_category || '',
    //   mentee: getEvent.attendees?.map((item) => item.full_name),
    // },
  });

  // setDateFormat({
  //   ...dateFormat,
  //   [field.name]: e.value,
  // });

  function formatTimeToDate(inputTime, date = new Date()) {
    if (!inputTime) return null;

    const [hours, minutes, seconds] = inputTime.split(':').map(Number);

    date.setHours(hours, minutes, seconds || 0, 0);

    return date;
  }

  useEffect(() => {
    if (getEvent && id && location.pathname === '/edit-meeting') {
      // Object.keys(getEvent).forEach((key) => {
      //   setValue(key, getEvent[key]);
      // });
      const resetFields = {
        id: getEvent.id || '',
        date: getEvent.date || '',
        created_by: getEvent.created_by || '',
        updated_by: getEvent.updated_by || '',
        attendees: getEvent.attendees?.join(', ') || '', // Convert array to comma-separated string
        title: getEvent.title || '',
        start_date: getEvent.start_date || '',
        date_category: getEvent.date_category || '',
        start: getEvent.start || '',
        end: getEvent.end || '',
        end_date: getEvent.end_date || '',
        notification_time: getEvent.notification_time || '',
        notification_type: getEvent.notification_type || '',
        guests: getEvent.guests?.join(', ') || '', // Convert array to comma-separated string
        meet: getEvent.meet || '',
        // status: getEvent.status || '',
        calendar_event_id: getEvent.calendar_event_id || '',
        is_deleted: getEvent.is_deleted || false,
        meeting_type: getEvent.meeting_type || '',
        meeting_active: getEvent.meeting_active || false,
        req: getEvent.req || '',
        interval: getEvent.interval || '',
        byday: getEvent.byday || '',
        recurrence: getEvent.recurrence || '',
        created_at: getEvent.created_at || '',
        updated_at: getEvent.updated_at || '',
        mentee: getEvent.attendees?.join(','), // Convert mentee field appropriately if needed
      };

      reset(resetFields);

      // reset({
      //   ...getEvent,

      //   mentee: getEvent.attendees?.join(','),
      // });
      setDateFormat({
        ...dateFormat,
        start: formatTimeToDate(getEvent?.start),
        end: formatTimeToDate(getEvent?.end),
      });

      if (getEvent.attendees) {
        const attendeeNames = getEvent.attendees.map((item) => item);
        setAllMenteeList(attendeeNames);
      }
    }
  }, [getEvent, reset]);

  const timeFormat = (utcTimestamp) => {
    let timeString = '';
    const t = utcTimestamp.toString().split(' ');
    if (t.length > 4) {
      let time = t[4].split(':');
      timeString = `${time[0]}:${time[1]}`;
    }
    return timeString;
  };

  function getCurrentWeekAndDay(date = new Date()) {
    const currentDayOfMonth = date.getDate();
    const currentDayOfWeek = date.getDay();
    // console.log(currentDayOfMonth, currentDayOfWeek);

    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeekStart = startOfMonth.getDay();

    const adjustedDate = currentDayOfMonth + dayOfWeekStart;

    const weekNumber = Math.ceil(adjustedDate / 7);

    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDayName = daysOfWeek[currentDayOfWeek];

    return { weekNumber, currentDayName };
  }

  const { weekNumber, currentDayName } = getCurrentWeekAndDay();

  const todayDate = (selectedDate) => {
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();

    // Format the year as YY
    const shortYear = year.toString().padStart(2, '0');

    // Format month and day with leading zeros if necessary
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');

    // Combine into YY-mm-dd format
    return `${shortYear}-${formattedMonth}-${formattedDay}`;
  };

  const handleDaySelect = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const onSubmit = (data) => {
    let attendees = [];
    data.attendees.forEach((attendee) => {
      attendees.push(attendee.email);
    });

    let allGuest = [];
    if (data.guests !== '') {
      let guestList = data.guests.split(',') || [];
      guestList.forEach((guest) => {
        allGuest.push(guest);
      });
    }

    const validSelectedDays = Array.isArray(selectedDays) ? selectedDays : [];

    let apiData = {
      ...data,
      start: timeFormat(data.start),
      end: timeFormat(data.end),
      attendees: attendees,
      guests: allGuest,
      start_date: todayDate(customSelect.start_date),
      end_date:
        !customSelect.end_date || datePopup.type === 'do_not_repeat'
          ? todayDate(customSelect.start_date)
          : todayDate(customSelect.end_date),
      byday: validSelectedDays.join(','),
      req: customSelect.repeat_type,
      interval: customSelect.repeat_time,
      monthly_day: monthlyOn,
    };

    console.log(data.event);

    if (apiData && id) {
      return dispatch(
        updateCalendarEvent({
          apiData,
          eventSelect: data.event,
          id,
          status: searchParams.get('status'),
        })
      );
    }

    return dispatch(createCalendarEvent(apiData));
  };

  const onDraftSubmit = (data) => {
    let attendees = [];
    data.attendees.forEach((attendee) => {
      attendees.push(attendee.email);
    });

    let allGuest = [];
    if (data.guests !== '') {
      let guestList = data.guests.split(',') || [];
      guestList.forEach((guest) => {
        allGuest.push(guest);
      });
    }

    const validSelectedDays = Array.isArray(selectedDays) ? selectedDays : [];

    let apiData = {
      ...data,
      start: timeFormat(data.start),
      end: timeFormat(data.end),
      attendees: attendees,
      guests: allGuest,
      status: 'draft',
      start_date: todayDate(customSelect.start_date),
      end_date:
        !customSelect.end_date || datePopup.type === 'do_not_repeat'
          ? todayDate(customSelect.start_date)
          : todayDate(customSelect.end_date),
      byday: validSelectedDays.join(','),
      req: customSelect.repeat_type,
      interval: customSelect.repeat_time,
      monthly_day: monthlyOn,
    };

    console.log(apiData);

    if (apiData && eventSelect && id) {
      dispatch(
        updateCalendarEvent({
          apiData,
          eventSelect,
          id,
          status: searchParams.get('status'),
        })
      );
    }

    dispatch(createCalendarEvent(apiData));
  };

  useEffect(() => {
    if (status === calendarStatus.create) {
      setCreateMeetingLoading(true);
    }
  }, [status]);

  useEffect(() => {
    if (location.pathname === '/edit-meeting' && id) {
      dispatch(getCalendarEvent({ id, status: searchParams.get('status') }));
    }
  }, [id]);

  useEffect(() => {
    if (internalLoading) {
      setTimeout(() => {
        setInternalLoading(false);
        setCreateMeetingLoading(true);
      }, [2000]);
    }
  }, [internalLoading]);

  useEffect(() => {
    if (createMeetingLoading) {
      setTimeout(() => {
        setCreateMeetingLoading(false);
        navigate('/calendar');
      }, [3000]);
    }
  }, [createMeetingLoading]);

  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  const closeDatePopup = () => {
    setDatepopup({ type: '', show: false, title: '' });
  };

  const resetSelectedDate = () => {
    setCustomSelect({
      type: '',
      start_date: '',
      end_date: '',
      repeat_time: '',
      repeat_type: '',
    });
  };

  const handleDate = (value) => {
    // resetSelectedDate()

    let title;

    switch (value) {
      case 'do_not_repeat':
        title = 'Does Not repeat';
        break;
      case 'daily':
        title = 'Daily';
        break;
      case 'every_week':
        title = 'Every Weekday (Monday to Friday)';
        break;
      case 'weekly':
        title = 'Weekly';
        break;
      case 'custom':
        title = 'Custom';
        break;
    }

    // setCustomSelect({
    //   type: "",
    //   start_date: new Date(),
    //   end_date: new Date(),
    //   repeat_time: "",
    //   repeat_type: "",
    // });
    setCustomSelect((prevState) => ({
      ...prevState,
      type: value,
      start_date: prevState.start_date || new Date(),
      end_date:
        value === 'do_not_repeat'
          ? prevState.start_date || new Date()
          : prevState.end_date || new Date(),
    }));
    setDateError({ date: '', repeat: '' });
    if (
      ['custom', 'daily', 'every_week', 'weekly', 'do_not_repeat'].includes(
        value
      )
    ) {
      setDatepopup({
        type: value,
        show: true,
        title: title,
      });
    } else {
      closeDatePopup();
    }
  };

  const handleDateSelection = () => {
    if (datePopup.type === 'do_not_repeat' && customSelect.date === '') {
      setDateError({ date: 'This field is required' });
      return;
    }

    if (datePopup.type === 'custom' && customSelect.date === '') {
      setDateError({ date: 'This field is required' });
      return;
    }
    closeDatePopup();
  };

  const handleDateClick = () => {
    document.querySelector('.p-datepicker')?.classList.add('calendar-date');
  };

  const handleCancelPopup = () => {
    closeDatePopup();
    setValue('date', '');
  };

  const footerAction = (key) => {
    setMentalModal(false);
  };

  const handleAddPopupData = (value) => {
    if (value.length) {
      setValue('attendees', value);
      setMentalModal(false);
      setAllMenteeList((prev) => [...prev, ...value]);
    }
  };

  // console.log('menteeAllList', menteeAllList);

  const CustomFooterStatusComponent = (props) => {
    return (
      <div className='flex gap-6 justify-center items-center py-4'>
        <button
          onClick={() => setMentalModal(false)}
          className='py-3 px-6 w-[16%]'
          style={{
            border: '1px solid rgba(29, 91, 191, 1)',
            borderRadius: '3px',
            color: 'rgba(29, 91, 191, 1)',
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => handleAddPopupData(props.selectedRows)}
          className='text-white py-3 px-6 w-[16%]'
          style={{
            background:
              'linear-gradient(93.13deg, #00AEBD -3.05%, #1D5BBF 93.49%)',
            borderRadius: '3px',
          }}
        >
          Add Volunteer
        </button>
      </div>
    );
  };

  useEffect(() => {
    dispatch(getProgramMentees());
  }, []);

  const handleAction = () => {
    setMentalModal(true);
  };

  const submitButtonName =
    location.pathname === '/edit-meeting' ? 'Update Meeting' : 'Create Meeting';

  return (
    <div className='dashboard-content px-8 mt-10'>
      <div
        style={{
          boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)',
          borderRadius: '10px',
        }}
      >
        <div className='title flex justify-between py-3 px-4 border-b-2 items-center'>
          <div className='flex gap-4'>
            <h4>
              {location.pathname === '/edit-meeting'
                ? 'Edit Meeting'
                : 'Create New Meeting'}
            </h4>
          </div>
          <div className='flex gap-20 items-center'>
            <Tooltip title='Cancel'>
              <img
                className='cursor-pointer'
                onClick={() => navigate('/calendar')}
                src={CancelIcon}
                alt='CancelIcon'
              />
            </Tooltip>
          </div>
        </div>

        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={
            datePopup.show || menteeLoading | internalLoading || calendarLoading
          }
        >
          {(menteeLoading || internalLoading || calendarLoading) && (
            <CircularProgress color='inherit' />
          )}
          {datePopup.show && !menteeLoading && (
            <div className='popup-content w-1/4 bg-white flex flex-col gap-2'>
              <div className='py-5 w-full px-4'>
                <div
                  className='title flex justify-between py-3 px-4 border-b-2 items-center'
                  style={{ color: 'rgba(29, 91, 191, 1)' }}
                >
                  <div className='flex gap-4 font-semibold'>
                    <h4>{datePopup.title}</h4>
                  </div>
                  <div className='flex gap-20 items-center'>
                    <Tooltip title='Cancel'>
                      <img
                        className='cursor-pointer'
                        onClick={() => handleCancelPopup()}
                        src={CancelIcon}
                        alt='CancelIcon'
                      />
                    </Tooltip>
                  </div>
                </div>
                <div className='pt-4'>
                  <div className='relative'>
                    <label className='block tracking-wide text-gray-700 text-xs font-bold mb-2'>
                      {datePopup.type !== 'do_not_repeat'
                        ? 'Start Date'
                        : 'Date'}
                    </label>
                    <div className='relative'>
                      <Calendar
                        className='calendar-control input-bg'
                        // value={customSelect.start_date}
                        value={
                          customSelect.start_date
                            ? new Date(customSelect.start_date)
                            : null
                        }
                        onChange={(e) => {
                          const selectedStartDate = e.value;
                          setCustomSelect((prevState) => ({
                            ...prevState,
                            start_date: selectedStartDate,
                            end_date:
                              prevState.end_date &&
                              prevState.end_date < selectedStartDate
                                ? selectedStartDate
                                : prevState.end_date,
                          }));
                        }}
                        minDate={new Date()}
                        onClick={handleDateClick}
                        dateFormat='dd/mm/yy'
                      />
                      <img
                        className='absolute top-5 right-2'
                        src={CalendarIcon}
                        alt='CalendarIcon'
                      />
                    </div>
                    {dateError.date !== '' && (
                      <p className='error' role='alert'>
                        {dateError.date}
                      </p>
                    )}
                  </div>

                  {datePopup.type !== 'do_not_repeat' && (
                    <div className='relative mt-2'>
                      <label className='block tracking-wide text-gray-700 text-xs font-bold mb-2'>
                        End Date
                      </label>
                      <div className='relative'>
                        <Calendar
                          className='calendar-control input-bg'
                          // value={customSelect.end_date}
                          value={
                            customSelect.end_date
                              ? new Date(customSelect.end_date)
                              : null
                          }
                          onChange={(e) => {
                            const selectedEndDate = e.value;
                            setCustomSelect((prevState) => ({
                              ...prevState,
                              end_date:
                                selectedEndDate >= prevState.start_date
                                  ? selectedEndDate
                                  : prevState.start_date,
                            }));
                          }}
                          minDate={new Date()}
                          onClick={handleDateClick}
                          dateFormat='dd/mm/yy'
                        />
                        <img
                          className='absolute top-5 right-2'
                          src={CalendarIcon}
                          alt='CalendarIcon'
                        />
                      </div>
                      {dateError.date !== '' && (
                        <p className='error' role='alert'>
                          {dateError.date}
                        </p>
                      )}
                    </div>
                  )}

                  {datePopup.type === 'custom' && (
                    <>
                      <div className='relative flex items-center mt-7 gap-2'>
                        <label className='block tracking-wide text-gray-700 text-xs font-bold mb-2'>
                          Repeat every
                        </label>
                        <div className='ml-4'>
                          <select
                            className='w-[70px] border-none px-3 py-[0.32rem] leading-[2.15] input-bg 
                                                                        focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[40px]'
                            style={{
                              color: '#232323',
                              borderRadius: '3px',
                              borderRight: '16px solid transparent',
                            }}
                            value={customSelect.repeat_time}
                            onChange={(e) => {
                              setCustomSelect({
                                ...customSelect,
                                repeat_time: e.target.value,
                              });
                            }}
                          >
                            {numbers.map((number) => (
                              <option
                                key={number}
                                selected={number === '1'}
                                value={number}
                              >
                                {number}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <select
                            className='w-[100px] border-none px-3 py-[0.32rem] leading-[2.15] input-bg 
                                                                        focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[40px]'
                            style={{
                              color: '#232323',
                              borderRadius: '3px',
                              borderRight: '16px solid transparent',
                            }}
                            value={customSelect.repeat_type}
                            onChange={(e) => {
                              setCustomSelect({
                                ...customSelect,
                                repeat_type: e.target.value,
                              });
                            }}
                          >
                            <option value=''>Select</option>
                            <option value='DAILY'>Day</option>
                            <option value='WEEKLY'>Week</option>
                            <option value='MONTHLY'>Month</option>
                            <option value='YEARLY'>Year</option>
                          </select>
                        </div>
                      </div>
                      {customSelect?.repeat_type === 'WEEKLY' && (
                        <>
                          <p className='mt-2 text-xs font-semibold'>
                            Repeated On
                          </p>
                          <div className='flex items-center justify-start gap-4 mt-3'>
                            {daysOfWeek.map((day, index) => (
                              <label
                                key={day.key}
                                className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold text-xs cursor-pointer ${
                                  selectedDays.includes(day.key)
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-300'
                                }`}
                              >
                                <input
                                  type='checkbox'
                                  value={day.value}
                                  checked={selectedDays.includes(day.key)}
                                  onChange={() => handleDaySelect(day.key)}
                                  className='hidden'
                                  style={{ backgroundColor: "#FE634E" }}
                                />
                                {day.value}
                              </label>
                            ))}
                          </div>
                        </>
                      )}

                      {customSelect?.repeat_type === 'MONTHLY' && (
                        <>
                          <select
                            className='w-full mt-4 border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[40px]'
                            style={{
                              color: '#232323',
                              borderRadius: '3px',
                              borderRight: '16px solid transparent',
                            }}
                            value={monthlyOn}
                            onChange={(e) => {
                              setMonthlyOn(e.target.value);
                            }}
                          >
                            <option value=''>Select</option>
                            <option value='monthly_on_date'>
                              {`Monthly on day ${today.getDate()}`}
                            </option>
                            <option value='monthly_on_day'>
                              {`Monthly on ${weekNumber} ${currentDayName}`}
                            </option>
                          </select>
                        </>
                      )}

                      {/* <div className="mt-5">
                        <div className="flex items-center me-4">
                          <input
                            type="radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100
                                                                                border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                                                                                dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
                                                                                dark:border-gray-600"
                          />
                          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Never
                          </label>
                        </div>
                      </div> */}
                    </>
                  )}
                </div>
              </div>
              <div className='flex justify-center mb-4'>
                <div className='flex gap-6 justify-center align-middle'>
                  <Button
                    btnName='Cancel'
                    btnCategory='secondary'
                    onClick={() => handleCancelPopup()}
                  />
                  <Button
                    btnType='button'
                    btnCls='w-[110px]'
                    btnName={'Done'}
                    btnCategory='primary'
                    onClick={handleDateSelection}
                  />
                </div>
              </div>
            </div>
          )}
        </Backdrop>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={createMeetingLoading}
          onClick={() => setCreateMeetingLoading(false)}
        >
          <div className='px-5 py-1 flex justify-center items-center'>
            <div
              className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
              style={{ background: '#fff', borderRadius: '10px' }}
            >
              <img src={SuccessTik} alt='SuccessTik' />
              <p
                className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                style={{
                  fontWeight: 600,
                }}
              >
                Meeting created successfully to Volunteer
              </p>
            </div>
          </div>
        </Backdrop>

        <MuiModal
          modalSize='lg'
          modalOpen={addMenteeModal}
          title='Select Volunteer'
          modalClose={() => setMentalModal(false)}
        >
          <DataTable
            rows={programMenteeList}
            columns={CalendarMentee}
            footerAction={footerAction}
            footerComponent={CustomFooterStatusComponent}
            selectedAllRows={menteeAllList}
          />
        </MuiModal>

        <div className='px-8 py-4'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-wrap gap-4'>
              {CreateMeetingFields.map((field, index) => {
                if (
                  field.name === 'event' &&
                  (location.pathname === '/create-meeting' ||
                    searchParams.get('status') === 'draft')
                ) {
                  return null;
                }

                const dateField =
                  field.type === 'time'
                    ? register(field.name, field.inputRules)
                    : undefined;
                const dropdownimageField =
                  field.type === 'dropdown'
                    ? register(field.name, field.inputRules)
                    : undefined;

                return (
                  <div
                    className={`relative mb-6  ${
                      getWindowDimensions().width <= 1536 &&
                      field.width === 'width-82'
                        ? 'w-[81%]'
                        : field.width
                    }`}
                    key={index}
                  >
                    <label
                      className='block tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor={field.label}
                    >
                      {field.label}
                    </label>
                    {field.type === 'input' ? (
                      <div className='relative'>
                        <input
                          {...register(field.name, field.inputRules)}
                          type={field.fieldtype}
                          className='w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none 
                                                            focus-visible:outline-none text-[14px] h-[60px]'
                          placeholder={field.placeholder}
                          style={{
                            color: '#232323',
                            borderRadius: '3px',
                          }}
                          aria-invalid={!!errors[field.name]}
                        />
                        {field.icon && field.icon === 'add' && (
                          <Tooltip title={field.placeholder}>
                            <img
                              className='absolute cursor-pointer top-4 right-4'
                              onClick={() => handleAction(field.name)}
                              src={PlusIcon}
                              alt='PlusIcon'
                            />
                          </Tooltip>
                        )}

                        {errors[field.name] && (
                          <p className='error' role='alert'>
                            {errors[field.name].message}
                          </p>
                        )}
                      </div>
                    ) : field.type === 'popup-input' ? (
                      <div className='relative'>
                        <div
                          className='input-bg h-[60px] w-full mt-2 flex items-center 
                                                                                         text-[12px] gap-2 cursor-pointer px-6'
                          style={{ borderRadius: '3px' }}
                          onClick={() => handleAction(field.name)}
                        >
                          {menteeAllList &&
                            menteeAllList
                              .slice(0, 6)
                              .map((popupfield, index) => {
                                return (
                                  <>
                                    <p className='flex items-center gap-1'>
                                      <p
                                        className='flex items-center px-3 py-3'
                                        style={{
                                          background: 'rgba(223, 237, 255, 1)',
                                          borderRadius: '50%',
                                        }}
                                      ></p>
                                      {`${popupfield.first_name}`}
                                    </p>
                                  </>
                                );
                              })}

                          {menteeAllList && menteeAllList?.length > 6 && (
                            <p className='flex items-center gap-1'>
                              <p
                                className='text-white flex items-center px-2 py-1'
                                style={{
                                  background: 'rgb(29, 91, 191)',
                                  borderRadius: '50%',
                                }}
                              >
                                {menteeAllList.length - 6}
                              </p>
                              Others
                            </p>
                          )}
                        </div>
                        <input
                          {...register(field.name, field.inputRules)}
                          type={field.fieldtype}
                          className='w-full hidden border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none 
                                                                        focus-visible:outline-none text-[14px] h-[60px]'
                          placeholder={field.placeholder}
                          style={{
                            color: '#232323',
                            borderRadius: '3px',
                          }}
                          aria-invalid={!!errors[field.name]}
                        />
                        {field.icon && field.icon === 'add' && (
                          <Tooltip title={field.placeholder}>
                            <img
                              className='absolute top-4 right-4 cursor-pointer'
                              onClick={() => handleAction(field.name)}
                              src={PlusIcon}
                              alt='PlusIcon'
                            />
                          </Tooltip>
                        )}

                        {errors[field.name] && (
                          <p className='error' role='alert'>
                            {errors[field.name].message}
                          </p>
                        )}
                      </div>
                    ) : field.type === 'dropdown' ? (
                      <>
                        <select
                          // {...register(field.name, field.inputRules)}
                          {...dropdownimageField}
                          className='w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg 
                                                                        focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[60px]'
                          placeholder={field.placeholder}
                          style={{
                            color: '#232323',
                            borderRadius: '3px',
                            borderRight: '16px solid transparent',
                            marginTop: field.label === '' ? '16px' : '',
                          }}
                          onChange={(e) => {
                            dropdownimageField.onChange(e);
                            if (field.name === 'date_category')
                              handleDate(e.target.value);
                          }}
                        >
                          <option value=''>Select</option>
                          {field.options.map((option, index) => (
                            <option value={option.key || option.id} key={index}>
                              {option.value || option.name}
                            </option>
                          ))}
                        </select>
                        {errors[field.name] && (
                          <p className='error' role='alert'>
                            {errors[field.name].message}
                          </p>
                        )}
                      </>
                    ) : field.type === 'time' ? (
                      <div className='relative'>
                        <Calendar
                          className='calendar-control input-bg'
                          {...dateField}
                          value={dateFormat[field.name]}
                          onChange={(e) => {
                            dateField.onChange(e);
                            setDateFormat({
                              ...dateFormat,
                              [field.name]: e.value,
                            });
                          }}
                          timeOnly
                          // time
                        />
                        <img
                          className='absolute top-5 right-2'
                          src={ClockIcon}
                          alt='ClockIcon'
                        />

                        {errors[field.name] && (
                          <p className='error' role='alert'>
                            {errors[field.name].message}
                          </p>
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            {/* {location.pathname === '/edit-meeting' &&
              id &&
              searchParams.get('status') !== 'draft' && (
                <div className='flex flex-col'>
                  <label className='text-xs mb-1 font-semibold' htmlFor=''>
                    Event
                  </label>
                  <select
                    className='w-[500px] border-none px-3 py-[0.32rem] leading-[2.15] input-bg 
                                                                        focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[50px]'
                    style={{
                      color: '#232323',
                      borderRadius: '3px',
                      borderRight: '16px solid transparent',
                    }}
                    name='Event'
                    onChange={(e) => {
                      setEventSelect(e.target.value);
                    }}
                  >
                    <option value=''>Select</option>
                    <option value='all_event'>All Event</option>
                    <option value='this_event'>This Event</option>
                    <option value='this_event_and_following_events'>
                      This Event And Following Events
                    </option>
                  </select>
                </div>
              )} */}
            <div className='flex gap-6 justify-center align-middle'>
              <Button
                btnName='Cancel'
                btnCls='w-[170px]'
                btnStyle={{
                  border: '1px solid rgba(29, 91, 191, 1)',
                  color: 'rgba(29, 91, 191, 1)',
                }}
                btnCategory='secondary'
                onClick={() => navigate('/calendar')}
              />
              {(searchParams.get('status') === 'draft' ||
                location.pathname === '/create-meeting') && (
                <Button
                  btnName='Draft'
                  btnCls='w-[170px]'
                  btnStyle={{
                    background: 'rgba(217, 228, 242, 1)',
                    color: 'rgba(29, 91, 191, 1)',
                    border: 'none',
                  }}
                  btnCategory='secondary'
                  onClick={handleSubmit(onDraftSubmit)}
                />
              )}
              <Button
                btnType='submit'
                btnCls='w-[170px]'
                btnName={submitButtonName}
                btnCategory='primary'
                style={{ backgroundColor: "#FE634E" }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

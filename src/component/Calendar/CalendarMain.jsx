import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import BackArrowIcon from '../../assets/icons/back-arrow.svg';
import Month from './month';
import CalendarHeader from './calendarheader';

import Week from './week';
import YearView from './YearView';
import TodayView from './TodayView';
import useAppointments from '../../hooks/useAppointments';

const CalendarMain = ({
  title = 'Calendar',
  addSection = true,
  events,
  setDateRange,
  actionActionBtn,
}) => {
  const navigate = useNavigate();

  const CALENDAR_VIEWS = [
    'Today',
    // 'Week',
    'Month',
    'Year',
    'day',
  ];
  const [currentCalendarView, setCurrentCalendarView] = useState('Month');

  const [currentDate, setCurrentDate] = useState(dayjs());

  const handleCalendarChange = (mode) => {
    let dateParameter = 'month';
    switch (currentCalendarView) {
      case 'Today':
      case 'day':
        dateParameter = 'day';
        break;
      case 'Month':
        dateParameter = 'month';
        break;
      case 'Week':
        dateParameter = 'week';
        break;
      case 'Year':
        dateParameter = 'year';
        break;
      default:
        dateParameter = 'month';
        break;
    }
    if (mode === 1) {
      // handle increment

      setCurrentDate((prev) => prev.add(1, dateParameter));
    }

    if (mode === -1) {
      // handle decrement

      setCurrentDate((prev) => prev.subtract(1, dateParameter));
    }
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
    // setIsNew(true);
    if (searchParams.has('date')) {
      if (selectedDate) {
        searchParams.delete('date');
      }
    }
    if (searchParams.has('mode')) {
      searchParams.delete('mode');
    }
    if (searchParams.has('appointmentId')) {
      searchParams.delete('appointmentId');
    }
    setSearchParams(searchParams);
  };

  const submitAppointment = () => {
    setShowModal(false);
    setShowAlert(true);
  };

  const [showAlert, setShowAlert] = useState(false);
  const closeAlert = () => {
    setShowAlert(false);
  };

  const {
    appointmentsLoading,
    internalEventsLoading,
    externalEventsLoading,
    internalEvents,
    externalEvents,
    eventList: savedEvents,
    appointmentsList,
    fetchEvents,
    fetchAppointments,
    deleteAppointment,
  } = useAppointments();

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  // new changes for redirect from dashboard calendar to appointment calendar
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = searchParams.get('date');
  const mode = searchParams.get('mode');
  const appointmentId = searchParams.get('appointmentId');

  useEffect(() => {
    if (appointmentId) {
      setShowModal(true);
    }
  }, [appointmentId]);

  useEffect(() => {
    // new changes for redirect from dashboard calendar to appointment calendar
    if (selectedDate && mode) {
      setCurrentDate(dayjs(selectedDate));
      setCurrentCalendarView(mode);
      //-------------------------------------------------------------------
    } else {
      setCurrentDate(dayjs());
    }
  }, [currentCalendarView, location]);

  const Data = [
    {
      id: 167,
      type: 'Test 1',
      meeting_title: 'vinothmeeting_updated_ram',
      start_time: '2024-08-27T10:26:00+05:30',
      duration: '00:30:00',
      description: 'test',
      linked_encounter_notes: [],
      google_calendar_event_id: null,
      created_at: '2024-08-28T10:26:31.460768+05:30',
      changed_at: '2024-08-28T14:09:25.369873+05:30',
      staff: 7,
      facility: 2,
      program: 4,
      activity: 5,
      created_by: null,
      changed_by: null,
      clients: [],
    },
    {
      id: 97,
      type: 'Test 2',
      meeting_title: 'test',
      start_time: '2024-08-05T09:34:00+05:30',
      duration: '00:00:30',
      description: 'test',
      linked_encounter_notes: [],
      google_calendar_event_id: null,
      created_at: '2024-08-11T21:04:18.566006+05:30',
      changed_at: '2024-08-11T21:04:18.566026+05:30',
      staff: 71,
      facility: 2,
      program: 12,
      activity: 3,
      created_by: null,
      changed_by: null,
      clients: [615],
    },
  ];

  const calculateDateRange = (view, date) => {
    let start, end;

    switch (view) {
      case 'Month':
        start = dayjs(date).startOf('month');
        end = dayjs(date).endOf('month');
        break;
      case 'Week':
        start = dayjs(date).startOf('week');
        end = dayjs(date).endOf('week');
        break;
      case 'day':
      case 'Today':
        start = dayjs(date).startOf('day');
        end = dayjs(date).endOf('day');
        break;
      default:
        start = dayjs(date);
        end = dayjs(date);
        break;
    }

    return { start, end };
  };

  useEffect(() => {
    const range = calculateDateRange(currentCalendarView, currentDate);
    setDateRange((prevRange) => ({
      ...prevRange,
      start: range.start,
      end: range.end,
    }));
  }, [currentCalendarView, currentDate]);

  const renderCalendar = () => {
    switch (currentCalendarView) {
      case 'Today':
        return (
          <TodayView
            currentDate={currentDate}
            savedEvents={Data}
            fetchEvents={fetchAppointments}
            deleteAppointment={deleteAppointment}
            newData={events}
            actionActionBtn={actionActionBtn}
          />
        );
      case 'Week':
        return (
          <Week
            currentDate={currentDate}
            savedEvents={events}
            fetchEvents={fetchAppointments}
            actionActionBtn={actionActionBtn}
            deleteAppointment={deleteAppointment}
            newData={events}
          />
        );
      case 'Month':
        return (
          <Month
            currentDate={currentDate}
            savedEvents={events}
            fetchEvents={fetchAppointments}
            deleteAppointment={deleteAppointment}
            newData={events}
            actionActionBtn={actionActionBtn}
          />
        );
      case 'Year':
        return (
          <YearView
            currentDate={currentDate}
            savedEvents={events}
            fetchEvents={fetchAppointments}
            deleteAppointment={deleteAppointment}
            newData={events}
            actionActionBtn={actionActionBtn}
          />
        );
      // new changes for redirect from dashboard calendar to appointment calendar
      case 'day':
        return (
          <TodayView
            currentDate={currentDate}
            savedEvents={events}
            fetchEvents={fetchAppointments}
            deleteAppointment={deleteAppointment}
            newData={events}
          />
        );
      //--------------------------------------------------------
      default:
        return <p>No view found</p>;
    }
  };

  return (
    <div className=''>
      <div className={`space-y-5 m-5 ${showModal ? 'opacity-50' : ''}`}>
        <div className='flex justify-between items-center w-full'>
          <div className='text-gray-900 text-2xl font-medium' id='calendarPage'>
            {title}
          </div>
          {addSection && (
            <div className='flex item-center justify-center gap-3'>
              <button
                className='bg-[#43B09C] rounded text-xs text-white p-3'
                onClick={toggleModal}
              >
                Add new appointment
              </button>
              <Link
                className='p-3 bg-[#EAECEB]'
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                <img
                  src={BackArrowIcon}
                  alt='back arrow'
                  className='h-[15px] w-[100%]'
                />
              </Link>
            </div>
          )}
        </div>
        <div
          className='flex flex-col bg-white border-1 border-teal-400 rounded-md p-10 space-y-3'
          style={{ background: '#FAFBFC' }}
        >
          <CalendarHeader
            //  viewList={CALENDAR_VIEWS}
            viewList={CALENDAR_VIEWS.filter(
              (ele) => ele != 'day' && ele !== 'Today'
            )} // new changes for redirect from dashboard calendar to appointment calendar
            currentCalendarView={currentCalendarView}
            handleCalendarView={(view) => {
              setCurrentCalendarView(view);
              // new changes for redirect from dashboard calendar to appointment calendar
              if (searchParams.has('date')) {
                if (selectedDate) {
                  searchParams.delete('date');
                }
              }
              if (searchParams.has('mode')) {
                searchParams.delete('mode');
              }
              if (searchParams.has('appointmentId')) {
                searchParams.delete('appointmentId');
              }
              setSearchParams(searchParams);
              //----------------------------------------------------------
            }}
            onIncrement={() => {
              handleCalendarChange(1);
            }}
            onDecrement={() => {
              handleCalendarChange(-1);
            }}
            currentDate={currentDate}
          />
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default CalendarMain;

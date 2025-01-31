import React, { useState } from 'react';
import dayjs from 'dayjs';
import { formatTime, getTodayTime } from '../../utils';
import GoogleIcon from '../../assets/icons/google_icon.svg';
import TrashIcon from '../../assets/images/delete.png';
import CalendarIcon from '../../assets/icons/calendar-boxed.svg';
import InternalCalendarIcon from '../../assets/icons/internal-meeting.svg';
import EventModal from './EventModal';
// import { AppointmentDetail_Modal } from "../Appointment/AppointmentDetail";
// import AddAppointment from "./addappointment";
// import PrivateComponent from "../PrivateComponent";

export default function TodayView({
  currentDate,
  savedEvents,
  fetchEvents,
  deleteAppointment,
  isWeek,
  rowIdx,
  actionActionBtn,
  colIdx,
  newData,
}) {
  const todayTimes = getTodayTime(currentDate);

  return (
    <>
      <div className='mt-1 p-1'>
        {todayTimes.map((time, index) => {
          return (
            <TimeBlock
              isWeek={isWeek}
              rowIdx={rowIdx}
              colIdx={colIdx}
              key={index}
              time={time}
              actionActionBtn={actionActionBtn}
              savedEvents={savedEvents}
              fetchEvents={fetchEvents}
              deleteAppointment={deleteAppointment}
              newData={newData}
            />
          );
        })}
      </div>
    </>
  );
}

function TimeBlock({
  isWeek,
  rowIdx,
  colIdx,
  time,
  savedEvents,
  fetchEvents,
  deleteAppointment,
  actionActionBtn,
  newData,
}) {
  const startTime = time.format('h:mm A'); // Format the start time
  const endTime = time.add(1, 'hour').format('h:mm A'); // Add 1 hour to get the end time

  function getCurrentTimeClass() {
    return time.format('H') === dayjs().format('H')
      ? 'bg-[#FE634E] text-white rounded-md h-5 m-0 w-100'
      : 'pt-2';
  }

  function getTitleBackGround() {
    const timeHour = dayjs(time).format('HH');

    switch (timeHour) {
      case '01':
      case '13':
        return 'text-white bg-fuchsia-900';
      case '02':
      case '14':
        return 'text-white bg-emerald-500';
      case '03':
      case '15':
        return 'text-white bg-sky-500';
      case '04':
      case '16':
        return 'text-white bg-red-500';
      case '05':
      case '17':
        return 'text-black bg-yellow-200';
      case '06':
      case '18':
        return 'text-white bg-teal-500';
      case '07':
      case '19':
        return 'text-white bg-indigo-500';
      case '08':
      case '20':
        return 'text-white bg-red-500';
      case '09':
      case '21':
        return 'text-white bg-lime-500';
      case '10':
      case '22':
        return 'text-white bg-violet-500';
      case '11':
      case '23':
        return 'text-white bg-cyan-500';
      case '12':
      case '00':
        return 'text-white bg-rose-500';
      default:
        return '';
    }
  }

  const eventsForHour = savedEvents.filter((event) => {
    const eventTime = dayjs(event.start.dateTime);
    return eventTime.hour() === time.hour() && eventTime.date() === time.date();
  });

  const eventsForHour1 = newData.filter((event) => {
    const eventTime = dayjs(new Date(event.date).toDateString());
    return eventTime.hour() === time.hour() && eventTime.date() === time.date();
  });

  const [showDetailModal, setShowDetailModal] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const toggleDetailModal = (index) => {
    setShowDetailModal(index);
  };

  const handleEventClick = (item) => {
    setSelectedEvent(item);
    setShowModal(true);
  };

  const [editEvent, setEditEvent] = useState(false);
  const [viewEvent, setViewEvent] = useState(false);

  const handleDeleteAppointment = (id) => {
    deleteAppointment(id);
  };

  let showTimeBlock = true;
  let showEvent = true;

  if (isWeek && colIdx > 0) {
    showTimeBlock = false;
  }

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div
      className={`flex-1 grid grid-cols-9 gap-2 opacity-75 ${
        isWeek ? 'border-b-[1px] h-16' : 'border'
      }  border-gray-200`}
    >
      {showTimeBlock && (
        <div
          className={`${
            showTimeBlock && isWeek ? 'col-span-9' : 'col-span-1'
          } ${
            isWeek ? '' : 'border-r-2'
          }  border-gray-200 flex justify-center items-center`}
        >
          <p
            className={`text-center text-sm ${getCurrentTimeClass()} w-full h-full flex justify-center items-center`}
          >
            <span className='m-auto'>{startTime}</span>
          </p>
        </div>
      )}
      {showEvent && (
        <div className={`${showEvent && isWeek ? 'col-span-9' : 'col-span-8'}`}>
          {eventsForHour1.map((event, index) => {
            const startTime = dayjs(event.start).format('hh:mm A');
            const endTime = dayjs(event.end).format('hh:mm A');

            let showAppointment = editEvent === index;
            if (viewEvent === index) {
              showAppointment = true;
            }

            let eventTitleDisplay =
              startTime + '-' + endTime + ' | ' + event.title;

            if (isWeek) {
              eventTitleDisplay = event.title;
            }

            // Display only one event for week and rest in modal
            if (isWeek && index > 0) {
              return null;
            }

            return (
              <div className='cursor-pointer'>
                <div
                  key={index}
                  className='cursor-pointer'
                  // className={`${isWeek ? '' : 'm-2'} mb-0 cursor-pointer`}
                  onClick={() => handleEventClick(event)}
                >
                  {/* <a
                    // href={event.htmlLink}
                    target='_blank'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleDetailModal(index);
                    }}
                  > */}
                  <div
                    // className={`relative flex flex-row gap-1 items-center justify-between w-full h-7 rounded-tl-sm rounded-tr-sm mx-1 ${getTitleBackGround()}`}
                    className='text-sm relative cursor-pointer calendar-event-conatiner'
                    onClick={() => handleEventClick(event)}
                    style={{
                      boxShadow: '4px 4px 15px 2px rgba(0, 0, 0, 0.1)',
                      borderRadius: '3px',
                      background: '#fff',
                    }}
                  >
                    {event?.length > 1 && (
                      <span
                        className='absolute notification-count'
                        style={{
                          background: 'rgba(255, 206, 71, 1)',
                          right: '4px',
                          top: '-7px',
                          height: '23px',
                          width: '23px',
                          textAlign: 'center',
                          borderRadius: '50%',
                          color: '#fff',
                        }}
                      >
                        {event?.length}
                      </span>
                    )}
                    <div
                      // className='flex items-center gap-1'
                      className='event-title'
                      onClick={() => handleEventClick(event)}
                      // title={event?.title}
                      style={{
                        background: '#1D5BBF',
                        color: '#fff',
                        padding: '5px',
                        borderRadius: '3px',
                      }}
                    >
                      <div className='text-xs font-normal truncate'>
                        {/* {eventTitleDisplay} */}
                        {event.title}
                      </div>
                    </div>
                    <div className='meeting-details px-2 pt-2 pb-3'>
                      <div
                        className='mb-2 meeting-scheduler text-xs'
                        title='Program Manager : John Doe'
                      >
                        Program Manager : John Doe
                      </div>
                      <div
                        className='text-[12px] meeting-time'
                        style={{ color: 'rgba(40, 41, 59, 1)' }}
                      >
                        Time: {formatTime(event.start)} -{formatTime(event.end)}
                      </div>
                    </div>

                    {/* <PrivateComponent permission="delete_appointments_in_my_calendar">
                        <div className="absolute inset-y-0 right-0 bg-slate-50 px-1 m-1 rounded flex items-center justify-end pe-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAppointment(event.id);
                            }}
                            className="m-auto"
                          >
                            <img className="h-3.5 w-auto" src={TrashIcon} />
                          </button>
                        </div>
                      </PrivateComponent> */}
                  </div>
                  {/* </a> */}
                </div>
                {/* {showDetailModal === index && (
                  <AppointmentDetail_Modal
                    showPreview={showDetailModal === index}
                    toggleModal={() => toggleDetailModal(null)}
                    event={event}
                    toggleEdit={() => {
                      setEditEvent(index);
                      setViewEvent(null);
                    }}
                    toggleView={() => {
                      setEditEvent(null);
                      setViewEvent(index);
                    }}
                    deleteAppointment={handleDeleteAppointment}
                  />
                )} */}
                {/* <AddAppointment
                  show={showAppointment}
                  toggleModal={() => {
                    setViewEvent(null);
                    setEditEvent(null);
                  }}
                  setShowAlert={null}
                  fetchEvents={fetchEvents}
                  appointmentDetail={event}
                  appointmentId={event.id}
                  isUpdate={editEvent === index}
                  isView={viewEvent === index}
                /> */}
              </div>
            );
          })}

          {isWeek && eventsForHour.length > 1 && (
            <div
              className='flex items-center justify-center mt-2 text-sm text-[#FE634E] cursor-pointer'
              onClick={() => {
                setShowModal(true);
              }}
            >
              +{eventsForHour.length - 1} more
            </div>
          )}
        </div>
      )}
      {showModal && (
        <EventModal
          open={showModal}
          eventDate={`${startTime}-${endTime}`}
          closeModal={toggleModal}
          event={selectedEvent}
          actionActionBtn={actionActionBtn}
          fetchEvents={fetchEvents}
          deleteAppointment={deleteAppointment}
        />
      )}
    </div>
  );
}

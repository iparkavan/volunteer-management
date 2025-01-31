import dayjs from 'dayjs';
import React, { useState } from 'react';

import GoogleIcon from '../../assets/icons/google_icon.svg';
import TrashIcon from '../../assets/images/delete.png';
import CalendarIcon from '../../assets/icons/calendar-boxed.svg';
import InternalCalendarIcon from '../../assets/icons/internal-meeting.svg';
import MultiEventModal from './MultiEventModal';

// import { AppointmentDetail_Modal } from "../Appointment/AppointmentDetail";
// import AddAppointment from "./addappointment";
// import PrivateComponent from "../PrivateComponent";

export default function Months({
  month,
  savedEvents,
  fetchEvents,
  deleteAppointment,
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  function getCurrentDayClass() {
    return month.format('MMMMYYYY') === dayjs().format('MMMMYYYY')
      ? 'bg-[#FE634E] text-white rounded h-5 mt-2 px-2'
      : 'pt-2 pr-2';
  }

  function getTitleBackGround() {
    const monthName = month.format('MMMM');

    switch (monthName) {
      case 'January':
        return 'text-white bg-fuchsia-900';
      case 'February':
        return 'text-white bg-emerald-500';
      case 'March':
        return 'text-white bg-sky-500';
      case 'April':
        return 'text-white bg-red-500';
      case 'May':
        return 'text-black bg-yellow-200';
      case 'June':
        return 'text-white bg-teal-500';
      case 'July':
        return 'text-white bg-indigo-500';
      case 'August':
        return 'text-white bg-red-500';
      case 'September':
        return 'text-white bg-lime-500';
      case 'October':
        return 'text-white bg-violet-500';
      case 'November':
        return 'text-white bg-cyan-500';
      case 'December':
        return 'text-white bg-rose-500';
      default:
        return '';
    }
  }

  const eventsForMonth = savedEvents.filter(
    (event) =>
      month.format('MMMM') === dayjs(event.start.dateTime).format('MMMM') &&
      month.year() === dayjs(event.start.dateTime).year()
  );

  const displayedEvents = eventsForMonth.slice(0, 2);
  const additionalEventsCount = Math.max(eventsForMonth.length - 2, 0);

  const [showDetailModal, setShowDetailModal] = useState(null);
  const toggleDetailModal = (index) => {
    setShowDetailModal(index);
  };

  const [editEvent, setEditEvent] = useState(false);
  const [viewEvent, setViewEvent] = useState(false);

  const handleDeleteAppointment = (id) => {
    deleteAppointment(id);
  };

  return (
    <>
      <div className={`opacity-75 border border-gray-200 flex flex-col h-36`}>
        <div className='flex justify-start ms-2'>
          <p className={`text-center text-sm ${getCurrentDayClass()}`}>
            {`${month.format('MMM')} ${month.format('YYYY')}`}
          </p>
        </div>
        {displayedEvents.map((event, index) => {
          let showAppointment = editEvent === index;
          if (viewEvent === index) {
            showAppointment = true;
          }

          return (
            <>
              {' '}
              <div key={index} className='m-2 mb-0 relative'>
                <a
                  // href={event.htmlLink}
                  target='_blank'
                  className='block w-full'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDetailModal(index);
                  }}
                >
                  <div
                    className={`relative flex flex-row gap-1 items-center justify-between w-full h-7 ${getTitleBackGround()} rounded-tl-sm rounded-tr-sm mx-1`}
                  >
                    <div className='flex items-center gap-1 flex-grow overflow-hidden max-w-[75%]'>
                      <img
                        src={
                          event.isExternal ? GoogleIcon : InternalCalendarIcon
                        }
                        className={`${
                          event.isExternal
                            ? 'h-[16px] w-[16px] ms-1 bg-white rounded-full'
                            : 'h-[20px] w-[20px] ms-1'
                        }`}
                        alt='event-meet'
                      />
                      <div className='text-xs font-normal truncate flex-grow overflow-hidden'>
                        {event.meeting_title}
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
                </a>
              </div>
            </>
          );
        })}
        {additionalEventsCount > 0 && (
          <div
            className='flex items-center justify-center mt-2 text-sm text-[#FE634E] cursor-pointer'
            onClick={() => {
              setShowModal(true);
            }}
          >
            +{additionalEventsCount} more
          </div>
        )}
      </div>
      <MultiEventModal
        show={showModal}
        eventDate={month.format('MMMM-YYYY')}
        toggleModal={toggleModal}
        events={eventsForMonth}
        fetchEvents={fetchEvents}
        deleteAppointment={deleteAppointment}
      />
    </>
  );
}

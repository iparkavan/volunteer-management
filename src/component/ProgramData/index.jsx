import React, { useState } from 'react'
import InlineCalendar from '../../shared/Calendar/InlineCalendar'
import './calendar.css'
import PlusWhiteIcon from '../../assets/icons/PlusWhite.svg'
import CalendarMain from '../Calendar/CalendarMain'

export default function ProgramData() {
  const [actionActionBtn, setActionActionBtn] = useState('upcoming_schedule')
  const eventColors = {
    all_meetings: 'rgba(0, 174, 189, 1)',
    upcoming_meetings: 'rgba(29, 91, 191, 1)',
    reschedule_meetings: 'rgba(255, 138, 0, 1)',
    completed_meetings: 'rgba(22, 182, 129, 1)',
    cancelled_meetings: 'rgba(224, 56, 45, 1)',
    draft_meetings: 'rgba(183, 183, 183, 1)'
  }

  const calendarEvents = [
    {
      name: 'All Meetings',
      key: 'all_meetings',
      total: 10
    },
    {
      name: 'Upcoming Meetings',
      key: 'upcoming_meetings',
      total: 10
    },
    {
      name: 'Reschedule  Meetings',
      key: 'reschedule_meetings',
      total: 10
    },
    {
      name: 'Completed Meetings',
      key: 'completed_meetings',
      total: 10
    },
    {
      name: 'Cancelled Meetings',
      key: 'cancelled_meetings',
      total: 10
    },
    {
      name: 'Draft Meetings',
      key: 'draft_meetings',
      total: 10
    },
  ]
  return (
    <div className="calendar-container px-9 py-9">
      <div className='px-3 py-5' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)' }}>
        <nav className="flex px-7 pt-6 pb-5 mx-2 border-b-2" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a href="#" className="inline-flex items-center text-sm font-medium" style={{ color: 'rgba(24, 40, 61, 1)' }}>
                Calendar
              </a>
            </li>
          </ol>
        </nav>


        <div className="grid grid-cols-6 gap-7 py-5">
          <div className='left-container col-span-2'>

            <div className="my-program-list pb-3 mb-4 px-6" style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px', border: '1px solid rgba(219, 224, 229, 1)' }}>
              <div className="title flex justify-between py-7 ">
                <h4 className="text-base font-semibold" style={{ color: 'rgba(24, 40, 61, 1)' }}>My program list</h4>
              </div>
              <div className='flex gap-5 flex-col justify-center items-center pb-5'>
                <button className='flex gap-3 justify-center py-3 w-full text-[13px]' style={{ background: 'rgba(29, 91, 191, 1)', color: '#fff', borderRadius: '3px' }}>
                  <img src={PlusWhiteIcon} alt="PlusWhiteIcon" />
                  Add New Meeting
                </button>
                {
                  calendarEvents.map((calendarevent, index) =>
                    <div key={index} className={`action-btn flex justify-between cursor-pointer ${actionActionBtn === calendarevent.key ? 'active' : ''}`} onClick={() => setActionActionBtn(calendarevent.key)}>
                      <div className='flex gap-2 items-center'>
                        <div style={{ background: `${eventColors[calendarevent.key]}`, height: '10px', width: '10px' }}></div>
                        <span className='text-[13px]'>{calendarevent.name}</span>
                      </div>
                      <div className='font-semibold'>
                        {calendarevent.total}
                      </div>

                    </div>
                  )
                }
              </div>
            </div>

            <div className="events-calendar pb-3 px-2" style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px', border: '1px solid rgba(219, 224, 229, 1)' }}>
              <InlineCalendar />
            </div>

          </div>

          <div className="col-span-4">
            <div style={{ border: '1px solid rgba(219, 224, 229, 1)', boxShadow: 'rgba(0, 0, 0, 0.05) 4px 4px 25px 0px', borderRadius: '10px' }}>
              <CalendarMain
                title="Meeting Calendar"
                addSection={false}
              />

            </div>

          </div>
        </div>
      </div>







    </div>
  )
}

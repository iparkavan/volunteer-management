import React from 'react';
import Day from './day';
import { getMonth } from '../../utils';
import dayjs from 'dayjs';
export default function Month({
  currentDate,
  savedEvents,
  fetchEvents,
  deleteAppointment,
  newData,
  actionActionBtn,
}) {
  const month = getMonth(currentDate);

  return (
    <div className='flex-1 grid grid-cols-7 grid-rows-6 gap-0'>
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day
              fetchEvents={fetchEvents}
              day={day}
              key={idx}
              rowIdx={i}
              actionActionBtn={actionActionBtn}
              savedEvents={savedEvents}
              deleteAppointment={deleteAppointment}
              isMonth
              newData={newData}
              currentMonth={dayjs(currentDate).month()}
              currentYear={dayjs(currentDate).year()}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

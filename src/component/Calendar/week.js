import React from 'react';
import Day from './day';
import { getWeek } from '../../utils';
import dayjs from 'dayjs';

export default function Week({
  currentDate,
  savedEvents,
  fetchEvents,
  deleteAppointment,
  actionActionBtn,
  newData,
}) {
  const week = getWeek(currentDate);

  const timeblockWeek = [...week];
  timeblockWeek[0].unshift('Time');
  timeblockWeek[1].unshift(dayjs().year(1975));

  return (
    <div className='flex-1 grid grid-cols-8 gap-0'>
      {timeblockWeek.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day
              fetchEvents={fetchEvents}
              day={day}
              key={idx}
              rowIdx={i}
              actionActionBtn={actionActionBtn}
              colIdx={idx}
              savedEvents={savedEvents}
              deleteAppointment={deleteAppointment}
              isWeek
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

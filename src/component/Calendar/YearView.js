import React from "react";
import { getYearMonths } from "../../utils";
import Months from "./Months";

export default function YearView({
  currentDate,
  savedEvents,
  fetchEvents,
  deleteAppointment,
  newData
}) {
  const monthsOfYear = getYearMonths(currentDate);
  return (
    <div className="flex-1 grid grid-cols-4 gap-0">
      {monthsOfYear.map((month, idx) => {
        return (
          <>
            <Months
              key={idx}
              month={month}
              savedEvents={savedEvents}
              fetchEvents={fetchEvents}
              deleteAppointment={deleteAppointment}
              newData={newData}
            />
          </>
        );
      })}
    </div>
  );
}

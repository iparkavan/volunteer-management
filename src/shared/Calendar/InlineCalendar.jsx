import React, { useState } from 'react'
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';

export default function InlineCalendar() {
    const [date, setDate] = useState(null);
    addLocale('en', {
        firstDayOfWeek: 1,
        dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    })

    const dateTemplate = (date) => {
        if (date.day > 10 && date.day < 15 && !date.today) {
            return (
                <strong style={{ textDecoration: 'line-through' }}>{date.day}</strong>
            );
        }
        return date.day;
    }

    return (
        <div className="">
            <Calendar firstDayOfWeek={1} value={date} onChange={(e) => setDate(e.value)} inline showOtherMonths={false} monthNavigator={false} yearNavigator={false}
            showIcon={false} prevIcon={<></>} nextIcon={<></>} locale='en'
           
            />
        </div>


    )
}

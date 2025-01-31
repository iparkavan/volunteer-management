import dayjs from "dayjs";
import moment from "moment";

export function getMonth(date = dayjs()) {
  const currDate = dayjs(date);
  const month = Math.floor(currDate.month());
  const year = currDate.year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let counter = 0;

  const daysMatrix = new Array(6).fill([]).map((row, rowIndex) => {
    return new Array(7).fill(null).map(() => {
      if (rowIndex === 0) {
        return daysOfWeek[counter++];
      } else {
        currentMonthCount++;
        return dayjs(new Date(year, month, currentMonthCount));
      }
    });
  });
  return daysMatrix;
}

export function getWeek(date = dayjs()) {
  let startOfWeek = date.startOf("week");
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let counter = 0;

  const daysMatrix = new Array(1).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      return startOfWeek.add(counter++, "day");
    });
  });
  daysMatrix.unshift(daysOfWeek);
  return daysMatrix;
}

export function getYearMonths(date = dayjs()) {
  let year = dayjs(date).year();
  const months = [];
  for (let month = 0; month < 12; month++) {
    months.push(dayjs(new Date(year, month, 1)));
  }
  return months;
}

export function getTodayTime(date = dayjs()) {
  const today = dayjs(date).startOf("day");
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    times.push(today.add(hour, "hour"));
  }
  return times;
}

export function getUpcomingEvents(eventList) {
  // Get the current date and time
  const currentDate = new Date();

  // Filter the eventList to keep only upcoming events
  const upcomingEvents = eventList.filter((event) => {
    // Get the start date and time of the event
    const eventStartDate = new Date(event.start.dateTime);

    // Compare the start date and time of the event with the current date and time
    return eventStartDate > currentDate;
  });

  // Sort the upcomingEvents array in ascending order based on the start date and time
  upcomingEvents.sort((a, b) => {
    const dateTimeA = new Date(a.start.dateTime).getTime();
    const dateTimeB = new Date(b.start.dateTime).getTime();
    return dateTimeA - dateTimeB;
  });

  // return the upcomingEvents array
  return upcomingEvents;
}

export function getTodayUpcomingEvents(eventList) {
  // Get the current date
  const currentDate = new Date();

  // Get the start and end of the current day
  const startOfDay = new Date(currentDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(currentDate);
  endOfDay.setHours(23, 59, 59, 999);

  // Filter the eventList to keep only events happening today
  const todaysEvents = eventList.filter((event) => {
    // Get the start date and time of the event
    const eventStartDate = new Date(event.start.dateTime);

    // Check if the event is today
    return eventStartDate >= startOfDay && eventStartDate <= endOfDay;
  });

  // Sort the todaysEvents array in ascending order based on the start date and time
  todaysEvents.sort((a, b) => {
    const dateTimeA = new Date(a.start.dateTime).getTime();
    const dateTimeB = new Date(b.start.dateTime).getTime();
    return dateTimeA - dateTimeB;
  });

  // return the todaysEvents array (it will be empty if there are no events today)
  return todaysEvents;
}

export const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const permissionDeniedMessage = "You do not have permission to view this page. Please contact the administrator for more information";




export const formatTime = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  let formattedHours = date.getHours();
  const ampm = formattedHours >= 12 ? 'PM' : 'AM';
  formattedHours = formattedHours % 12;
  formattedHours = formattedHours ? formattedHours : 12;

  const formattedMinutes = date.getMinutes().toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}



export const dateFormat = data => {
  if (data && data !== '') {
    // const timestamp = data;
    // const date = new Date(timestamp);
    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    // const day = String(date.getDate()).padStart(2, '0');
    // const formattedDate = `${month}-${day}-${year}`;
    // return formattedDate

    return moment(new Date(data)).format("MM-DD-YYYY")
  }
  return ''
}
export const dateFormatRever = data => {
  if (data && data !== '') {
    const timestamp = data;
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${month}-${day}-${year}`;
    return formattedDate
  }
  return ''
}
export const formatDateFunToAll = dateFormat;
export const dateTimeFormat = data => {
  if (data && data !== '') {
    const originalDateString = data;
    const date = new Date(originalDateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const formattedDate = `${month}-${day}-${year} | ${hours}:${minutes}`;
    return formattedDate
  }
  return ''
}

export const formatDateTimeISO = (isoString) => {
  const date = new Date(isoString);
  const options = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  const [monthDay, time] = date.toLocaleString('en-US', options).split(', ');

  // const suffixes = ['th', 'st', 'nd', 'rd'];
  const day = date.getDate();
  let suffix = 'th';
  
  if (day % 10 === 1 && day !== 11) {
    suffix = 'st';
  } else if (day % 10 === 2 && day !== 12) {
    suffix = 'nd';
  } else if (day % 10 === 3 && day !== 13) {
    suffix = 'rd';
  }
  // const suffix = suffixes[(day % 10)] || 'th';

  return `Begins ${monthDay}${suffix} at ${time}`;
};
export const getStartAndEndDates = (value) => {
  const currentDate = new Date();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth is zero-based, so we add 1
    return `${month}-${day}-${year}`;
  };

  if (value === 'month') {
    // Get the start and end of the current month
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    return {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate)
    };
  }

  if (value === 'year') {
    // Get the start and end of the current year
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const endDate = new Date(currentDate.getFullYear(), 11, 31);
    return {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate)
    };
  }

  return null;
};

export const getTimeFromDate = data => {
  if (data && data !== '') {
    const date = new Date(data);
    date.setHours(3);
    date.setMinutes(20);
    date.setSeconds(0);
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    return formattedTime
  }
  return ''
}

export const todatDateInfo = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  return {
    year: year,
    month: month,
    date: date
  }
}


export const convertDateFormat = (dateStr) => {
  let date = new Date(dateStr)
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  let day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


export const getFiles = (files) => {
  const allFiles = {
    image: [],
    doc: [],
    video: [],
    files: false
  };

  const imageExtension = ["jpg", "jpeg", "png", "gif"];
  const documentExtension = ["pdf", "doc", "docx", "txt"];
  const videoExtension = ["mp4", "mov", "avi"];

  files?.forEach((fileObj) => {
    const file = fileObj["0"]?fileObj["0"]:fileObj; 
    if (!file) return; 
    let url =file?.id?file?.files: URL.createObjectURL(file); 
    let fileName = file.name.split(".")[0] || "";
    let extension = file.name.split(".").pop() || "";
    let rowId= fileObj?.row_id?fileObj?.row_id:undefined
   
    if (imageExtension.includes(extension.toLowerCase())) {
      allFiles.image.push({
        ...file,
        name: fileName,
        fileurl: url,
        row_id:rowId
      });
      allFiles.files = true;
    } else if (documentExtension.includes(extension.toLowerCase())) {
      allFiles.doc.push({
        ...file,
        name: fileName,
        fileurl: url,
        row_id:rowId
      });
      allFiles.files = true;
    } else if (videoExtension.includes(extension.toLowerCase())) {
      allFiles.video.push({
        ...file,
        name: fileName,
        fileurl: url,
        row_id:rowId
      });
      allFiles.files = true;
    }
  });
  return allFiles;
}

export const fileNameFromUrl = (file) => {
  let filename = ''
  if (file !== '') {
    filename = file.split('/').pop();
  }
  return filename
}

export const fileNameString = (data) => {

  const fileNames = data.map(item => item.files.split('/').pop());
  const firstImageName = fileNames[0].slice(0, 6);
  const remainingImagesCount = fileNames?.length - 1;
  return {
    filename: firstImageName,
    fullName: fileNames[0],
    remainingCount: remainingImagesCount
  };
}
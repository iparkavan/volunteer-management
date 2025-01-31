import React, {
  useState,
  useEffect
} from 'react';

const useTimer = () => {
  const [startTime, setStartTime] = useState(false)
  const [remainingHours, setRemainingHours] = useState(0);
  const [remainingMinutes, setRemainingMinutes] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [timer, setTimer] = useState({hours: 0, minutes:0, seconds: 0})
  const [timeData, setTimeData] = useState({hours: 0, minutes: 0, seconds: 0})

  useEffect(() => {
    if (startTime) {

      const totalSeconds = timer.hours * 3600 + timer.minutes * 60 + timer.seconds;
      let countdown = totalSeconds;

      const interval = setInterval(() => {
        countdown--;

        const hours = Math.floor(countdown / 3600);
        const minutes = Math.floor((countdown % 3600) / 60);
        const seconds = countdown % 60;

        setTimer({hours, minutes, seconds})
        // setRemainingHours(hours);
        // setRemainingMinutes(minutes);
        // setRemainingSeconds(seconds);

        if (countdown <= 0) {
          setStartTime(false)
          // setRemainingHours(0);
          // setRemainingMinutes(0);
          // setRemainingSeconds(0);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer.hours, timer.minutes, timer.seconds]);


  const startTimer = (hours = timer.hours, minutes = timer.minutes, seconds = timer.seconds) => {
    setStartTime(true)
    setTimer({hours, minutes, seconds})
  }

  const stopTimer = () => {
    setStartTime(false)
  }

  const loadTime = (hours, minutes, seconds) => {
    setTimer({hours, minutes, seconds})
  }

  return {
    hours: timer.hours,
    minutes: timer.minutes,
    seconds: timer.seconds,
    startTimer: startTimer,
    stopTimer: stopTimer,
    loadTime: loadTime
  }
};

export default useTimer;
import { useState, useEffect } from 'react';

export default function useCurrentHour() {
  const [currentHour, setCurrentHour] = useState<string>('');
  const [actualHour, setActualHour] = useState<string>('');
  const [nextHour, setNextHour] = useState<string>('');
  const [actualMinute, setActualMinute] = useState<number>(0);

  useEffect(() => {
    const updateCurrentHour = () => {
      const date = new Date();

      const hour = date.getHours();
      const minute = date.getMinutes();

      setActualMinute(minute);

      const period = date.getHours() >= 12 ? 'pm' : 'am';
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;

      setActualHour(
        `${hour12.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')} ${period}`
      );

      const _nextHour = hour + (1 % 12) === 0 ? 12 : (hour + 1) % 12;
      const nextPeriod = hour + 1 >= 12 ? 'pm' : 'am';
      const nextHourString = `${_nextHour}${nextPeriod}`;
      setNextHour(nextHourString);

      const currentHourString = `${hour12}${period}`;

      setCurrentHour(currentHourString);
    };

    updateCurrentHour();

    const intervalId = setInterval(updateCurrentHour, 100);

    return () => clearInterval(intervalId);
  }, []);

  return { currentHour, actualHour, nextHour, actualMinute };
}

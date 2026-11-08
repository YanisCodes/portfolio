import { useEffect, useState } from 'react';

const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Africa/Algiers',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

/** Live clock in Béjaïa (Africa/Algiers, UTC+1). */
export function useLocalTime() {
  const [time, setTime] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(fmt.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

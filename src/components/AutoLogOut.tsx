import { useEffect, useRef } from 'react';

const useAutoLogout = (timeoutDuration: number, logoutFunction: () => void) => {
  const logoutTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleInactivity = () => {
      const userWantsToStay = window.confirm('Do you want to keep browsing?');
      if (!userWantsToStay) {
        logoutFunction(); // Call the logout function passed as a parameter
      } else {
        resetInactivityTimer();
      }
    };

    const resetInactivityTimer = () => {
      if (logoutTimerRef.current !== null) {
        clearTimeout(logoutTimerRef.current);
      }
      logoutTimerRef.current = window.setTimeout(handleInactivity, timeoutDuration);
    };

    const activityDetected = () => resetInactivityTimer();
    window.addEventListener('mousemove', activityDetected);
    window.addEventListener('keydown', activityDetected);

    resetInactivityTimer();

    return () => {
      window.removeEventListener('mousemove', activityDetected);
      window.removeEventListener('keydown', activityDetected);
      if (logoutTimerRef.current !== null) {
        clearTimeout(logoutTimerRef.current);
      }
    };
  }, [timeoutDuration, logoutFunction]);
};

export default useAutoLogout;
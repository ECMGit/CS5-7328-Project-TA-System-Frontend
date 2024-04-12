import React, { useState, useEffect, useRef } from 'react';
import CustomModal from './CustomModal'; // Adjust the import path as necessary

interface UseAutoLogoutProps {
  timeoutDuration: number;
  logoutFunction: () => void;
}

const useAutoLogout = ({ timeoutDuration, logoutFunction }: UseAutoLogoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showModal = () => {
    setIsModalOpen(true); 
    // Start a logout countdown once the modal is shown
    logoutTimerRef.current = setTimeout(() => {
      logoutFunction(); // Log out the user automatically if no response
    }, 20000); // Give the user 20 seconds to respond to the modal
  };
  const handleUserActivity = () => {
    setIsModalOpen(false); 
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current); // Cancel automatic logout if user shows activity
    resetInactivityTimer(); // Reset the inactivity timer
  };

  const handleInactivity = () => {
    if (!isModalOpen) showModal();
  };

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current !== null) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(handleInactivity, timeoutDuration);
  };

  // Setup to detect user activity
  useEffect(() => {
    const activityDetected = () => handleUserActivity();
    window.addEventListener('mousemove', activityDetected);
    window.addEventListener('keydown', activityDetected);

    resetInactivityTimer();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', activityDetected);
      window.removeEventListener('keydown', activityDetected);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    };
  }, [timeoutDuration, logoutFunction]);

  return {
    Modal: (
      <CustomModal
        isOpen={isModalOpen}
        message="You've been inactive for a while. Do you want to continue your session?"
        onStay={handleUserActivity} // User decides to stay logged in
        onLeave={() => { // User decides to log out or does not respond in time
          if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
          logoutFunction();
        }}
      />
    ),
    closeModal: () => setIsModalOpen(false), // Allows manual closing of the modal
  };
};

export default useAutoLogout;

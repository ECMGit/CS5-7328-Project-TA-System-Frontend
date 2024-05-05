import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { timeoutWaitTime, timeoutDialogTime } from '../config';
import CustomModal from './CustomModal'; // Adjust the import path as necessary

/*
HOW TO USE
1. Import useAutoLogout from '../components/AutoLogOut', 
  or from '../../components/AutoLogOut' depending on file location.
2. Create a modal using const { Modal } = useAutoLogout();. 
  This must be created in your function with your other const
variables.
3. Insert the modal onto the page with {Modal} in the return statement. 
  Best inserted at the end before the end of your
last container.
*/

const useAutoLogout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutDuration = timeoutWaitTime;
  const timeoutDialog = timeoutDialogTime;
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true); 
    // Start a logout countdown once the modal is shown
    logoutTimerRef.current = setTimeout(() => {
      console.log('called');
      localStorage.clear();
      //setUser(null); //Some pages might need something like this
      //setIsLoggedIn(false);
      console.log('go to login');
      navigate('/login');  // Log out the user automatically if no response
    }, timeoutDialog); // Give the user timeDialog milliseconds to respond to the modal
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
  }, []); // Stop Condition

  return {
    Modal: (
      <CustomModal
        isOpen={isModalOpen}
        message="You've been inactive for a while. Do you want to continue your session?"
        onStay={handleUserActivity} // User decides to stay logged in
        onLeave={() => { // User decides to log out or does not respond in time
          if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
          console.log('called');
          localStorage.clear();
          console.log('go to login');
          navigate('/login');  // Log out the user automatically if no response
        }}
      />
    ),
    closeModal: () => setIsModalOpen(false), // Allows manual closing of the modal
  };
};

export default useAutoLogout;

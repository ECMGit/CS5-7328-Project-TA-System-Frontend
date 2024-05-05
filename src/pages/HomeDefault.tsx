import React, { useState, useEffect, useContext } from 'react';
// Import components (Typography and Container) from the Material-UI library.
import { Typography, Container, Button, Paper, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import TAJobDisplayComponent from './TAJobDisplayComponent';
import { UserContext } from '../provider';
import AvatarWrapper from '../components/AvatarWrapper';
import useAutoLogout from '../components/AutoLogOut';

const HomeDefault: React.FC = () => {
  const { Modal } = useAutoLogout();
  return (
    // Render the component within a container with a maximum width of 'sm'.
    <div>
      {/* Blue banner with "Login" button */}
      <div
        style={{
          backgroundColor: '#1976D2',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" style={{ color: '#FFF' }}>
        SMU Lyle School of Engineering Job Site
        </Typography>

        <div style={{ marginLeft: 'auto' }}>
          <Button component={Link} to="/login" variant="contained" color="secondary">
            Login
          </Button>
          <Button component={Link} to="/signUp" variant="contained" color="secondary" style={{ marginLeft: '8px' }}>
            Sign Up
          </Button>
        </div>
        {/* show student Profile if the user log in as student  */}
        
      </div>

      <div>
        {/* Large image at the top */}
        <img
          src="https://www.smu.edu/-/media/Site/DevelopmentExternalAffairs/MarketingCommunications/digital-marketing/students-hanging-dallas-hall.jpg?h=1333&iar=0&w=2000&hash=EAA3D7A0E96DA001440160E0ECB8643D"
          alt="SMU Dallas Hall"
          style={{ width: '100%', height: 'auto' }}
        />

        {/* Text box that spans the page, will fill it with about us and stuff BWG */}
        <Paper style={{ padding: '20px' }}>
          <Typography variant="body1">
            Welcome to CS5/7328 TA Job Site! This site is for SMU Lyle School of
            Engineering students to find TA jobs. Please log in or sign up to get started.
          </Typography>
        </Paper>
        {/* TODO: hide this Component when user not login */}

        {/* show the TAjob listing if the user is student */}

      </div>
      {Modal}
    </div>
  );






};
export default HomeDefault;
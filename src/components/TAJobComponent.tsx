//import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
} from '@mui/material';
import Button from '@mui/material/Button';
import { color, SxProps } from '@mui/system';
import { config } from 'dotenv';
import AuthService from '../services/auth';

// define the interface for a TAJob object so that its attributes can be used in the component
interface TAJobs {
  id: number;
  title: string;
  courseId: number;
  courseSchedule: string;
  totalHoursPerWeek: number;
  maxNumberOfTAs: number;
  requiredCourses: string;
  requiredSkills: string;
  TAStats: string;
  notes: string;
  deadlineToApply: string; // or Date, if it's already a Date object
  facultyId: number;
}

// define a TAJob props interface that makes the component props look nicer
// also deals with the TAJob object if it is undefined, null, or void
interface TAJobComponentProps {
  tajob: TAJobs | undefined | void;
}

const TAJobComponent: React.FC<TAJobComponentProps> = ({ tajob }) => {
  const [facName, setFacName] = useState('');

  useEffect(() => {
    // Fetch all TA jobs on component mount
    if (tajob) {
      AuthService.getUserById(tajob.facultyId)
        .then((res) => {
          // Assuming the data you need is located in `res.data`
          if (res.data) {
            setFacName(res.data.firstName + ' ' + res.data.lastName);
          }
        })
        .catch((err) => {
          console.error('An error occurred while fetching TA jobs:', err);
        });
    }
  }, [tajob]);

  //if the TAJob is undefined, null, or void, then handle it accordingly
  if (!tajob) {
    return (
      <div>
        <p>No TA job data available.</p>
      </div>
    );
  }

  return (
    <Box
      sx={{
        justifyContent: 'center',
        border: 1,
        borderRadius: '10px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '80%',
        bgcolor: 'background.paper',
        padding: '0.5rem 1rem 1rem 1rem',
        margin: '1rem 0rem',
      }}
    >
      {/* TAJob Info displayed, which includes the job title, id, course schedule, faculty, and application deadline */}
      <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ padding: '0rem', margin: '0rem' }}>
          <span style={{ textDecoration: 'underline' }}>TA Job</span>: {tajob.title}
        </h2>
        <div style={{ fontSize: '12px', color: 'gray' }}>(ID: {tajob.id})</div>
      </Typography>
      <p>
        <span style={{ textDecoration: 'underline' }}>Title</span>: {tajob.title}
      </p>
      <p>
        <span style={{ textDecoration: 'underline' }}>Course Schedule</span>: {tajob.courseSchedule}
      </p>
      <p>
        <span style={{ textDecoration: 'underline' }}>Faculty/Professor</span>: {facName}
      </p>{' '}
      {/* WIP --> Will need to change this to get the faculty's name from their ID */}
      <p>
        <span style={{ textDecoration: 'underline' }}>Application Deadline</span>:{' '}
        {new Date(tajob.deadlineToApply).toDateString()}
      </p>
      {/* 2 buttons to go to the specified TAJob's details and application pages respectively */}
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingTop: '0.5rem',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => (window.location.href = '/jobs/details/' + tajob.id)}
        >
          {' '}
          Details{' '}
        </Button>
        <Button
          style={{ marginLeft: '1rem' }}
          variant="contained"
          color="primary"
          onClick={() => (window.location.href = '/jobs/taapplication/' + tajob.id)}
        >
          {' '}
          Apply{' '}
        </Button>
      </Typography>
    </Box>
  );
};

export default TAJobComponent;

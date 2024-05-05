import React, { useState, useEffect, useContext } from 'react';
import TAJobService from '../services/tajob'; // Update with your actual service for TA jobs
import TAJobComponent from '../components/TAJobComponent';
import { Typography, Container, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext } from '../provider'; // update user context
import useAutoLogout from '../components/AutoLogOut';

// Update User interface to include userType
interface User {
  username: string;
  userType: string; // Assuming userType is a string
}

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
interface User {
  username: string;
  userType: string; // Assuming userType is a string
}

const TAJobDisplayComponent = () => {
  const { Modal } = useAutoLogout();
  const [taJobs, setTAJobs] = useState<TAJobs[]>([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    TAJobService.getTAJobs()
        .then(res => {
          if (res.data) {
            setTAJobs(res.data);
          }
        })
        .catch(err => {
          console.error('An error occurred while fetching TA jobs:', err);
        });
  }, []);

  if (!userContext || !userContext.user) {
    return <div>Loading...</div>;
  }

  const { user } = userContext;

    return (
        // Use the full width of the page, removing the maximum width limit
        <Container maxWidth={false} style={{ padding: '20px', width: '100%' }}>
            <Typography variant="h4" component="h1" gutterBottom style={{ textAlign: 'center' }}>TA Job Openings</Typography>
            {/* Ensure that the grid container width is appropriate for all child items */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                justifyContent: 'space-evenly',
            }}>
                {taJobs.map((job) => (
                    // Ensure that the minimum width of each card is wide enough to accommodate its content
                    <div key={job.id} style={{ minWidth: '300px' }}>
                        <TAJobComponent tajob={job} />
                    </div>
                ))}
            </div>
            {taJobs.length === 0 && <Typography>No job openings available.</Typography>}
        </Container>
      {Modal}

    );
};


export default TAJobDisplayComponent;


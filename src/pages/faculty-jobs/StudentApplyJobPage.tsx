//impoting statements
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import TopNav from '../../components/TopNav';

import { Container, Typography, Avatar, Box, Input, TextField, FormHelperText, Button, Card, CardContent, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import EditIcon from '@mui/icons-material/Edit';

import api from '../../services/tajob';
import { UserContext } from '../../provider';
import useAutoLogout from '../../components/AutoLogOut';

const ViewJobsStudent: React.FC = () => {

  // Type definition for formatting jobs
  type Job = {
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
    deadlineToApply: string;
    facultyId: number;
  };
  const { Modal } = useAutoLogout();
  //define user context
  const userContext = useContext(UserContext);
  //if user context is undefined then return loading
  if (!userContext) {
    return <div>Loading...</div>; // or any other fallback UI
  }
  //get user from user context
  const {user} = userContext;
  //define jobs and set jobs
  const [jobs, setJobs] = useState<Job[]>([]);
  //define editing and set editing
  useEffect(() => {
    api.getTAJobs().then(res => {
      if (res !== undefined) {
        setJobs(res.data);
      }
    });
  }, []);
  //define navigate
  const navigate = useNavigate();
  //return the following
  return (
    <Container>
      <TopNav />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Available TA Jobs
        </Typography>
        {
          jobs.map((job, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography><strong>Course ID:</strong> {job.courseId}</Typography>
                <Typography><strong>Schedule:</strong> {job.courseSchedule}</Typography>
                <Typography><strong>Total Hours/Week:</strong> {job.totalHoursPerWeek}</Typography>
                <Typography><strong>Max TAs:</strong> {job.maxNumberOfTAs}</Typography>
                <Typography><strong>Required Courses:</strong> {job.requiredCourses}</Typography>
                <Typography><strong>Required Skills:</strong> {job.requiredSkills}</Typography>
                <Typography><strong>TA Stats:</strong> {job.TAStats}</Typography>
                <Typography><strong>Notes:</strong> {job.notes}</Typography>
                <Typography><strong>Apply By: </strong> 
                  {new Date(job.deadlineToApply).toLocaleDateString()}</Typography>
                  <br/>
                <Button
                  variant="contained"
                  onClick={() => navigate('/application-form/?jobId='+ job.id + '&courseId=' + job.courseId + '&title=' + job.title)}
                >
                  Apply
                </Button>
              </CardContent>
            </Card>
          ))
        }
      </Box>
      {user?.role === 'faculty' ?
        (<Button variant="contained" onClick={() => navigate('/post-job')}>Post Job</Button>)
        : ''
      }
      {Modal}
    </Container>
  );
};

export default ViewJobsStudent;

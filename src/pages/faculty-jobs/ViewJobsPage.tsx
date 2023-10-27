import React from 'react';
import { useState, useEffect, FormEvent } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Container, Typography, Avatar, Box, Input, TextField, FormHelperText, Button, Card, CardContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import api from '../../services/faculty-job';


const ViewJobs: React.FC = () => {

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

  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    api.getJobs().then(res => {
      if (res !== undefined) {
        setJobs(res);
      }
    });
  }, []);

  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Jobs
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
                <Typography><strong>Apply By:</strong> {new Date(job.deadlineToApply).toLocaleDateString()}</Typography>
              </CardContent>
            </Card>
          ))
        }
      </Box>
      <Button variant="contained" onClick={() => navigate('/post-job')}>Post Job</Button>
    </Container>
  );

  function handleUploadClick() {
    document.getElementById('profileUpload')?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      // Handle the file upload here
    }
  }
};

export default ViewJobs;
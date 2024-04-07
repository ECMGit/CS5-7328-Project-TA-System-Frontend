import React, { useContext } from 'react';
import { useState, useEffect, FormEvent } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Container, Typography, Avatar, Box, Input, TextField, FormHelperText, Button, Card, CardContent, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import EditIcon from '@mui/icons-material/Edit';

import api from '../../services/faculty-job';
import { UserContext } from '../../provider';


const ViewJobs: React.FC = () => {

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
  const userContext = useContext(UserContext);
  if (!userContext) {
    return <div>Loading...</div>; // or any other fallback UI
  }
  const { user } = userContext;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editing, setEditing] = useState<number | null>(null); // Add a state to track which job is being edited
  const [editedJob, setEditedJob] = useState<Job | null>(null); // Add a state to store the edited job data

  const storedUser = localStorage.getItem('user');

  //faculty can see all TA jobs published
  useEffect(() => {
    console.log('Finding all jobs for: ');
    const fetchJobs = async () => {
      try {
        const jobs = await api.getJobs(); // get the promise object
        if (jobs !== undefined) {
          setJobs(jobs);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, []);

  const navigate = useNavigate();

  // Add a function to handle the edit button click
  const handleEditClick = (job: Job) => {
    setEditing(job.id); // Set the editing state to the job id
    setEditedJob(job); // Set the edited job state to the job data
  };

  // Add a function to handle the input change for the edited job
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // name and value from the event target
    if (editedJob) {
      setEditedJob({
        ...editedJob, // Spread the edited job data
        [name]: value // Update the property with the input name to the input value
      });
    }
  };

  // Add a function to handle the save button click

  const handleSaveClick = () => {
    if (editedJob) {

      api.updateJob(editedJob.id, { // Update the job with the edited job data in the database
        title: editedJob.title,
        courseId: Number(editedJob.courseId),
        courseSchedule: editedJob.courseSchedule,
        totalHoursPerWeek: Number(editedJob.totalHoursPerWeek),
        maxNumberOfTAs: Number(editedJob.maxNumberOfTAs),
        requiredCourses: editedJob.requiredCourses,
        requiredSkills: editedJob.requiredSkills,
        TAStats: editedJob.TAStats,
        notes: editedJob.notes,
        deadlineToApply: new Date(editedJob.deadlineToApply),
        facultyId: Number(editedJob.facultyId)
      }).then(res => {
        if (res !== undefined) {
          // Update the jobs state with the edited job data
          setJobs(jobs.map(job => job.id === editedJob.id ? editedJob : job)); // Update jobs state with edited data 
          // Reset the editing and edited job states
          setEditing(null); // Reset the editing state
          setEditedJob(null); // Reset the edited job state
        }
      });
    }
  };


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
                {
                  // Check if the job is being edited
                  editing === job.id ?
                    // If yes, render the input fields for editing
                    <>
                      <TextField
                        label="Title"
                        name="title"
                        value={editedJob?.title}
                        onChange={handleInputChange}
                        // Add the fullWidth prop to make the box grow to fit the text
                        fullWidth
                        // Add the margin prop to add some space between the boxes
                        margin="normal"
                      />
                      <TextField
                        label="Course ID"
                        name="courseId"
                        value={editedJob?.courseId}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Schedule"
                        name="courseSchedule"
                        value={editedJob?.courseSchedule}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Total Hours/Week"
                        name="totalHoursPerWeek"
                        value={editedJob?.totalHoursPerWeek}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Max TAs"
                        name="maxNumberOfTAs"
                        value={editedJob?.maxNumberOfTAs}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Required Courses"
                        name="requiredCourses"
                        value={editedJob?.requiredCourses}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Required Skills"
                        name="requiredSkills"
                        value={editedJob?.requiredSkills}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="TA Stats"
                        name="TAStats"
                        value={editedJob?.TAStats}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Notes"
                        name="notes"
                        value={editedJob?.notes}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Apply By"
                        name="deadlineToApply"
                        value={editedJob?.deadlineToApply ? new Date(editedJob?.deadlineToApply).toLocaleDateString() : ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                      />
                      <Button onClick={handleSaveClick}>Save</Button>
                    </>

                    :
                    // If no, render the normal text fields
                    <>
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
                      <IconButton onClick={() => handleEditClick(job)}>
                        <EditIcon />
                      </IconButton>
                    </>
                }
              </CardContent>
            </Card>
          ))
        }
      </Box>
      {user?.role === 'faculty' ?
        (<Button variant="contained" onClick={() => navigate('/post-job')}>Post Job</Button>)
        : ''
      }
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
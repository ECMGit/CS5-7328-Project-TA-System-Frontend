import React from 'react';
import { useState, FormEvent } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Container, Typography, Avatar, Box, Input, TextField, FormHelperText, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import api from '../../services/faculty-job';


const PostJob: React.FC = () => {

  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courseSchedule, setCourseSchedule] = useState('');
  const [totalHour, setTotalHour] = useState('');
  const [maxTaCount, setMaxTaCount] = useState('');
  const [requiredCourses, setRequiredCourse] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [TaStats, setTaStats] = useState('');
  const [notes, setNotes] = useState('');
  const [deadline, setDeadline] = useState('');

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    api.postJob({
      title: title,
      courseId: parseInt(courseId),
      courseSchedule: courseSchedule,
      totalHoursPerWeek: parseInt(totalHour),
      maxNumberOfTAs: parseInt(maxTaCount),
      requiredCourses: requiredCourses,
      requiredSkills: requiredSkills,
      TAStats: TaStats,
      notes: notes,
      deadlineToApply: new Date(deadline),
      facultyId: 1, // TODO: Make this read the logged in user's ID
    }).then(
      () => {
        navigate('/jobs');
        window.location.reload();
      }, (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, }} >
        <Typography component="h1" variant="h5">
          Post TA Job
        </Typography>
        <Box component="form" onSubmit={handleSubmit} mt={3}>
          <TextField label="Title" margin="normal" required fullWidth autoComplete="name" onChange={(e) => { setTitle(e.target.value); }} autoFocus />
          <TextField label="Course ID" margin="normal" required fullWidth onChange={(e) => { setCourseId(e.target.value); }} autoFocus />
          <TextField label="Course Schedule" margin="normal" required fullWidth onChange={(e) => { setCourseSchedule(e.target.value); }} />
          <TextField label="Total Hour" margin="normal" required fullWidth onChange={(e) => { setTotalHour(e.target.value); }} />
          <TextField label="Max TA Count" margin="normal" required fullWidth onChange={(e) => { setMaxTaCount(e.target.value); }} />
          <TextField label="Required Course" margin="normal" required fullWidth onChange={(e) => { setRequiredCourse(e.target.value); }} />
          <TextField label="Required Skills" margin="normal" required fullWidth onChange={(e) => { setRequiredSkills(e.target.value); }} />
          <TextField label="TA Stats" margin="normal" required fullWidth onChange={(e) => { setTaStats(e.target.value); }} />
          <TextField label="Notes" margin="normal" fullWidth onChange={(e) => { setNotes(e.target.value); }} />
          <TextField label="Deadline" margin="normal" required fullWidth onChange={(e) => { setDeadline(e.target.value); }} />
          <LoadingButton type="submit" variant="contained" loading={loading} sx={{ mt: 4, mb: 3 }}>Post Job</LoadingButton>
          <Button component={RouterLink} variant="text" to='/jobs' sx={{ mt: 4, mb: 3 }} >Cancel</Button>
          <FormHelperText>{message}</FormHelperText>
        </Box>
      </Box>
    </Container>
  );

};

export default PostJob;
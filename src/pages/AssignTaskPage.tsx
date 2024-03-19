import React from 'react';
import { useState, FormEvent } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Container, Typography, Avatar, Box, Input, TextField, FormHelperText, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// import api from '../../services/faculty-job';


const AssignTask: React.FC = () => {
  // State hooks for form fields and validation errors
  //   const [faculty_id, setFaculty_id] = useState(''); // COmes from later check
  const [student_id, setStudent_id] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('');
  // TODO: Add Deadline as date value??

  const checkAlphanumeric = (input: string): boolean => {
    // Check each character of the input
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      if (!(char > 47 && char < 58) && // numeric (0-9)
          !(char > 64 && char < 91) && // upper alpha (A-Z)
          !(char > 96 && char < 123)) { // lower alpha (a-z)
        return false; // non-alphanumeric character found
      }
    }
    return true; // only alphanumeric characters
  };
  //Handler for Title:

  //Handler for description:

  //Handler for Urgency:

  //Handler for Student Id:
  const handleStudentIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    // IF NUMERIC AND IN DATABASE {
    //setStudent_id(input)
    //setStudent_idError('') 
    //} else {
    //setStudent_idError('Student id invalid)
  };
  


  const navigate = useNavigate();

  const storedUser = localStorage.getItem('user');


  const handleSubmit = () => {
    const userId = JSON.parse(storedUser!).id; 
    api.assignTask({
      facultyId: userId,
      studentId: student_id,
      title: title,
      description: description,
      urgency: urgency,
      completed: false,
      verfied: false
    }).then(
      () => {
        navigate('/tasks');
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

  // JSX for rendering the form
  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, }} >
        <Typography component="h1" variant="h5">
                    Assign TA Task
        </Typography>
        <Box component="form" onSubmit={handleSubmit} mt={3}>
          <TextField label="Title" margin="normal" required fullWidth autoComplete="name" onChange={(e) => { setTitle(e.target.value); }} autoFocus />
          <TextField
            label="Assignee (Student ID)"
            margin="normal"
            required
            fullWidth
            autoComplete="off"
            value={student_id}
            // onChange={handleCourseIdChange}
            // error={!!courseIdError}
            // helperText={courseIdError}
            autoFocus
          />
          <TextField label="Course Schedule" margin="normal" required fullWidth onChange={(e) => { setCourseSchedule(e.target.value); }} />
          <TextField
            label="Total Hour"
            margin="normal"
            required
            fullWidth
            type="number"
            inputProps={{ min: 0 }}
            error={!totalHour || isNaN(Number(totalHour))}
            helperText={!totalHour || isNaN(Number(totalHour)) ? 'Total Hour must be a number' : ''}
            onChange={(e) => { setTotalHour(e.target.value); }}
          />
          <TextField
            label="Max TA Count"
            margin="normal"
            required
            fullWidth
            type="number"
            inputProps={{ min: 0 }}
            error={!maxTaCount || isNaN(Number(maxTaCount))}
            helperText={!maxTaCount || isNaN(Number(maxTaCount)) ? 'Max TA Count must be a number' : ''}
            onChange={(e) => { setMaxTaCount(e.target.value); }}
          />
          <TextField
            label="Required Course"
            margin="normal"
            required
            fullWidth
            autoComplete="off"
            value={requiredCourses}
            onChange={handleRequiredCoursesChange}
            error={!!requiredCoursesError}
            helperText={requiredCoursesError}
          />
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
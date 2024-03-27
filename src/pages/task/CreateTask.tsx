import React from 'react';
import { useState, FormEvent } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Container, Typography, Avatar, Box, Input, TextField, FormHelperText, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import api from '../../services/taskform';


const CreateTask: React.FC = () => {
  // State hooks for form fields and validation errors
  //   const [faculty_id, setFaculty_id] = useState(''); // COmes from later check
  const [student_id, setStudent_id] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [urgency, setUrgency] = useState('');
  // TODO: Add Deadline as date value??

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  //Errors
  const [Student_idError, setStudent_idError] = useState('');
  // const [Title_Error , setTitle_Error] = useState('');


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

  const checkNumeric = (input:string): boolean => {
    // Check each character of the input
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      if (!(char > 47 && char < 58)) return false; // non-numeric character found
    }
    return true; // only numeric characters
  };



  //Handler for Student Id:
  const handleStudentIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    // IF NUMERIC AND IN DATABASE 
    if(checkNumeric(input))
    {
      setStudent_id(input);
      setStudent_idError(''); 
    }
    else {
      setStudent_idError('Student id invalid');
    }
  };


  const navigate = useNavigate();

  const storedUser = localStorage.getItem('user');

  const handleSubmit = () => {
    const userId = JSON.parse(storedUser!).id; 
    api.createTask(
      userId,
      +student_id, // convert to number
      title,
      description,
      // urgency: urgency,
      // completed: false,
      // verified: false
    ).then(
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
          {/* Title */}
          <TextField 
            label="Title " 
            margin="normal" 
            required 
            fullWidth 
            autoComplete="name" 
            onChange={(e) => { setTitle(e.target.value); }} 
            autoFocus />
          {/* Student Task Assigned to */}
          <TextField
            label="Assignee (Student ID)"
            margin="normal"
            required
            fullWidth
            autoComplete="off"
            value={student_id}
            onChange={handleStudentIdChange}
            error={!!Student_idError}
            helperText={Student_idError}
            autoFocus
          />
          {/* Task Description */}
          <TextField 
            label="Description" 
            margin="normal" 
            required 
            fullWidth 
            onChange={(e) => { setDescription(e.target.value); }} 
          />
          {/* Task Urgency 
          May convert to High , Medium, Low*/}
          {/* <TextField
            label="Urgency (Number 1-5  "
            margin="normal"
            required
            fullWidth
            type="number"
            inputProps={{ min: 0 }}
            error={!urgency || isNaN(Number(urgency))}
            helperText={!urgency || isNaN(Number(urgency)) ? 'Urgency must be a number' : ''}
            onChange={(e) => { setUrgency(e.target.value); }}
          /> */}
          <LoadingButton 
            type="submit" 
            variant="contained" 
            loading={loading} 
            sx={{ mt: 4, mb: 3 }}
          >
              Assign Task
          </LoadingButton>
          <Button 
            component={RouterLink} 
            variant="text" 
            to='/tasks' 
            sx={{ mt: 4, mb: 3 }} 
          >
            Home
          </Button>
          <FormHelperText>{message}</FormHelperText>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateTask;
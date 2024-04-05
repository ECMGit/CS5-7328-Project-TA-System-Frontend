import React, { useState } from 'react'; // add create message button to draft a message
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface TAJob {
  title: string;
}

interface Course {
  title: string;
}

const CreateMessage = () => {
  const [recipient, setRecipient] = useState('');
  const [taJob, setTAJob] = useState('');
  const [course, setCourse] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:9000/message/send', {
        recipient,
        taJob,
        course,
        content,
      });

      const data = response.data;

      console.log(data);
      // Reset form fields after successful submission
      setRecipient('');
      setTAJob('');
      setCourse('');
      setContent('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Create Message
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Recipient"
          variant="outlined"
          fullWidth
          margin="normal"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>TA Job</InputLabel>
          <Select
            value={taJob}
            onChange={(e) => setTAJob(e.target.value)}
            required
          >
            <MenuItem value="TA for Computer Science">
              TA for Computer Science
            </MenuItem>
            <MenuItem value="TA for Data Structures">
              TA for Data Structures
            </MenuItem>
            <MenuItem value="TA for Artificial Intelligence">
              TA for Artificial Intelligence
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Course</InputLabel>
          <Select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          >
            <MenuItem value="Introduction to Programming">
              Introduction to Programming
            </MenuItem>
            <MenuItem value="Advanced Algorithms">Advanced Algorithms</MenuItem>
            <MenuItem value="Machine Learning Basics">
              Machine Learning Basics
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Send Message
        </Button>
      </form>
    </Container>
  );
};

export default CreateMessage;

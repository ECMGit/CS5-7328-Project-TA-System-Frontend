import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '16px', // Manually define spacing, e.g., 16px
    margin: 'auto',
    maxWidth: 600,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
}));

const TaApply = () => {
  const classes = useStyles();

  const [courseId, setCourseId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [coursesTaken, setCoursesTaken] = useState<string[]>([]);
  const [gpaToDate, setGpaToDate] = useState('');
  const [requiredCourses, setRequiredCourses] = useState<string[]>([]);
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('Application submitted successfully!');
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography variant="h5" align="center">
          TA Job Application
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Course ID"
            fullWidth
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          />

          <TextField
            label="Course Name"
            fullWidth
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />

          <TextField
            label="Student Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Status"
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <TextField
            label="Hours could work per week"
            fullWidth
            value={hoursPerWeek}
            onChange={(e) => {
              const input = e.target.value;
              if (/^\d*\.?\d*$/.test(input)) {
                setHoursPerWeek(input);
              } else {
                setHoursPerWeek('');
              }
            }}
          />

          <TextField
            label="Courses taken"
            fullWidth
            value={coursesTaken.join(',')}
            onChange={(e) => setCoursesTaken(e.target.value.split(','))}
          />

          <TextField
            label="GPA to date"
            fullWidth
            value={gpaToDate}
            onChange={(e) => {
              const input = e.target.value;
              if (/^\d*\.?\d*$/.test(input)) {
                setGpaToDate(input);
              } else {
                setGpaToDate('');
              }
            }}
          />

          <TextField
            label="Required courses taken"
            fullWidth
            value={requiredCourses.join(',')}
            onChange={(e) => setRequiredCourses(e.target.value.split(','))}
          />

          <TextField
            label="Required skills"
            fullWidth
            value={requiredSkills.join(',')}
            onChange={(e) => setRequiredSkills(e.target.value.split(','))}
          />

          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setResumeFile(e.target.files[0]);
              } else {
                setResumeFile(null);
              }
            }}
          />

          <Button type="submit" variant="contained" color="primary" size="large">
            Submit Resume
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default TaApply;
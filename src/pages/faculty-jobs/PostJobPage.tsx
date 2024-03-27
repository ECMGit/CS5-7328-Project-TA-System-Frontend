import React, { useEffect } from 'react';
import { useState, FormEvent } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { backendURL } from '../../config';
import { Container, Typography, Avatar, Box, Input, TextField, FormHelperText, Button, Select, InputLabel, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import api from '../../services/faculty-job';

interface Course {
  courseCode: string;
  title: string;
}

const PostJob: React.FC = () => {
  // State hooks for form fields and validation errors
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

  const [courseIdError, setCourseIdError] = useState('');
  const [requiredCoursesError, setRequiredCoursesError] = useState('');

  // Available courses
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchAvailableCourses() {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization:  `Bearer ${token}`
        };
        const response = await fetch(`${backendURL}/course/nodetails`, {
          headers: headers
        });

        if (!response.ok) {
          throw new Error('Failed to fetch available courses');
        }
        const courses = await response.json();
        setAvailableCourses(courses);
      } catch (error) {
        console.error('Error fetching available courses:', error);
      }
    }

    fetchAvailableCourses();
  }, []);

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
  // Handler for changes in the Course ID field
  const handleCourseIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (checkAlphanumeric(input)) {
      setCourseId(input);
      setCourseIdError('');
    } else {
      setCourseIdError('Course ID must only contain letters and numbers.');
    }
  };
  // Handler for changes in the Required Courses field
  // const handleRequiredCoursesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const input = event.target.value;
  //   if (checkAlphanumeric(input)) {
  //     setRequiredCourse(input);
  //     setRequiredCoursesError('');
  //   } else {
  //     setRequiredCoursesError('Required Course must only contain letters and numbers.');
  //   }
  // };

  const navigate = useNavigate();

  const storedUser = localStorage.getItem('user');


  const handleSubmit = () => {
    const userId = JSON.parse(storedUser!).id;
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
      facultyId: userId
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

  // JSX for rendering the form
  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, }} >
        <Typography component="h1" variant="h5">
          Post TA Job
        </Typography>
        <Box component="form" onSubmit={handleSubmit} mt={3}>
          <TextField label="Title" margin="normal" required fullWidth autoComplete="name" onChange={(e) => { setTitle(e.target.value); }} autoFocus />
          <InputLabel>Courses</InputLabel>
          <Select
            required
            fullWidth
            autoComplete="off"
            value={courseId}
            onChange={(e) => {
              setCourseId(e.target.value);
            }}
            error={!!courseIdError}
            autoFocus
          >
            {availableCourses.map((course) => {
              return <MenuItem key={course.courseCode} value={course.courseCode}>
                {course.courseCode} - {course.title}
              </MenuItem>;
            }
            )}
          </Select>
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
          {/* <TextField
            label="Required Course"
            margin="normal"
            required
            fullWidth
            autoComplete="off"
            value={requiredCourses}
            onChange={handleRequiredCoursesChange}
            error={!!requiredCoursesError}
            helperText={requiredCoursesError}
          /> */}
          <InputLabel>Required Course</InputLabel>
          <Select
            required
            fullWidth
            autoComplete="off"
            value={requiredCourses}
            onChange={(e) => {
              setRequiredCourse(e.target.value);
            }}
            error={!!requiredCoursesError}
            autoFocus
          >
            {availableCourses.map((course) => {
              return <MenuItem key={course.courseCode} value={course.courseCode}>
                {course.courseCode} - {course.title}
              </MenuItem>;
            }
            )}
          </Select>
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

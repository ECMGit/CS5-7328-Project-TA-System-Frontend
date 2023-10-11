import React, { useState } from 'react';
import {
  Box,
  Container,
  FormHelperText,
  FormControl,
  Grid,
  TextField,
  CssBaseline,
  Link,
  Avatar,
  Typography,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
  Stack,
  Chip,
  Button,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import FileUpload from '../../components/FileUpload';

const courses = [
  'Math 101',
  'Comp Sci 201',
  'Phys 102',
  'Hist 101',
  'Comp Sci 301',
  'Comp Sci 401',
  'Comp Sci 402',
];

const skills = [
  'Java',
  'React',
  'C',
  'C#',
  'Ruby',
  'Node.js',
  'TypeScript',
  'Teaching',
];

function ApplicationPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [status, setStatus] = useState('');
  const [weeklyHours, setWeeklyHours] = useState('');
  const [gpa, setGpa] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSubmit = function () {
    alert('Submit button clicked!');
    return;
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          pb: 8,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            pb: 2,
            borderBottom: '2px solid rgba(0, 0, 255, 0.5)',
            width: '100%',
          }}
        >
          Student Apply
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid
            container
            spacing={1}
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Grid item xs={12}>
              <Typography component="h2" variant="h6" justifyContent="center">
                Name
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="family-name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                variant="standard"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography component="h2" variant="h6" justifyContent="center">
                Course ID
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                required
                fullWidth
                id="courseId"
                label="Course ID"
                name="courseId"
                autoComplete="family-name"
                onChange={(e) => setCourseId(e.target.value)}
                value={courseId}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography component="h2" variant="h6" justifyContent="center">
                Course Name
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                required
                fullWidth
                id="courseName"
                label="Course Name"
                name="courseName"
                autoComplete="family-name"
                onChange={(e) => setCourseName(e.target.value)}
                value={courseName}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography component="h2" variant="h6" justifyContent="center">
                Status <span>(Working Full-time/Part-time?)</span>
              </Typography>
            </Grid>
            <Grid item xs={8} sm={8}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={status}
                  label="Age"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                </Select>
                <FormHelperText>Select your prefered job type</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography component="h2" variant="h6" justifyContent="center">
                How many hours do you prefer to work per week?
              </Typography>
            </Grid>
            <Grid item xs={8} sm={8}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Time
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={weeklyHours}
                  label="WeeklyHours"
                  onChange={(e) => setWeeklyHours(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="< 10">Less than 10 hours per week</MenuItem>
                  <MenuItem value="< 20">Less than 20 hours per week</MenuItem>
                  <MenuItem value="> 20">More than 20 hours per week</MenuItem>
                </Select>
                <FormHelperText>Select your prefered job type</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography component="h2" variant="h4" justifyContent="center">
                Now, tell us how you well do in school 😏
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography component="h2" variant="h6" justifyContent="center">
                Your GPA
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                required
                fullWidth
                id="gpa"
                label="GPA"
                name="gpa"
                autoComplete="family-name"
                onChange={(e) => setGpa(e.target.value)}
                value={gpa}
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography component="h2" variant="h6" justifyContent="center">
                Related courses you have taken
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl sx={{ m: 1, width: 500 }}>
                <InputLabel>Courses Chosen</InputLabel>
                <Select
                  multiple
                  value={selectedCourses}
                  onChange={(e) =>
                    setSelectedCourses(e.target.value as string[])
                  }
                  input={<OutlinedInput label="Multiple Select" />}
                  renderValue={(selected) => (
                    <Stack gap={1} direction="row" flexWrap="wrap">
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          onDelete={() =>
                            setSelectedCourses(
                              selectedCourses.filter((item) => item !== value)
                            )
                          }
                          deleteIcon={
                            <CancelIcon
                              onMouseDown={(event) => event.stopPropagation()}
                            />
                          }
                        />
                      ))}
                    </Stack>
                  )}
                >
                  {courses.map((courses) => (
                    <MenuItem key={courses} value={courses}>
                      {courses}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography component="h2" variant="h6" justifyContent="center">
                Related skills
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl sx={{ m: 1, width: 500 }}>
                <InputLabel>Skills Chosen</InputLabel>
                <Select
                  multiple
                  value={selectedSkills}
                  onChange={(e) =>
                    setSelectedSkills(e.target.value as string[])
                  }
                  input={<OutlinedInput label="Multiple Select" />}
                  renderValue={(selected) => (
                    <Stack gap={1} direction="row" flexWrap="wrap">
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          onDelete={() =>
                            setSelectedSkills(
                              selectedSkills.filter((item) => item !== value)
                            )
                          }
                          deleteIcon={
                            <CancelIcon
                              onMouseDown={(event) => event.stopPropagation()}
                            />
                          }
                        />
                      ))}
                    </Stack>
                  )}
                >
                  {skills.map((skill) => (
                    <MenuItem key={skill} value={skill}>
                      {skill}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography component="h2" variant="h6" justifyContent="center">
                Upload your resume
              </Typography>
              <span>
                <FileUpload />
              </span>
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default ApplicationPage;

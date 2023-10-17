import React, { useState} from 'react';
import {
  Box,
  Container,
  FormHelperText,
  FormControl,
  Grid,
  TextField,
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
import BottomPanel from '../../components/BottomPanel';
import ApplyService from '../../services/apply';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

// TODO: this needs to come from back-end in the future
// Static variable field
const courses = [
  'Math 101',
  'Comp Sci 201',
  'Phys 102',
  'Hist 101',
  'Comp Sci 301',
  'Comp Sci 401',
  'Comp Sci 402',
  'Stat 302',
];

const skills = [
  'Java',
  'C',
  'C#',
  'Python',
  'AWS',
  'Azure',
  'Ruby',
  'Node.js',
  'React',
  'Spring Framework',
  'Angular',
  'TypeScript',
  'Teaching',
];

/* Component for the application page */
function ApplicationPage() {
  /* State Field */
  // Basic Information
  // TODO: these ids need to come from previous endpoinds in the future
  const [taJobId] = useState(1);
  const [courseId] = useState(1);
  const [studentId] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [status, setStatus] = useState('');
  const [hoursCanWorkPerWeek, setWeeklyHours] = useState('');
  const [GPA, setGpa] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // File Upload:
  // This would indicate the file upload status, and file name.
  // fileStatus false: no file was uploaded, true otherwise.
  const [fileStatus, setFileStatus] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const [fileEntity, setFileEntity] = useState<File | undefined>(new File([], ''));

  /* Helper Functions */
  /**
   * Format {courseId <Number>, gpa <Float>, selectedCourse <String>, selectedSkills <String>}
   * @return: an object that saves the formatted state names as key, and the formatted
   * result as values.
   */
  const formatFormData = () => {
    // Convert data
    const formatGpa = parseFloat(GPA);
    const formatSelectedCourse = selectedCourses.join(',');
    const formatSelectedSkills = selectedSkills.join(',');

    

    // Return the object that includes all the key-value pairs.
    return {
      taJobId,
      courseId,
      studentId,
      firstName,
      lastName,
      courseName,
      status,
      hoursCanWorkPerWeek,
      gpa: formatGpa,
      coursesTaken: formatSelectedCourse,
      requiredSkills: formatSelectedSkills,
      fileName,
    };
  };

  const navigate = useNavigate();

  /* DOM Event Handlers */
  /**
   * Submission handler
   */
  const handleSubmit = function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Get the data in json format.
    const tempData=JSON.stringify(formatFormData());
    const jsonData = JSON.parse(tempData);
    // const jsonData=formatFormData();
    const resume = fileEntity;
    // For testing purpose
    console.log(jsonData);
    
    // Consider to add navigation and success prompt here.
    if(resume){
      ApplyService.apply(jsonData,resume).then(
        () => {
          navigate('/login');
          window.location.reload();
        },
        (error: AxiosError | Error) => {
          let resMessage;
          if (error instanceof AxiosError) {
            resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          } else {
            resMessage = error.message || 'An error occurred';
          }
        }
      );
    }

  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            pb: 4,
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              pb: 2,
              borderBottom: '2px solid rgba(0, 0, 255, 0.5)',
              width: '100%',
              marginTop: 2,
            }}
          >
            Student Apply
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
          >
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
                    value={hoursCanWorkPerWeek}
                    label="WeeklyHours"
                    onChange={(e) => setWeeklyHours(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="< 10">
                      Less than 10 hours per week
                    </MenuItem>
                    <MenuItem value="< 20">
                      Less than 20 hours per week
                    </MenuItem>
                    <MenuItem value="> 20">
                      More than 20 hours per week
                    </MenuItem>
                  </Select>
                  <FormHelperText>
                    Select your weekly availability
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography component="h2" variant="h4" justifyContent="center">
                  Now, tell us how you well do in school 🚀
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
                  value={GPA}
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
                <FileUpload
                  fileStatus={fileStatus}
                  setFileStatus={setFileStatus}
                  fileName={fileName}
                  setFileName={setFileName}
                  fileEntity={fileEntity}
                  setFileEntity={setFileEntity}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <BottomPanel />
    </>
  );
}

export default ApplicationPage;
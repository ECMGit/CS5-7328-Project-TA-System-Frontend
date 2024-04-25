import React, { useState, useEffect } from 'react';
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
  IconButton,
  InputBase,
  Paper,
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
import { useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

interface UserMessage {
  id: number;
  content: string;
  createdAt: string; // or Date if you are converting the date string to a Date object
  senderId: number;
  receiverId: number;
  applicationId: number;
  sender: { username: string }; // Assuming 'name' is the field you have
  receiver: { username: string }; // Adjust according to your data structure
  // Include other fields if necessary
}

/* Component for the application page */
function ApplicationPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch messages when the component mounts or when the ID changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (id === undefined) {
          // Handle the case where id is undefined
          console.error('id is undefined');
          return;
        }
        const data = await ApplyService.fetchMessages(id);
        console.log(data);
        if (Array.isArray(data)) { // Make sure the received data is an array
          setMessages(data);
        } else {
          console.error('Received data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages

    try {
      // Replace with your API endpoint and adjust the payload as necessary
      const response = await axios.post('http://localhost:9000/message', {
        senderId: 1, // Replace with the logged in user's ID
        receiverId: 2, // Replace with the recipient's ID
        content: newMessage,
        applicationId: Number(id),
      });

      // Update the messages array to include the new message
      setMessages(prevMessages => [...prevMessages, response.data]);
      setNewMessage(''); // Reset the input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const [application, setApplication] = useState({
    firstName: '',
    lastName: '',
    studentId: '',
    courseName: '',
    GPA: '',
    hoursCanWorkPerWeek: '',
    requiredCourses: [],
    requiredSkills: [],
    resume: '',
    // other fields as necessary
  });


  useEffect(() => {
    const loadData = async () => {
      try {
        if (!id) {
          console.error('No application ID provided');
          return;
        }
        const data = await ApplyService.fetchApplication(id);
        // Ensuring requiredCourses and requiredSkills are arrays
        data.requiredCourses = Array.isArray(data.requiredCourses) ? data.requiredCourses : [];
        data.requiredSkills = Array.isArray(data.requiredSkills) ? data.requiredSkills : [];
        data.firstName = data.firstName ? data.firstName : '';
        data.lastName = data.lastName ? data.lastName : '';
        data.studentId = data.studentId ? data.studentId : '';
        data.courseName = data.courseName ? data.courseName : '';
        data.GPA = data.GPA ? data.GPA : '';
        data.hoursCanWorkPerWeek = data.hoursCanWorkPerWeek ? data.hoursCanWorkPerWeek : '';
        data.resume = data.resume ? data.resume : '';
        setApplication(data);
      } catch (error) {
        console.error('Error loading application', error);
      }
    };

    loadData();
  }, [id]);
  



  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ my: 2, display: 'flex', alignItems: 'center' , marginLeft: '-55px' }}>
        {/* Back Button */}
        <IconButton onClick={() => navigate(-1)} sx={{ marginRight: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography component="h1" variant="h4" sx={{ flexGrow: 1 }}>
          Application Details
        </Typography>
      </Box>
      
      <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', pb: 4 }}>
        <Typography variant="h6">Name: {application.firstName} {application.lastName}</Typography>
        <Typography variant="h6">Student ID: {application.studentId}</Typography>
        <Typography variant="h6">Course Name: {application.courseName}</Typography>
        <Typography variant="h6">GPA: {application.GPA}</Typography>
        <Typography variant="h6">Hours Available Per Week: {application.hoursCanWorkPerWeek}</Typography>

        <Typography variant="h6">Related Courses:</Typography>
        <Stack direction="row" spacing={1}>
          {application.requiredCourses.map(course => (
            <Chip key={course} label={course} />
          ))}
        </Stack>

        <Typography variant="h6">Skills:</Typography>
        <Stack direction="row" spacing={1}>
          {application.requiredSkills.map(skill => (
            <Chip key={skill} label={skill} />
          ))}
        </Stack>

        <Typography variant="h6">Resume: {application.resume}</Typography>
      </Box>

      <Box
        component="section"
        sx={{
          backgroundColor: '#f4f6f8',
          border: '1px solid #e0e0e0',
          borderRadius: '10px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          maxHeight: '400px',
        }}
      >
        {/* Message List */}
        <Box sx={{ overflowY: 'auto', p: 2, flexGrow: 1 }}>
          {messages.map((message, index) => (
            <Paper key={index} sx={{ p: '10px', mb: '10px', maxWidth: '70%', backgroundColor: '#fff' }}>
              <Typography variant="body1">{message.content}</Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Sent by {message.sender.username} to {message.receiver.username} on 
                {new Date(message.createdAt).toLocaleString()}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* New Message Input */}
        <Box
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            p: '10px',
            borderTop: '1px solid #e0e0e0',
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            inputProps={{ 'aria-label': 'type a message' }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="send">
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
      <BottomPanel />
    </Container>
  );







  /* State Field */
  // Basic Information
  // TODO: these ids need to come from previous endpoinds in the future
  const [studentId, setStudentId] = useState<number>(1);
  const [courseId, setCourseId] = useState<number>(1);
  const [taJobId, setTaJobId] = useState<number>(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [status, setStatus] = useState('');
  const [hoursCanWorkPerWeek, sethoursCanWorkPerWeek] = useState('');
  const [GPA, setGpa] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Verifications for GPA states formats
  const [gpaError, setGpaError] = useState(false);
  const [gpaErrorMessage, setGpaErrorMessage] = useState('');

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
      requiredCourses: formatSelectedCourse,
      requiredSkills: formatSelectedSkills,
      fileName,
    };
  };

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

  /**
   * Handles the change of GPA input, prompt errors if user
   * input is not a valid number, or outside of the range
   * between 0.0 to 4.0
   * @param event: user input event
   */
  const handleGpaChange = function (
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    // event.preventDefault();
    const valueStr = event.target.value;
    const value = parseFloat(valueStr);
    if (valueStr.trim() === '') {
      setGpaError(false);
      setGpaErrorMessage('');
      setGpa(valueStr);
      return;
    }

    // Check if the value is a valid number and within the range 0.0 to 4.0
    if (isNaN(value) || value > 4.0 || value < 0.0) {
      setGpaError(true);

      if (isNaN(value)) {
        setGpaErrorMessage('Input must be a number.');
      } else {
        setGpaErrorMessage('GPA must be between 0.0 and 4.0.');
      }

      // Prevent invalid values from being set to the state (optional)
      // event.preventDefault();
    } else {
      setGpaError(false);
      setGpaErrorMessage('');
      setGpa(valueStr);
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
                  Student ID
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  fullWidth
                  id="studentId"
                  label="Student ID"
                  name="studentId"
                  onChange={(e) => setStudentId(parseInt(e.target.value))}
                  variant="standard"
                  type="number"
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
                  onChange={(e) => setCourseId(parseInt(e.target.value))}
                  variant="standard"
                  type="number"
                />
              </Grid>


              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography component="h2" variant="h6" justifyContent="center">
                  TA Job ID
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  fullWidth
                  id="taJobId"
                  label="TA Job ID"
                  name="taJobId"
                  onChange={(e) => setTaJobId(parseInt(e.target.value))}
                  variant="standard"
                  type="number"
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
                    label="hoursCanWorkPerWeek"
                    onChange={(e) => sethoursCanWorkPerWeek(e.target.value)}
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
                  Now, tell us how well you do in school 🚀
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography component="h2" variant="h6" justifyContent="center">
                  Your GPA
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="gpa"
                  label="GPA"
                  name="gpa"
                  autoComplete="family-name"
                  value={GPA}
                  variant="standard"
                  onChange={handleGpaChange}
                  error={gpaError}
                  helperText={gpaErrorMessage}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography component="h2" variant="h6" justifyContent="center">
                  Related courses you have taken
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <FormControl sx={{ m: 1, width: 400 }}>
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
                <FormControl sx={{ m: 1, width: 400 }}>
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
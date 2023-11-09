// Import React, useState, and FormEvent from the 'react' library.
import React, { useState, FormEvent } from 'react';

// Import Material-UI components and elements for styling and form handling.
import {
  Box,
  Container,
  FormHelperText,
  Grid,
  TextField,
  CssBaseline,
  Link,
  Avatar,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../../components/Copyright';
import { AxiosError } from 'axios';

// JUST ADDED
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
//import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const RegistrationPage: React.FC = () => {
  // Define and initialize state variables for form fields, loading status, and error messages.

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [smuNo, setSmuNo] = useState('');
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validEmail: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // Use 'useNavigate' for programmatic navigation.
  const navigate = useNavigate();

  // submission handler for the form to register a new user
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Add your registration logic here
    
    AuthService.signUp(firstName, lastName, email, username, smuNo, password, year, userType).then(
      () => {
        navigate('/login'); // Navigate to the login page on successful registration.
        window.location.reload(); // Reload the page to clear any state.
      },
      (error: AxiosError | Error) => {
        let resMessage;
        console.log(smuNo, isNaN(+smuNo));
        if (isNaN(+smuNo)){
          resMessage = 'Invalid SMU ID. Please enter a number.';
        }
        else if (!validEmail.test(email)){
          resMessage = 'Invalid email. Please enter a valid email address.';
        }
        else if (error instanceof AxiosError) {
          resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        } else {
          resMessage = error.message || 'An error occurred';
        }
        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  // Change handlers for button input (radio)
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType((event.target as HTMLInputElement).value);
  };

  // Change handlers for year input (select)
  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };

  return (
    // Render the component within a container with a maximum width of 'sm'.
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Display an avatar and a title. */}
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

          <FormControl fullWidth>
            <FormLabel id="userType">User Type</FormLabel>
            <RadioGroup
              row 
              aria-labelledby="userType group" 
              defaultValue="student" 
              value={userType}
              onChange={handleTypeChange}
              name="radio-button-group"
            >
              <FormControlLabel value="student" control={<Radio />} label="Student" />
              <FormControlLabel value="faculty" control={<Radio />} label="Faculty" required />
            </RadioGroup>  
          </FormControl>


          {userType == 'student' && (
            <p>
              <FormControl fullWidth>
                <InputLabel id="studentYear">School Year</InputLabel>
                <Select
                  labelId="studentYear"
                  id="studentYear"
                  value={year}
                  label="studentYear"
                  onChange={handleYearChange}
                >
                  <MenuItem value={1}>First Year</MenuItem>
                  <MenuItem value={2}>Sophomore</MenuItem>
                  <MenuItem value={3}>Junior</MenuItem>
                  <MenuItem value={4}>Senior</MenuItem>
                  <MenuItem value={5}>Graduate</MenuItem>
                </Select> 
              </FormControl>
            </p>
          )} 



          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* First name input field */}
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Last name input field */}
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="smuNo"
                label="SMU ID Number"
                name="smuNo"
                autoComplete="smuNo"
                onChange={(e) => setSmuNo(e.target.value)}
                value={smuNo}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </Grid>
            <Grid item xs={12}>
              {/* Email input field */}
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              {/* Password input field */}
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              {/* Display error message if registration fails. */}
              <FormHelperText>{message}</FormHelperText>
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              {/* Link to the login page for users who already have an account. */}
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

// Export the 'RegistrationPage' component for use in other parts of the application.
export default RegistrationPage;

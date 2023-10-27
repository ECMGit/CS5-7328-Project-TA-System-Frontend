import React, { useState, FormEvent } from 'react';
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

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Add your registration logic here
    AuthService.signUp(firstName, lastName, email, username, smuNo, password, year, userType).then(
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
        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType((event.target as HTMLInputElement).value);
  };

  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
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
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
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
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
    // </ThemeProvider>
  );
};

export default RegistrationPage;

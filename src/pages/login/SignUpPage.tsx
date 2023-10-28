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
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../../components/Copyright';
import { AxiosError } from 'axios';


const RegistrationPage: React.FC = () => {
  // Define and initialize state variables for form fields, loading status, and error messages.

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Use 'useNavigate' for programmatic navigation.
  const navigate = useNavigate();

  // Define a function to handle form submission.
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Add your registration logic here

    // Call the 'signUp' method from the 'AuthService' service for user registration.
    AuthService.signUp(firstName, LastName, email, password).then(
      () => {
        navigate('/login'); // Navigate to the login page on successful registration.
        window.location.reload(); // Reload the page to clear any state.
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
                value={LastName}
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

// Import React, useState, and FormEvent from the 'react' library.
import React, { useState, FormEvent } from 'react';

// Import Material-UI components, icons, and styles.
import {
  Box,
  Grid,
  Link,
  Container,
  TextField,
  Typography,
  Avatar,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Import 'createTheme' and 'ThemeProvider' for theming.
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Import 'LoadingButton' for displaying a loading button.
import { LoadingButton } from '@mui/lab';

// Import 'useNavigate' for programmatic navigation.
import { useNavigate } from 'react-router-dom';

// Import 'AuthService' for user authentication.
import AuthService from '../../services/auth';

// Import the 'Copyright' component.
import Copyright from '../../components/Copyright';

const defaultTheme = createTheme();

// Define a functional component called 'LoginPage' using the React.FC (Functional Component) type.
const LoginPage: React.FC = () => {
  // Define and initialize state variables for email, password, loading status, and error message.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Use 'useNavigate' for programmatic navigation.
  const navigate = useNavigate();

  // Function to handle form submission when the user tries to log in.
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setMessage(''); // Clear any previous error messages.
    setLoading(true); // Set the loading state while the request is in progress.

    // Call the 'login' method from 'AuthService' to attempt user login.
    AuthService.login(email, password).then(
      () => {
        navigate('/home'); // Navigate to the home page on successful login.
        // window.location.reload(); // (Optional) Reloading the page can be done here.
      },
      (error) => {
        // Handle any errors that may occur during the login attempt.
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false); // Reset the loading state.
        setMessage(resMessage); // Display an error message if login fails.
      }
    );
  };

  return (
    // Render the component within a container with a maximum width of 'xs'.
    <ThemeProvider theme={defaultTheme}>
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
          {/* Display a title for the login page. */}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* Input field for entering the email address. */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="usernam"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)} value={email}
              autoFocus
            />
            {/* Input field for entering the password. */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)} value={password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {/* Display a loading button while login is in progress. */}
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                {/* Link to the "Forgot password?" page. */}
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {'Don\'t have an account? Sign Up'}
                </Link>
              </Grid>
            </Grid>
            {/* Display an error message if 'message' is not null. */}
            <FormHelperText>{message}</FormHelperText>
          </Box>
        </Box>
        {/* Display the 'Copyright' component at the bottom of the page. */}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

// Export the 'LoginPage' component for use in other parts of the application.
export default LoginPage;

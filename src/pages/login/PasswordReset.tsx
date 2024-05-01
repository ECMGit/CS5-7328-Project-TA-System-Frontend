// Import React and useState from the 'react' library.
import React, { useState } from 'react';

// Import the 'AuthService' for password reset functionality.
import AuthService from '../../services/auth';

// Import necessary components and hooks from the Material-UI library and 'react-router-dom'.
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useAutoLogout from '../../components/AutoLogOut';

// Define a functional component called 'PasswordReset' using the React.FC (Functional Component) type.
const PasswordReset: React.FC = () => {
  const { Modal } = useAutoLogout();
  // Get the 'token' parameter from the URL using 'useParams'.
  const { token } = useParams<{ token: string }>();

  // Define and initialize state variables for password and confirmation.
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // Define a state variable to display messages.
  const [message, setMessage] = useState<string | null>(null);

  // Use 'useNavigate' for programmatic navigation.
  const navigate = useNavigate();

  // Function to handle form submission when resetting the password.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the entered passwords match.
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    // Check if the 'token' parameter is missing.
    if (!token) {
      setMessage('Token is missing. Please try again.');
      return;
    }

    // Call the 'resetPassword' method from 'AuthService' to reset the password.
    AuthService.resetPassword(token, password).then(
      () => {
        navigate('/login'); // Navigate to the login page on successful password reset.
        // window.location.reload(); // (Optional) Reloading the page can be done here.
      },
      (error) => {
        // Handle any errors that may occur during the password reset.
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage); // Display an error message if the reset fails.
      }
    );
  };

  return (
    // Render the component within a container with a maximum width of 'xs'.
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Display a title for the password reset page. */}
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          {/* Input field for entering a new password. */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="New Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Input field for confirming the new password. */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* Button to submit the password reset request. */}
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
            Reset Password
          </Button>
        </Box>
        {/* Display an error message if 'message' is not null. */}
        {message && <Typography variant="body2" color="error" sx={{ mt: 3 }}>{message}</Typography>}
      </Box>
      {Modal}
    </Container>
  );
};

// Export the 'PasswordReset' component for use in other parts of the application.
export default PasswordReset;

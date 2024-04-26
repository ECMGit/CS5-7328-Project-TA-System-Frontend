// Import React and useState from the 'react' library.
import React, { useState } from 'react';

// Import the 'AuthService' for password reset request functionality.
import AuthService from '../../services/auth';

// Import Material-UI components and elements for styling and form handling.
import { Container, Typography, Button, TextField, Box } from '@mui/material';
import useAutoLogout from '../../components/AutoLogOut';

const { Modal } = useAutoLogout();

// Define a functional component called 'PasswordResetRequest' using the React.FC (Functional Component) type.
const PasswordResetRequest: React.FC = () => {
  // Define and initialize state variable for email input field.
  const [email, setEmail] = useState('');

  return (
    // Render the component within a container with a maximum width of 'sm'.
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        {/* Display a title for the password reset request page. */}
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
          {/* Provide instructions for the user about resetting their password. */}
          Enter your email address, and we&apos;ll send you a link to reset your password.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, width: '100%' }}>
          {/* Email input field for the user to enter their email address. */}
          <TextField
            label="Email Address"
            margin="normal"
            required
            fullWidth
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Button to submit the password reset request. */}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            Send Reset Link
          </Button>
        </Box>
      </Box>
      {Modal}
    </Container>
  );

  // Function to handle the form submission when the user requests a password reset.
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(email); // Log the email to the console for testing.

    // Call the 'resetPasswordRequest' method from 'AuthService' to send the reset link.
    AuthService.resetPasswordRequest(email).then(
      () => {
        alert('Password reset link sent!'); // Show a success message when the link is sent.
      },
      (error) => {
        // Handle any errors that may occur during the reset request.
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        alert(resMessage); // Display an alert with the error message.
      }
    );
  }
};

// Export the 'PasswordResetRequest' component for use in other parts of the application.
export default PasswordResetRequest;


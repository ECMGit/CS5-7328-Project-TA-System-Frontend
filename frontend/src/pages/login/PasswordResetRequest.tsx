import React, { useState } from 'react';
import AuthService from '../../services/auth';
import { Container, Typography, Button, TextField, Box } from '@mui/material';

const PasswordResetRequest: React.FC = () => {
  const [email, setEmail] = useState('');

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
          Enter your email address and we&apos;ll send you a link to reset your password.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, width: '100%' }}>
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            Send Reset Link
          </Button>
        </Box>
      </Box>
    </Container>
  );

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(email);
    // Handle the password reset logic here
    AuthService.resetPasswordRequest(email).then(
      () => {
        alert('Password reset link sent!');
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        alert(resMessage);
      }
    );
  }
};

export default PasswordResetRequest;

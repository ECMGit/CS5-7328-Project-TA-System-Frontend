import React from 'react';
import { Box, Typography } from '@mui/material';
import { SubmitFeedbackForm } from '../../components/feedback/SubmitFeedbackForm';

export const StudentFeatureRequestPage = () => {
  return (
    <Box>
      <Typography variant="h6">Feedback page</Typography>
      <SubmitFeedbackForm />
      <Typography variant='subtitle2'>List of submitted requests here (separate component plz)</Typography>
    </Box>
  );
};

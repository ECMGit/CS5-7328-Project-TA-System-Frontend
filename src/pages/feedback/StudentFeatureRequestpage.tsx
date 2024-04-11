import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { SubmitFeedbackForm } from '../../components/feedback/SubmitFeedbackForm';

export const StudentFeatureRequestPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleShowRequests = async () => {
    setLoading(true);
    try {
      console.log('Fetch feedback');
    } catch (error) {
      console.error('Failed to fetch feedback:', error);
      // Handle error scenario, maybe set an error state and show a message
    }
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h6">Feedback page</Typography>
      <SubmitFeedbackForm />
      <Button variant="outlined" onClick={handleShowRequests} disabled={loading}>
        {loading ? 'Loading...' : 'Show Requests'}
      </Button>
      {feedbackList.length > 0 && (
        <Box>
          {/* Render your feedbackList here, perhaps as a list or table */}
        </Box>
      )}
    </Box>
  );
};
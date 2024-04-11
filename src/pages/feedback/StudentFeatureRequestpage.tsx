import { Box, Paper, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { SubmitFeedbackForm } from '../../components/feedback/SubmitFeedbackForm';
import FeedbackService from '../../services/feedback';

interface FeedbackItem {
  type: string;
  content: string;
  userId?: number;
}

export const StudentFeatureRequestPage = () => {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleShowRequests = async () => {
    setLoading(true);
    try {
      const response = await FeedbackService.getAllFeedback();
      setFeedbackList(response);
      setShowFeedback(true);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Feedback Page</Typography>

      {/* Include the SubmitFeedbackForm for users to submit new feedback */}
      <SubmitFeedbackForm />

      <Button
        variant="outlined"
        onClick={handleShowRequests}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Show Feedback'}
      </Button>

      {/* Display feedback list */}
      {showFeedback && feedbackList.length > 0 && (
        <Stack gap={1} mt={1}>
          {feedbackList.map((feedback, index) => (
            <Box key={index} sx={{ padding: '10px', border: '1px solid gray' }}>
              <Typography variant="subtitle1">Type: {feedback.type}</Typography>
              <Typography variant="body1">Content: {feedback.content}</Typography>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};


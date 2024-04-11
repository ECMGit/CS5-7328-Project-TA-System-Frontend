import { Box, Paper, Stack, Tooltip, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { SubmitFeedbackForm } from '../../components/feedback/SubmitFeedbackForm';
import FeedbackService, { FeedbackItem } from '../../services/feedback';
import { BugReport, Checklist } from '@mui/icons-material';

export const FeedbackTypeIcon = ({ type }: { type: 'bug' | 'feedback' }) => {
  if (type === 'bug') {
    return (
      <Tooltip title="Bug Report">
        <BugReport />
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="Feature Request">
        <Checklist />
      </Tooltip>
    );
  }
};

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
  
  const handleHideFeedback = () => {
    setShowFeedback(false); // Set showFeedback to false to hide the feedback list
  };

  return (
    <Box>
      <Typography variant="h6">Feedback Page</Typography>

      {/* Include the SubmitFeedbackForm for users to submit new feedback */}
      <SubmitFeedbackForm />
      
      <Button variant="outlined" onClick={handleShowRequests} disabled={loading}>
        {loading ? 'Loading...' : 'Show Feedback'}
      </Button>

      {/* Display feedback list if showFeedback is true */}
      {showFeedback && feedbackList.length > 0 && (
        <Box>
          <Button variant="outlined" onClick={handleHideFeedback}>Hide Feedback</Button>
          {feedbackList.map((feedback, index) => (
            <Stack
              direction={'row'}
              gap={1}
              key={index}
              sx={{ padding: '10px', border: '1px solid gray' }}
            >
              <FeedbackTypeIcon type={feedback.type} />
              <Typography variant="body1">{feedback.content}</Typography>
            </Stack>
          ))}
        </Box>
      )}
    </Box>
  );
};

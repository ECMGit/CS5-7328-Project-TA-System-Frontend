import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
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

  const hardcodedFeedback = [
    {
      type: 'Feature Request',
      content: 'I would like to have a new dashboard feature...',
      userId: 1,
    },
  ];

 // const handleShowRequests = async () => {
  //  setLoading(true);
    // Simulate fetching data by just setting the hardcoded feedback after a delay
  //  setTimeout(() => {
  //    setFeedbackList(hardcodedFeedback);
  //    setLoading(false);
  //    setShowFeedback(true); // Show the feedback list
   // }, 500); // Simulated delay
  //};
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
            <Box key={index} sx={{ margin: '10px', padding: '10px', border: '1px solid gray' }}>
              <Typography variant="subtitle1">Type: {feedback.type}</Typography>
              <Typography variant="body1">Content: {feedback.content}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
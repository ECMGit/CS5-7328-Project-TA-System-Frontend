import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { FeedbackList } from '../../components/feedback/FeedbackList';
import { SubmitFeedbackForm } from '../../components/feedback/SubmitFeedbackForm';
import FeedbackService, { FeedbackItem } from '../../services/feedback';

export const StudentFeatureRequestPage = () => {
  const [loading, setLoading] = useState(true);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);  // State to toggle feedback visibility

  useEffect(() => {
    const getFeedback = async () => {
      const feedbackResponse = await FeedbackService.getMyFeedback();
      const nonCommentFeedback = feedbackResponse.filter(item => item.type !== 'comment');
      setFeedbackList(nonCommentFeedback);
      setLoading(false);
    };
    getFeedback();
  }, []);

  const onSubmit = (newFeedback: FeedbackItem) => {
    if (newFeedback.type !== 'comment') {
      setFeedbackList([...feedbackList, newFeedback]);
    }
  };

  const toggleFeedbackVisibility = () => {
    setShowFeedback(!showFeedback);
  };

  return (
    <Box>
      <Typography variant="h6">Feedback Page</Typography>
      <SubmitFeedbackForm onSubmitted={onSubmit}>
        <Button onClick={toggleFeedbackVisibility} color="primary">
          {showFeedback ? 'Hide My Feedback' : 'Show My Feedback'}
        </Button>
      </SubmitFeedbackForm>
      {loading && <CircularProgress />}
      {showFeedback && <FeedbackList feedback={feedbackList} />}
    </Box>
  );
};

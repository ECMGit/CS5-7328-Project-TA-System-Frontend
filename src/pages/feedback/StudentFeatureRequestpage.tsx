import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FeedbackList } from '../../components/feedback/FeedbackList';
import { SubmitFeedbackForm } from '../../components/feedback/SubmitFeedbackForm';
import FeedbackService, { FeedbackItem } from '../../services/feedback';

export const StudentFeatureRequestPage = () => {
  const [loading, setLoading] = useState(true);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);

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

  return (
    <Box>
      <Typography variant="h6">Feedback Page</Typography>
      <SubmitFeedbackForm onSubmitted={onSubmit} />
      {loading && <CircularProgress />}
      <FeedbackList feedback={feedbackList} />
    </Box>
  );
};

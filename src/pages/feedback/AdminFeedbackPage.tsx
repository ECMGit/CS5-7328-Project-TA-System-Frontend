import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Tooltip, Typography } from '@mui/material';
import { FeedbackList } from '../../components/feedback/FeedbackList';
import FeedbackService, { FeedbackItem } from '../../services/feedback';

export const AdminFeedbackPage = () => {
  const [loading, setLoading] = useState(true);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    const getFeedback = async () => {
      const feedbackResponse = await FeedbackService.getAdminFeedback();
      setFeedbackList(feedbackResponse);
      setLoading(false);
    };
    getFeedback();
  }, []);

  return (
    <Box>
      <Typography variant="h6">Admin Feedback Page</Typography>
      {loading && <CircularProgress />}
      <FeedbackList feedback={feedbackList} />
    </Box>
  );
};

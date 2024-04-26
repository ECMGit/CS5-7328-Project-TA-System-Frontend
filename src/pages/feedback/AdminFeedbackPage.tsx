import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { FeedbackList } from '../../components/feedback/FeedbackList';
import FeedbackService, { FeedbackItem } from '../../services/feedback';
import useAutoLogout from '../../components/AutoLogOut';

const { Modal, closeModal } = useAutoLogout();

export const AdminFeedbackPage = () => {
  const [loading, setLoading] = useState(true);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [showFeedback, setShowFeedback] = useState(false); // State to manage feedback list visibility

  useEffect(() => {
    const getFeedback = async () => {
      const feedbackResponse = await FeedbackService.getAdminFeedback();
      const nonCommentFeedback = feedbackResponse.filter(item => item.type !== 'comment');
      setFeedbackList(nonCommentFeedback);
      setLoading(false);
    };
    getFeedback();
  }, []);

  // Toggle the visibility of the feedback list
  const toggleFeedbackVisibility = () => {
    setShowFeedback(!showFeedback);
  };

  return (
    <Box>
      <Typography variant="h6">Admin Feedback Page</Typography>
      <Button onClick={toggleFeedbackVisibility}>
        {showFeedback ? 'Hide All User Feedback' : 'Show All User Feedback'}
      </Button>
      {loading && <CircularProgress />}
      {showFeedback && <FeedbackList feedback={feedbackList} />}
      {Modal}
    </Box>
  );
};

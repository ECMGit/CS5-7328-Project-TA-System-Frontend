import React, { useEffect, useState, useRef } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FeedbackList } from '../../components/feedback/FeedbackList';
import FeedbackService, { FeedbackItem } from '../../services/feedback';
import { useNavigate } from 'react-router-dom';

export const AdminFeedbackPage = () => {
  const [loading, setLoading] = useState(true);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [visibleFeedback, setVisibleFeedback] = useState<FeedbackItem[]>([]);
  const nextItems = useRef(20); // Using useRef to persist the next items index
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const feedbackResponse = await FeedbackService.getAdminFeedback();
    const nonCommentFeedback = feedbackResponse.filter(item => item.type !== 'comment');
    setFeedbackList(nonCommentFeedback);
    setVisibleFeedback(nonCommentFeedback.slice(0, 20)); // Load first 20 feedback
    setLoading(false);
  };

  const fetchMoreFeedback = () => {
    if (nextItems.current >= feedbackList.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setVisibleFeedback(prevFeedback => [
        ...prevFeedback,
        ...feedbackList.slice(nextItems.current, nextItems.current + 20)
      ]);
      nextItems.current += 20;
    }, 1000);
  };

  const handleBack = () => {
    navigate(-1); // Navigate back in history stack
  };

  return (
    <Box>
      <Button onClick={handleBack} variant="contained" color="secondary">
        Back
      </Button>
      <Typography variant="h6" style={{ marginBottom: 16 }}>Admin Feedback Page</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <InfiniteScroll
          dataLength={visibleFeedback.length}
          next={fetchMoreFeedback}
          hasMore={hasMore}
          loader={<CircularProgress />}
          endMessage={<Typography>No more feedback left</Typography>}
          scrollThreshold="100px"
          style={{ overflow: 'hidden' }}
        >
          <FeedbackList feedback={visibleFeedback} />
        </InfiniteScroll>
      )}
    </Box>
  );
};

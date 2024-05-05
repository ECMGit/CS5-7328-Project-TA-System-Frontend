import React, { useEffect, useState, useRef } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FeedbackList } from '../../components/feedback/FeedbackList';
import { SubmitFeedbackForm } from '../../components/feedback/SubmitFeedbackForm';
import FeedbackService, { FeedbackItem } from '../../services/feedback';
import useAutoLogout from '../../components/AutoLogOut';

export const StudentFeatureRequestPage = () => {
  const { Modal } = useAutoLogout();
  const [loading, setLoading] = useState(true);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [hasMore, setHasMore] = useState(true);  //If there are more feedback to load
  const [visibleFeedback, setVisibleFeedback] = useState<FeedbackItem[]>([]);
  const nextItems = useRef(20); // Load next set of feedback

  useEffect(() => {
    const getFeedback = async () => {
      const feedbackResponse = await FeedbackService.getMyFeedback();
      const nonCommentFeedback = feedbackResponse.filter(item => item.type !== 'comment'); //Mainly to filter out all feedback with type comment before feedbackComment was implemetented
      setFeedbackList(nonCommentFeedback);
      setVisibleFeedback(nonCommentFeedback.slice(0, 20)); // Load first 20 feedback
      setLoading(false);
    };
    getFeedback();
  }, []);

  const fetchMoreFeedback = () => {
    if (nextItems.current >= feedbackList.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setVisibleFeedback(prevFeedback => [...prevFeedback,
          ...feedbackList.slice(nextItems.current, nextItems.current + 20)
      ]);
      nextItems.current += 20;
    }, 1000); 
  };

  return (
    <Box>
      <Typography variant="h6">Feedback Page</Typography>
      <SubmitFeedbackForm onSubmitted={(newFeedback: FeedbackItem) => {
        if (newFeedback.type !== 'comment') {
          setFeedbackList(prev => [newFeedback, ...prev]);
          setVisibleFeedback(prev => [newFeedback, ...prev.slice(0, 19)]);
        }
      }}>
      </SubmitFeedbackForm>
      {loading ? (<CircularProgress />) : (
        <InfiniteScroll
          dataLength={visibleFeedback.length}
          next={fetchMoreFeedback}
          hasMore={hasMore}
          loader={<CircularProgress />}
          endMessage={<Typography>No more feedback to display</Typography>}
          style={{ overflow: 'hidden' }} 
        >
          <FeedbackList feedback={visibleFeedback} />
        </InfiniteScroll>
      )}
      {Modal}
    </Box>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Box, Typography, CircularProgress } from '@mui/material';
import FeedbackService, { FeedbackComment } from '../../services/feedback';
import InfiniteScroll from 'react-infinite-scroll-component';

export const IndividualFeedbackPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<FeedbackComment[]>([]);
  const [visibleComments, setVisibleComments] = useState<FeedbackComment[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const nextItems = useRef(20);

  useEffect(() => {
    if (location.pathname === `/feedback/${id}`) {
      console.log('id', id);
      const fetchComments = async () => {
        const fetchedComments = await FeedbackService.getMyComment(Number(id));
        setComments(fetchedComments);
        setVisibleComments(fetchedComments.slice(0, 20));
        setLoading(false);
      };
      fetchComments();
    }
  }, [id, location.pathname]);

  const handleOpenCommentDialog = () => setOpen(true);
  const handleCloseCommentDialog = () => setOpen(false);

  const handleCommentSubmit = async () => {
    if (location.pathname === `/feedback/${id}`) {
      try {
        const newComment = await FeedbackService.submitComment(Number(id), comment);
        setComments(prev => [newComment, ...prev]);
        setVisibleComments(prev => [newComment, ...prev.slice(0, 19)]);
        setComment('');
        setOpen(false);
      } catch (error) {
        console.error('Failed to submit comment:', error);
      }
    }
  };

  const fetchMoreComments = () => {
    if (nextItems.current >= comments.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setVisibleComments(prevComments => [
        ...prevComments,
        ...comments.slice(nextItems.current, nextItems.current + 20)
      ]);
      nextItems.current += 20;
    }, 1000);
  };

  return (
    <div>
      {location.pathname === `/feedback/${id}` && (
        <>
          <Typography variant="h6">Comments on Feedback ID: {id}</Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Button variant="contained" color="primary" onClick={handleOpenCommentDialog}>
              Add Comment
            </Button>
            {/* Back Button to navigate to feedback display */}
            <Button variant="contained" color="secondary" onClick={() => navigate('/feedback')}>
              Back to Feedback List
            </Button>
          </Box>
          {loading ? <CircularProgress /> : (
            <InfiniteScroll
              dataLength={visibleComments.length}
              next={fetchMoreComments}
              hasMore={hasMore}
              loader={<CircularProgress />}
              endMessage={<Typography>No more comments left</Typography>}
              scrollThreshold="100px"
            >
              {visibleComments.map((commentItem, index) => (
                <Box key={index} p={1} my={1} bgcolor="#f0f0f0">
                  <Typography variant="caption" color="textSecondary">UserID: {commentItem.leftById}</Typography>
                  <Typography variant="subtitle2">Comment: {commentItem.content}</Typography>
                </Box>
              ))}
            </InfiniteScroll>
          )}
          <Dialog open={open} onClose={handleCloseCommentDialog} fullWidth maxWidth="md">
            <DialogTitle>Add Comment</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="feedbackId"
                label="Feedback ID"
                type="text"
                fullWidth
                variant="outlined"
                value={id}
                InputProps={{ readOnly: true }}
              />
              <TextField
                margin="dense"
                id="comment"
                label="Comment"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCommentDialog}>Cancel</Button>
              <Button onClick={handleCommentSubmit}>Submit Comment</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};
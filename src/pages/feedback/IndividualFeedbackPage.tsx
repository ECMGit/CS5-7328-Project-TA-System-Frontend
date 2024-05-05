import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import FeedbackService, { FeedbackComment } from '../../services/feedback';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FeedbackDetailsView } from './FeedbackDetailsView';
import { UserContext } from '../../provider'; // Import UserContext
import useAutoLogout from '../../components/AutoLogOut';

export const IndividualFeedbackPage = () => {
  const { Modal } = useAutoLogout();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<FeedbackComment[]>([]);
  const [visibleComments, setVisibleComments] = useState<FeedbackComment[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const nextItems = useRef(20);
  const user = useContext(UserContext); // Assuming useContext is properly used here

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await FeedbackService.getMyComment(Number(id));
      setComments(fetchedComments);
      setVisibleComments(fetchedComments.slice(0, 20));
      setLoading(false);
    };

    fetchComments();
  }, [id, location.pathname]);

  const handleOpenCommentDialog = () => setOpen(true);
  const handleCloseCommentDialog = () => setOpen(false);

  const handleCommentSubmit = async () => {
    try {
      const newComment = await FeedbackService.submitComment(Number(id), comment);
      setComments(prev => [newComment, ...prev]);
      setVisibleComments(prev => [newComment, ...prev.slice(0, 19)]);
      setComment('');
      setOpen(false);
    } catch (error) {
      console.error('Failed to submit comment:', error);
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
        ...comments.slice(nextItems.current, nextItems.current + 20),
      ]);
      nextItems.current += 20;
    }, 1000);
  };

  return (
    <div>
      <FeedbackDetailsView id={Number(id)} />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCommentDialog}
        >
          Add Comment
        </Button>
        {/* Conditionally render Back button based on user role */}
        {user?.user?.role === 'admin' ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/feedback/admin')}
          >
            Back to Admin Feedback
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/feedback')}
          >
            Back to Feedback List
          </Button>
        )}
      </Box>
      <Typography variant="subtitle1">Comments:</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <InfiniteScroll
          dataLength={visibleComments.length}
          next={fetchMoreComments}
          hasMore={hasMore}
          loader={<div />}
          endMessage={<Typography>No more comments left</Typography>}
          scrollThreshold="100px"
        >
          {visibleComments.map((commentItem, index) => (
            <Box key={index} p={1} my={1} bgcolor="#f0f0f0">
              <Typography variant="caption" color="textSecondary">
                {commentItem.leftBy?.firstName} {commentItem.leftBy?.lastName}
              </Typography>
              <Typography variant="subtitle2">
                Comment: {commentItem.content}
              </Typography>
            </Box>
          ))}
        </InfiniteScroll>
      )}
      <Dialog
        open={open}
        onClose={handleCloseCommentDialog}
        fullWidth
        maxWidth="md"
      >
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
    </div>
  );
};

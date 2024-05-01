import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Box, Typography, CircularProgress } from '@mui/material';
import FeedbackService, { FeedbackComment } from '../../services/feedback';
import useAutoLogout from '../../components/AutoLogOut';

export const IndividualFeedbackPage = () => {
  const { Modal } = useAutoLogout();
  const { id } = useParams();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<FeedbackComment[]>([]);
  const [showComments, setShowComments] = useState(false);  // State to toggle comments visibility
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.pathname === `/feedback/${id}`) {
      console.log('id', id);
      const fetchComments = async () => {
        const fetchedComments = await FeedbackService.getMyComment(Number(id));
        console.log(fetchedComments);
        setComments(fetchedComments);
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
        setComments([...comments, newComment]);
        setComment('');
        setOpen(false);
      } catch (error) {
        console.error('Failed to submit comment:', error);
      }
    }
  };

  const toggleCommentsVisibility = () => {
    setShowComments(!showComments);
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
            <Button onClick={toggleCommentsVisibility} color="primary" variant="outlined">
              {showComments ? 'Hide Comments' : 'Show Comments'}
            </Button>
          </Box>
          {loading && <CircularProgress />}
          {showComments && comments.map((commentItem, index) => (
            <Box key={index} p={1} my={1} bgcolor="#f0f0f0">
              <Typography variant="caption" color="textSecondary">UserID: {commentItem.leftById}</Typography>
              <Typography variant="subtitle2">Comment: {commentItem.content}</Typography>
            </Box>
          ))}
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
      {Modal}
    </div>
  );
};
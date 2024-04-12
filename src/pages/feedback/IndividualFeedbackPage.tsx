import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Box, Typography, CircularProgress } from '@mui/material';
import FeedbackService, { FeedbackItem } from '../../services/feedback';

export const IndividualFeedbackPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<FeedbackItem[]>([]);
  const [showComments, setShowComments] = useState(false);  // State to toggle comments visibility
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.pathname === `/feedback/${id}`) {
      const fetchComments = async () => {
        const fetchedComments = await FeedbackService.getMyComment();
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
        const newComment = await FeedbackService.submitComment(comment);
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
          <div>Comments on Feedback ID: {id}</div>
          <Button variant="outlined" color="primary" onClick={handleOpenCommentDialog}>
            Add Comment
          </Button>
          <Button onClick={toggleCommentsVisibility} color="primary">
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </Button>
          {loading && <CircularProgress />}
          {showComments && comments.map((commentItem, index) => (
            <Box key={index} p={1} my={1} bgcolor="#f0f0f0">
              <Typography variant="subtitle2">{commentItem.content}</Typography>
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
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import FeedbackService, { FeedbackItem } from '../../services/feedback';

export const IndividualFeedbackPage = () => {
  const { id } = useParams();
  const location = useLocation(); // Use useLocation to access the current path
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<FeedbackItem[]>([]);

  useEffect(() => {

    if (location.pathname === `/feedback/${id}`) {
      const fetchComments = async () => {
        const fetchedComments = await FeedbackService.getMyComment();
        setComments(fetchedComments);
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

  return (
    <div>
      {location.pathname === `/feedback/${id}` && (
        <>
          <div>Comments on Feedback: {id}</div>
          <Button variant="outlined" color="primary" onClick={handleOpenCommentDialog}>
            Add Comment
          </Button>
          {comments.map((commentItem, index) => (
            <div key={index}>{commentItem.content}</div>
          ))}
          <Dialog open={open} onClose={handleCloseCommentDialog}>
            <DialogTitle>Add Comment</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="comment"
                label="Comment"
                type="text"
                fullWidth
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

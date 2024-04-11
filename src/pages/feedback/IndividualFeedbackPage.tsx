import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

export const IndividualFeedbackPage = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false); // State to manage dialog visibility
  const [comment, setComment] = useState(''); // State to manage the comment input

  // Handler to open the dialog
  const handleOpenCommentDialog = () => {
    setOpen(true);
  };

  // Handler to close the dialog
  const handleCloseCommentDialog = () => {
    setOpen(false);
  };

  // Handler for submitting the comment
  const handleCommentSubmit = () => {
    console.log('Comment Submitted: ', comment);
    // Here you would usually send the comment to a backend or some storage
    setOpen(false); // Close the dialog after submission
    setComment(''); // Reset the comment input
  };

  return (
    <div>
      <div>Comments on Feedback: {id}</div>
      <Button variant="outlined" color="primary" onClick={handleOpenCommentDialog}>
        Add Comment
      </Button>
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
    </div>
  );
};

import { Box, Paper, Stack, Tooltip, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { SubmitFeedbackForm } from '../../components/feedback/SubmitFeedbackForm';
import FeedbackService, { FeedbackItem } from '../../services/feedback';
import { BugReport, Checklist } from '@mui/icons-material';

export const FeedbackTypeIcon = ({ type }: { type: 'bug' | 'feedback' }) => {
  if (type === 'bug') {
    return (
      <Tooltip title="Bug Report">
        <BugReport />
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="Feature Request">
        <Checklist />
      </Tooltip>
    );
  }
};

export const StudentFeatureRequestPage = () => {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [comment, setComment] = useState('');

  const handleShowRequests = async () => {
    setLoading(true);
    try {
      const response = await FeedbackService.getAllFeedback();
      setFeedbackList(response);
      setShowFeedback(true);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHideFeedback = () => {
    setShowFeedback(false); // Set showFeedback to false to hide the feedback list
  };

  const handleFeedbackClick = (feedback: FeedbackItem) => {
    setSelectedFeedback(feedback);
  };

  const handleCloseCommentDialog = () => {
    setSelectedFeedback(null);
    setComment('');
  };

  const handleCommentSubmit = async () => {
    // Here you would submit the comment to your backend or service
    console.log(`Submitting comment "${comment}" for feedback ID ${selectedFeedback?.id}`);

    // After submission, clear the selected feedback and comment
    handleCloseCommentDialog();
  };

  return (
    <Box>
      <Typography variant="h6">Feedback Page</Typography>

      <SubmitFeedbackForm />

      <Button variant="outlined" onClick={handleShowRequests} disabled={loading}>
        {loading ? 'Loading...' : 'Show Feedback'}
      </Button>

      {showFeedback && feedbackList.length > 0 && (
        <Box>
          <Button variant="outlined" onClick={handleHideFeedback}>Hide Feedback</Button>
          {feedbackList.map((feedback, index) => (
            <Stack
              direction={'row'}
              gap={1}
              key={index}
              sx={{ padding: '10px', border: '1px solid gray', cursor: 'pointer' }}
              onClick={() => handleFeedbackClick(feedback)}
            >
              <FeedbackTypeIcon type={feedback.type} />
              <Typography variant="body1">{feedback.content}</Typography>
            </Stack>
          ))}
        </Box>
      )}

      {/* Dialog for adding a comment to a feedback */}
      <Dialog open={Boolean(selectedFeedback)} onClose={handleCloseCommentDialog}>
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
    </Box>
  );
};
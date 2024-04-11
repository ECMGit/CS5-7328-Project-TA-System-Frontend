import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import FeedbackService, { FeedbackItem } from '../../services/feedback';

interface SubmitFeedbackFormProps {
  // Called after feedback is submitted
  onSubmitted?: (feedback: FeedbackItem) => void;
}

// Component that allows user to input site feedback for admins to see
export const SubmitFeedbackForm = ({
  onSubmitted,
}: SubmitFeedbackFormProps) => {
  const [content, setContent] = useState('');
  // The type of feedback they are submitting
  const [type, setType] = useState<'feedback' | 'bug'>('feedback');

  // Function to submit feedback
  const submit = async () => {
    try {
      const response = await FeedbackService.submitFeedback(content, type);
      if (onSubmitted) {
        onSubmitted(response);
      }
      setContent('');
    } catch (err) {
      // TODO: show better alert
      alert('Failed to submit feedback');
    }
  };

  return (
    <Box>
      <TextField
        fullWidth
        rows={4}
        placeholder="Enter your feedback or bug report..."
        multiline
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Box
        mt={1}
        sx={{
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <Box sx={{ display: 'flex', gap: '12px' }}>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as 'feedback' | 'bug')}
          >
            <MenuItem value="feedback">Feature Request</MenuItem>
            <MenuItem value="bug">Bug Report</MenuItem>
          </Select>
          <Button onClick={submit} variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

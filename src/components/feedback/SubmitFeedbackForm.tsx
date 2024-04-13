// Import necessary components and hooks
import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
import React, { useState, ReactNode } from 'react';
import FeedbackService, { FeedbackItem } from '../../services/feedback';

interface SubmitFeedbackFormProps {
  onSubmitted?: (feedback: FeedbackItem) => void;
  children?: ReactNode; // Allow children to be passed to the component
}

export const SubmitFeedbackForm = ({
  onSubmitted,
  children, // Destructure children from props
}: SubmitFeedbackFormProps) => {
  const [content, setContent] = useState('');
  const [type, setType] = useState<'feedback' | 'bug'>('feedback');

  const submit = async () => {
    try {
      const response = await FeedbackService.submitFeedback(content, type);
      if (onSubmitted) {
        onSubmitted(response);
      }
      setContent('');
    } catch (err) {
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
          justifyContent: 'space-between',
          alignItems: 'center', // Ensure alignment of children
        }}
      >
        <Select
          value={type}
          onChange={(e) => setType(e.target.value as 'feedback' | 'bug')}
        >
          <MenuItem value="feedback">Feature Request</MenuItem>
          <MenuItem value="bug">Bug Report</MenuItem>
        </Select>
        <Box sx={{ display: 'flex', gap: '12px' }}>
          <Button onClick={submit} variant="contained">
            Submit
          </Button>
          {children} 
        </Box>
      </Box>
    </Box>
  );
};

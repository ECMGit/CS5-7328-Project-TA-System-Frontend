import React, { useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import FeedbackService from '../../services/feedback';

interface StatusSetterProps {
  id: number;
  initialStatus: string;
}
export const StatusSetter = ({ id, initialStatus }: StatusSetterProps) => {
  const [status, setStatus] = useState(initialStatus);
  const handleStatusChange = async (newStatus: string) => {
    try {
      await FeedbackService.setFeedbackStatus(id, newStatus);
      setStatus(newStatus);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  // MUI Select
  return (
    <Select value={status} onChange={(e) => handleStatusChange(e.target.value)}>
      <MenuItem value="Unread">Unread</MenuItem>
      <MenuItem value="Pending">Pending</MenuItem>
      <MenuItem value="In-Progress">In-Progress</MenuItem>
      <MenuItem value="Complete">Complete</MenuItem>
    </Select>
  );
};

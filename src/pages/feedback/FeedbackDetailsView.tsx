import { Box, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../provider';
import FeedbackService, { FeedbackItemWithName } from '../../services/feedback';

interface FeedbackDetailsViewProps {
  id: number;
  isAdmin?: boolean;
}

export const FeedbackDetailsView: React.FC<FeedbackDetailsViewProps> = ({
  id,
}: FeedbackDetailsViewProps) => {
  const user = useContext(UserContext);
  const [feedback, setFeedback] = useState<FeedbackItemWithName | null>(null);
  useEffect(() => {
    FeedbackService.getFeedbackById(id).then((data) => {
      setFeedback(data);
    });
  }, []);
  return (
    <Box mb="xl">
      <Typography variant="h5">{feedback?.content}</Typography>
      {user?.user?.role === 'admin' && <div>admin</div>}
    </Box>
  );
};

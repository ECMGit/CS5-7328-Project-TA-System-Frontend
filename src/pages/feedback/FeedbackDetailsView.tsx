import { Box, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../provider';
import FeedbackService, { FeedbackItemWithName } from '../../services/feedback';
import { StatusSetter } from './StatusSetter';

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
      <Typography>
        Left by: {feedback?.leftBy.firstName} {feedback?.leftBy.lastName}
      </Typography>
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography variant="h5">Feedback: {feedback?.content}</Typography>
        {user?.user?.role == 'admin' && feedback && (
          <StatusSetter initialStatus={feedback.status} id={id} />
        )}
      </Stack>
    </Box>
  );
};

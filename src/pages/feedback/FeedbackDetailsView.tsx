import { Box, Stack, Typography, Divider } from '@mui/material';
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
    <Box mb={4}>
      <Box border={2} borderColor="grey.400" borderRadius={2} p={2}>
        <Stack spacing={2}>
          {/* Horizontal Stack for 'Left by' and 'StatusSetter' */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="subtitle1">
              Left by: {feedback?.leftBy.firstName} {feedback?.leftBy.lastName}
            </Typography>
            {/* Conditionally render the StatusSetter next to 'Left by' */}
            {user?.user?.role === 'admin' && feedback && (
              <StatusSetter initialStatus={feedback.status} id={id} />
            )}
          </Stack>
          <Divider variant="middle" />
          <Typography variant="subtitle1">
            Feedback: {feedback?.content}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

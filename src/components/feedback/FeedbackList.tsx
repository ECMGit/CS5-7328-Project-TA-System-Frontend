import { BugReport, Checklist } from '@mui/icons-material';
import { Badge, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { FeedbackItem } from '../../services/feedback';

interface FeedbackListProps {
  feedback: FeedbackItem[];
}

const FeedbackTypeIcon = ({ type }: { type: 'bug' | 'feedback' | 'comment'}) => {
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

export const FeedbackList = (props: FeedbackListProps) => {
  return (
    <Stack my={1} gap={1}>
      {props.feedback?.length == 0 && (
        <Typography>You have not submitted any feedback yet.</Typography>
      )}
      {props.feedback.map((feedback, index) => (
        <Link to={`/feedback/${feedback.id}`} key={feedback.id}>
        <Stack
          direction={'row'}
          gap={1}
          sx={{ padding: '10px', border: '1px solid gray', cursor: 'pointer' }}
        >
          <FeedbackTypeIcon type={feedback.type} />
          <Typography variant="body1">{feedback.content}</Typography>
          <Badge>{feedback.status}</Badge>
        </Stack>
        </Link>
      ))}
    </Stack>
  );
};

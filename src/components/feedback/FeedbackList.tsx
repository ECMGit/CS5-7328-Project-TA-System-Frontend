import { BugReport, Checklist } from '@mui/icons-material';
import { Chip, Stack, Tooltip, Typography } from '@mui/material';
import { yellow, red, lightGreen, green } from '@mui/material/colors';
import React from 'react';
import { Link } from 'react-router-dom';
import { FeedbackItem } from '../../services/feedback';

const warning = yellow[500];
const primary = red[500];
const secondary = lightGreen[500];
const success = green[500];

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

const FeebackStatus = ({ status }: {status: 'Unread' | 'Pending' | 'In-Progress' | 'Complete'}) => {
  if (status === 'Pending') {
    return (
      <Chip label="Pending" color='warning'></Chip>
    );
  } else if(status === 'In-Progress') {
    return (
      <Chip label="In-Progress" color='warning'></Chip>
    );
  } else if(status === 'Complete') {
    return (
      <Chip label="Complete" color='success'></Chip>
    );
  } else {
    return (
      <Chip label="Unread" color='primary'></Chip>
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
          <FeebackStatus status={feedback.status} />
        </Stack>
        </Link>
      ))}
    </Stack>
  );
};

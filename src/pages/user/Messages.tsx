import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';

const MessageThread = ({ messageId }: { messageId: number }) => {
  // Simulated message thread data
  const messageThread = [
    {
      id: 1,
      content: 'Hello, your application has been received.',
      createdAt: new Date('2023-12-01T10:20:30Z'),
      sender: { id: 1, firstName: 'John', lastName: 'Doe' },
    },
    {
      id: 2,
      content: 'Thank you for the update. When can I expect a decision?',
      createdAt: new Date('2023-12-02T09:15:00Z'),
      sender: { id: 4, firstName: 'Jane', lastName: 'Smith' },
    },
    {
      id: 3,
      content:
        'We will review your application and get back to you within a week.',
      createdAt: new Date('2023-12-03T14:30:00Z'),
      sender: { id: 1, firstName: 'John', lastName: 'Doe' },
    },
  ];

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Message Thread
      </Typography>
      <Paper elevation={3}>
        <List>
          {messageThread.map((message) => (
            <React.Fragment key={message.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[500] }}>
                    {message.sender.firstName.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" color="text.primary">
                      {message.sender.firstName} {message.sender.lastName}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {message.content}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {message.createdAt.toLocaleString()}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default function Messages() {
  const { messageId } = useParams<{ messageId: string }>();

  return (
    <Box
      sx={{
        padding: 4,
        bgcolor: grey[100],
        height: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Messages
      </Typography>
      {messageId && <MessageThread messageId={Number(messageId)} />}
    </Box>
  );
}

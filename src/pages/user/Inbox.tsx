import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {
  Container,
  Typography,
  Button,
  Avatar,
  Box,
  Input,
  TextField,
  Paper,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface TAJob {
  title: string;
}

interface Course {
  title: string;
}

interface UserMessage {
  id: number;
  content: string;
  createdAt: Date;
  sender: User;
  taJob: TAJob;
  course: Course;
}

// TODO: Should be replaced by real content 
const messages: UserMessage[] = [
  {
    id: 1,
    content: 'Hello, your application has been received.',
    createdAt: new Date('2023-12-01T10:20:30Z'),
    sender: { id: 1, firstName: 'John', lastName: 'Doe' },
    taJob: { title: 'TA for Computer Science' },
    course: { title: 'Introduction to Programming' }
  },
  {
    id: 2,
    content: 'We need to schedule a meeting to discuss your application.',
    createdAt: new Date('2023-12-02T15:45:00Z'),
    sender: { id: 2, firstName: 'Alice', lastName: 'Smith' },
    taJob: { title: 'TA for Data Structures' },
    course: { title: 'Advanced Algorithms' }
  },
  {
    id: 3,
    content: 'Congratulations! Your TA application has been approved.',
    createdAt: new Date('2023-12-03T09:30:00Z'),
    sender: { id: 3, firstName: 'Bob', lastName: 'Johnson' },
    taJob: { title: 'TA for Artificial Intelligence' },
    course: { title: 'Machine Learning Basics' }
  }
];

const MessageItem = ({ message }: { message: UserMessage }) => {
  return (
    <Container>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={`${message.taJob.title} - ${message.course.title}`}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {`${message.sender.firstName} ${message.sender.lastName}`}
              </Typography>
              {` — ${message.content}`}
            </>
          }
        />
        <Typography variant="caption" display="block" gutterBottom>
          {message.createdAt.toLocaleString()}
        </Typography>
      </ListItem>
      <Divider variant="inset" component="li" />
    </Container>
  );
};

const MessagesList = () => {
  return (
    <Container>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: '#1976D2', // Blue color
          color: '#FFF', // White color
          padding: '16px', // Adjust the padding as needed
        }}
      >
        Inbox
      </Box>
      <List sx={{ width: '100%' }}>

        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </List>

    </Container>

  );
};

export default MessagesList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Container,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Paper,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { blue, grey } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface UserMessage {
  id: number;
  content: string;
  createdAt: Date;
  sender: User;
  isRead: boolean;
}

const MessageItem = ({ message }: { message: UserMessage }) => {
  return (
    <Link to={`/inbox/${message.id}`} style={{ textDecoration: 'none' }}>
      <ListItem alignItems="flex-start" style={{ backgroundColor: message.isRead ? 'transparent' : '#FFD700' }}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: blue[500] }}>{message.sender.firstName.charAt(0)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="subtitle1" color="text.primary">
              {message.sender.firstName} {message.sender.lastName}
            </Typography>
          }
          secondary={
            <>
              <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
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
    </Link>
  );
};

const MessagesList = () => {
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // temp receiverId
  const receiverId = 2;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:9000/api/messages/receiver/${receiverId}`)
      .then(response => {
        const sortedMessages = response.data.sort((a: UserMessage, b: UserMessage) => {
          console.log(a.createdAt);
          // Ensure we convert dates only if needed
          const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
          const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
        setMessages(sortedMessages.length > 0 ? [sortedMessages[0]] : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch messages:', err);
        setError('Failed to fetch messages');
        setLoading(false);
      });
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: grey[100],
        height: '100vh',
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <IconButton component={Link} to="/student-profile" edge="start" color="inherit" aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Inbox
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 4, marginTop: 8 }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : messages.length === 0 ? (
          <Typography>No messages found.</Typography>
        ) : (
          <Paper elevation={3}>
            <List>
              {messages.map(message => (
                <MessageItem key={message.id} message={message} />
              ))}
            </List>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default MessagesList;
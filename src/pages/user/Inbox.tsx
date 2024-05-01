import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';

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

const MessageItem = ({
  message
}: {
  message: UserMessage;
}) => {
  return (
    <Link to={`/inbox/${message.id}`} style={{ textDecoration: 'none' }}>
      <Container>
        <ListItem alignItems="flex-start" style={{ backgroundColor: message.isRead ? 'transparent' : '#FFD700' }}>
          <ListItemText
            primary={`Message from ${message.sender.firstName} ${message.sender.lastName}`}
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
                <Typography variant="caption" display="block" gutterBottom>
                  {new Date(message.createdAt).toLocaleString()}
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </Container>
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
    axios.get(`http://localhost:9000/api/messages/receiver/${receiverId}`)
      .then(response => {
        console.log('Fetched messages:', response.data);  
        setMessages(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch messages:', err);
        setError('Failed to fetch messages');
        setLoading(false);
      });
  }, []);

  if (loading) return <Typography>Loading messages...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (messages.length === 0 && !loading) {
    return <Typography>No messages found.</Typography>;
  }
  
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>Inbox</Typography>
      <List>
        {messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}
      </List>
    </Container>
  );
};

export default MessagesList;

import React, { useEffect, useState } from 'react';
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
    Button,
    TextField
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';

interface Sender {
    id: number;
    firstName: string;
    lastName: string;
}

interface Message {
    id: number;
    content: string;
    createdAt: string;
    sender: Sender;
}

interface MessageThreadProps {
    messageId: number;
}

const MessageThread = ({ messageId }: MessageThreadProps) => {
    const token = localStorage.getItem('token');
    const [messages, setMessages] = useState<Message[]>([]);
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [replyMessage, setReplyMessage] = useState('');

    const receiverId = 2; // Assuming the receiver is the current user
    const applicationId = 5; // Assuming the application ID is known
    const senderId = 1; // Assuming the sender ID is known

    useEffect(() => {
        fetch(`http://localhost:9000/api/messages/receiver/${receiverId}`)
            .then(response => response.json())
            .then(data => {
                const sortedMessages = data.sort((a: Message, b: Message) =>
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                );
                setMessages(sortedMessages);
            })
            .catch(error => console.error('Failed to load messages', error));
    }, [receiverId]);

    const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReplyMessage(event.target.value);
    };

    const sendReply = () => {
        // Prepare the payload
        const newMessage = {
            senderId: senderId, // Assuming this is already defined
            receiverId: receiverId, // Assuming this is already defined
            content: replyMessage,
            applicationId: applicationId,
        };

        // Make the POST request
        fetch('http://localhost:9000/message/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newMessage),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to send the reply');
                }
                return response.json();
            })
            .then(data => {
                console.log('Reply sent successfully:', data);

                // Clear the reply input and hide the box
                setReplyMessage('');
                setShowReplyBox(false);

                // Optionally reload messages to update the thread
                fetchMessages();
            })
            .catch(error => console.error('Error sending reply:', error));
    };

    const fetchMessages = () => {
        fetch(`http://localhost:9000/api/messages/receiver/${receiverId}`)
            .then(response => response.json())
            .then(data => {
                const sortedMessages = data.sort((a: Message, b: Message) =>
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                );
                setMessages(sortedMessages);
            })
            .catch(error => console.error('Failed to load messages', error));
    };


    return (
        <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6" gutterBottom>
                Message Thread
            </Typography>
            <Paper elevation={3}>
                <List>
                    {messages.map((message: Message) => (
                        <React.Fragment key={message.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: blue[500] }}>
                                        {message.sender.firstName.charAt(0)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography variant="subtitle1" color="text.primary">
                                        {message.sender.firstName} {message.sender.lastName}
                                    </Typography>}
                                    secondary={<>
                                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                            {message.content}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(message.createdAt).toLocaleString()}
                                        </Typography>
                                    </>}
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))}
                </List>
                <Button onClick={() => setShowReplyBox(!showReplyBox)}>Reply</Button>
                {showReplyBox && (
                    <Box sx={{ margin: 2 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            value={replyMessage}
                            onChange={handleReplyChange}
                            placeholder="Type your reply here..."
                        />
                        <Button onClick={sendReply} sx={{ marginTop: 1 }}>Send</Button>
                    </Box>
                )}
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


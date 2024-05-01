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
    createdAt: string; // Keeping createdAt as string for simplicity
    sender: Sender;
}

interface MessageThreadProps {
    messageId: number;
}

const MessageThread = ({ messageId }: MessageThreadProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const receiverId = 2; // Assuming the receiver is the current user

    useEffect(() => {
        // Assuming your server returns all messages in a thread based on an initial message ID
        fetch(`http://localhost:9000/api/messages/receiver/${receiverId}`)
            .then(response => response.json())
            .then(data => {
                // Sort messages by createdAt in ascending order
                const sortedMessages = data.sort((a: Message, b: Message) => {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                });
                setMessages(sortedMessages);
            })
            .catch(error => console.error('Failed to load messages', error));
    }, [receiverId]);  // Use receiverId as the dependency to refetch when it changes

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
                                                {new Date(message.createdAt).toLocaleString()}
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



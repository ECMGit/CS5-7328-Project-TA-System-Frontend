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
    createdAt: string; // or Date if you prefer
    sender: Sender;
}

interface MessageThreadProps {
    messageId: number;
}


const MessageThread = ({ messageId }: MessageThreadProps) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        fetch(`/api/messages/${messageId}`)
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.error('Failed to load messages', error));
    }, [messageId]);

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
    const { messageId } = useParams<string>();

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

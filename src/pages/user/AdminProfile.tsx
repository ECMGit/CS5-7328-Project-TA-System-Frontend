import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import AdminService from '../../services/admin-service';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Container, Typography, Button, Avatar, Box, TextField, Paper, Grid, Input } from '@mui/material';

interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    status: string;
}

const AdminProfile: React.FC = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        AdminService.fetchUsers()
            .then((response: AxiosResponse<User[]>) => {
                const data = response.data;
                console.log('Users data:', data);
                setUsers(data.slice(0, 3)); // Just taking the first 3 for display
            })
            .catch((error: AxiosError) => {
                console.error('Error fetching users:', error.message);
            });
    }, []);

    function handleUploadClick() {
        document.getElementById('profileUpload')?.click();
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const uploadedImage = e.target?.result as string;
                setProfileImage(uploadedImage);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#1976D2',
                    color: '#FFF',
                    padding: '16px',
                }}
            >
                My Admin Dashboard
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography component="h1" variant="h5">
                            Admin Profile
                        </Typography>
                        <Avatar
                            sx={{ width: 200, height: 200, mt: 3 }}
                            alt="Admin Profile"
                            src={profileImage || undefined}
                        />
                        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleUploadClick}>
                            Upload Profile Picture
                        </Button>
                        <Input type="file" id="profileUpload" sx={{ display: 'none' }} onChange={handleFileChange} />
                        <Box sx={{ mt: 4, width: '100%' }}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ mt: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {users.map((user) => (
                            <Paper key={user.id} elevation={3} sx={{ spacing: 2, padding: 2, mb: 2, width: '100%' }}>
                                <Typography variant="h6">{user.username}</Typography>
                                <Typography>Email: {user.email}</Typography>
                                <Typography>Role: {user.role}</Typography>
                                <Typography>Status: {user.status}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 1 }}
                                    onClick={() => navigate(`/edit-user/${user.id}`)}
                                >
                                    Edit User
                                </Button>
                            </Paper>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminProfile;

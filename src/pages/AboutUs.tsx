import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button, Card, CardContent, Grid, CardMedia, Box, Link } from '@mui/material';
import Footer from '../components/Footer';
import GitHubIcon from '@mui/icons-material/GitHub';

interface Contributor {
  avatar_url: string;
  login: string;
}

import useAutoLogout from '../components/AutoLogOut';

export default function AboutUs() {
    const [contributors, setContributors] = useState<Contributor[]>([]);

    useEffect(() => {
        const fetchContributors = async () => {
            const res = await axios.get('https://api.github.com/repos/ECMGit/CS5-7328-Project-TA-System-Frontend/contributors');
            setContributors(res.data);
        };

        fetchContributors();
    }, []);

  const { Modal } = useAutoLogout();
    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        {/* // <Box sx={{ px: 4, py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 20 }}> */}
            <Grid item xs={2}/>
            <Grid item xs={8}>
                <Typography variant="h3" component="h1" gutterBottom align="center">
                    About Us
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 800 }}>
                    We are a team dedicated to creating tools that empower innovation.
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 4 }}>
                    <Link href="https://github.com/ECMGit/CS5-7328-Project-TA-System-Frontend" target="_blank" rel="noopener noreferrer">
                    <Button variant="contained" startIcon={<GitHubIcon />}>
                            Frontend Repo
                    </Button>
                    </Link>
                    <Link href="https://github.com/ECMGit/CS5-7328-Project-TA-System-Backend" target="_blank" rel="noopener noreferrer">
                    <Button variant="contained" startIcon={<GitHubIcon />}>
                            Backend Repo
                        </Button>
                    </Link>
                </Box>
                <Typography variant="h5" component="h2" sx={{ mt: 6, mb: 4 }} align="center">
                    Contributors
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 4 }}>
                    <Grid container justifyContent="center" spacing={4} sx={{ mt: 6, flexGrow: 1}}>
                        
                        {contributors.map((contributor, index) => (
                            <Grid item key={index} xs={10} sm={4} md={3}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        image={contributor.avatar_url}
                                        alt={contributor.login}
                                        sx={{ width: 50, height: 50, margin: 'auto' }}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {contributor.login}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                        
                    </Grid>
                </Box>
                <Footer />
            </Grid>
            <Grid item xs={2}/>
            
        {/* </Box> */}
        {Modal}
        </Grid>
        
        
    );
}

import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Grid, Paper } from '@mui/material';
import { To, useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import GroupIcon from '@mui/icons-material/Group';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const navigationCards = [
    { title: 'All Students', path: '/students', icon: <SchoolIcon fontSize="large" />, color: '#1976d2', textColor: '#fff' },
    { title: 'All Courses', path: '/courses', icon: <BookIcon fontSize="large" />, color: '#388e3c', textColor: '#fff' },
    { title: 'All Faculties', path: '/faculties', icon: <GroupIcon fontSize="large" />, color: '#d32f2f', textColor: '#fff' },
  ];

  const handleNavigate = (path: To) => {
    navigate(path);
  };

  return (
    <Paper elevation={3} style={{ margin: 'auto', padding: '20px', maxWidth: '1200px', marginTop: '20px', background: '#eceff1' }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" style={{ color: '#333' }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3} justifyContent="center" style={{ padding: '20px' }}>
        {navigationCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card raised style={{ backgroundColor: card.color, boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
              <CardActionArea
                onClick={() => handleNavigate(card.path)}
                style={{ padding: '20px', transition: 'transform 0.3s' }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <CardContent style={{ textAlign: 'center', color: card.textColor }}>
                  {card.icon}
                  <Typography gutterBottom variant="h5" component="h2" style={{ marginTop: '20px' }}>
                    {card.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default AdminDashboard;

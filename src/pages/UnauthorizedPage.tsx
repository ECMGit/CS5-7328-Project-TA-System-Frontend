import React from 'react';
import { Typography, Button, Container, Box, useTheme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';



const NotFoundPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container maxWidth="lg" sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      p: 3, // padding from theme spacing
    }}>
      <Box sx={{
        bgcolor: 'background.paper',
        borderRadius: 'borderRadius',
        display: 'inline-flex',
        p: 1, // padding from theme spacing
      }}>
        <SearchIcon sx={{ fontSize: '3rem', color: 'primary.main' }} />
      </Box>
      <Typography variant={matches ? 'h3' : 'h4'} component="h1" sx={{ fontWeight: 700, mb: 2 }}>
        404
      </Typography>
      <Typography variant={matches ? 'h3' : 'h4'} component="h1" sx={{ fontWeight: 700, mb: 2 }}>
        Page not found
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, fontFamily: 'Your font family here' }}>
        Apologies, but the page you were looking for wasn&apos;t found.
        Click the button below to go back to the homepage.
</Typography>
        < Button color="primary" variant="contained" href="/">
          Go Home
        </Button>
    </Container>
  );
};

export default NotFoundPage;

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Container } from '@mui/material';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import EmailIcon from '@mui/icons-material/Email';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';

const UpperNav = () => {
  const [iconColor, setIconColor] = useState('white');

  useEffect(() => {
    const interval = setInterval(() => {
      setIconColor(prevColor => (prevColor === 'white' ? '#ff0000' : 'white'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AppBar position="static" sx={{ background: "#1e3a8a", p: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="phone" size='large' sx={{ fontSize: "1.5rem", mr: 2 }}>
              <PhoneForwardedIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div" sx={{ mr: { xs: 0, lg: 5 }, fontSize: { xs: '1rem', lg: '1.25rem' } }}>
              +9876-5432-100
            </Typography>
            <IconButton edge="start" color="inherit" aria-label="email" size='large' sx={{ display: { xs: 'none', xl: 'block' }, mr: 2 }}>
              <EmailIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div" sx={{ display: { xs: 'none', md: 'flex' }, fontSize: { xs: '1rem', lg: '1.25rem' } }}>
              mailto:hospitalcare@healthmail.com
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="ambulance"
              sx={{ display: { xs: 'block', md: 'flex' }, mr: 2 }}
            >
              <LocalTaxiIcon sx={{ color: iconColor }} />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div" sx={{ fontSize: { xs: '1rem', lg: '1.25rem' } }}>
              +91-7890-1234-567
            </Typography>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default UpperNav;

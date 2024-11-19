import React from 'react';
import { Box, Button, Grid, Input, List, ListItem, Typography, useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faLinkedin, faSquareFacebook, faSquareGithub, faSquareInstagram, faSquareTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const Footer = () => {
  const theme = useTheme();

  const socialIconStyle = {
    color: theme.palette.common.white,
    fontSize: "28px", // Slightly reduced for cleaner look
    marginRight: "10px",
    cursor: "pointer",
    transition: "color 0.3s",
    '&:hover': {
      color: theme.palette.secondary.main,
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: theme.palette.primary.main,
        padding: "60px 0",
        color: theme.palette.common.white,
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/images/form_back_1.jpg")`,
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
      }}
    >
      <Grid container spacing={6} justifyContent="center">
        <Grid item md={3} sm={6} xs={12}>
          <Typography variant="h6" gutterBottom>About</Typography>
          <List>
            <ListItem><Link href="/" passHref><Typography color="inherit">Home</Typography></Link></ListItem>
            <ListItem><Link href="/contact" passHref><Typography color="inherit">Get in touch</Typography></Link></ListItem>
            <ListItem><Link href="/faqs" passHref><Typography color="inherit">FAQs</Typography></Link></ListItem>
          </List>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Typography variant="h6" gutterBottom>Product</Typography>
          <List>
            <ListItem><Link href="/testimonials" passHref><Typography color="inherit">Testimonials</Typography></Link></ListItem>
            <ListItem><Link href="/how-it-works" passHref><Typography color="inherit">How it works</Typography></Link></ListItem>
            <ListItem><Link href="/discounts" passHref><Typography color="inherit">Member discounts</Typography></Link></ListItem>
          </List>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <Typography variant="h6" gutterBottom>Stay Connected</Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <FontAwesomeIcon icon={faSquareFacebook} style={socialIconStyle} />
            <FontAwesomeIcon icon={faSquareTwitter} style={socialIconStyle} />
            <FontAwesomeIcon icon={faGooglePlusG} style={socialIconStyle} />
            <FontAwesomeIcon icon={faSquareGithub} style={socialIconStyle} />
            <FontAwesomeIcon icon={faSquareInstagram} style={socialIconStyle} />
            <FontAwesomeIcon icon={faLinkedin} style={socialIconStyle} />
          </Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Subscribe to our newsletter. No spam, only updates.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Input fullWidth placeholder="Enter your email" sx={{ backgroundColor: theme.palette.common.white, borderRadius: "4px" }} />
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="secondary" fullWidth>Subscribe</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;

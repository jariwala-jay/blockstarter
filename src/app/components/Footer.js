import React from 'react';
import { Container, Button, Typography, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#4056a1', color: 'white', padding: '20px 0' }}>
      <Container>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              Create Your Campaign Now
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} style={{ textAlign: 'right' }}>
            <Button variant="outlined" color="primary" href="http://localhost:3000/campaigns/new">
              Create Campaign
            </Button>
          </Grid>
        </Grid>
      </Container>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="body2">
          © 2022 Copyright : <Link href="http://localhost:3000" color="inherit" underline="always">bitstart.com</Link>
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;

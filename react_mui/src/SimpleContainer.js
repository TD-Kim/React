import { Box, Container, CssBaseline } from '@mui/material';
import React from 'react';
import "./SimpleContainer.css";

function SimpleContainer(props) {
  return (
    <div>
      <CssBaseline />
      <Container maxWidth='sm'>
        {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} /> */}
        <Box className="container" />
      </Container>
    </div>
  );
}

export default SimpleContainer;

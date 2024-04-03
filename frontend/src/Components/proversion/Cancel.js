import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  backgroundColor: '#009C96',
  color: 'white',
  '&:hover': {
    backgroundColor: '#008a84',
  },
});

const Cancel = () => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  const handleCancel = () => {
        navigate('/home');
  };

  useEffect(() => {
    // Trigger fadeIn effect after component mounts
    setTimeout(() => {
      setFadeIn(true);
    }, 100);
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      flexDirection="column"
      style={{
        animation: fadeIn ? 'fadeIn 0.5s ease-in-out forwards' : 'none',
      }}
    >
      <Typography
        variant="h3"
        textAlign="center"
        color="slate.700"
        mb={4}
        style={{
          transition: 'opacity 0.5s ease-in-out',
          opacity: fadeIn ? 1 : 0,
        }}
      >
        Something Went Wrong
      </Typography>
      <StyledButton
        variant="contained"
        size="large"
        className="uppercase"
        onClick={handleCancel}
        style={{
          transition: 'opacity 0.5s ease-in-out',
          opacity: fadeIn ? 1 : 0,
        }}
      >
        Go to Home Page
      </StyledButton>
    </Box>
  );
};

export default Cancel;


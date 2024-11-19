import React from 'react';
import { Box, Typography } from '@mui/material';

const ScrollingText = () => {
  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        position: 'relative',
        background: 'linear-gradient(90deg, #36D1DC, #5B86E5)', // Cool gradient
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Box
        sx={{
          display: 'inline-block',
          paddingLeft: '100%',
          animation: 'scroll-left 20s linear infinite',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            display: 'inline',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            fontFamily: '"Arial", sans-serif',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          | WELCOME TO OUR HEALTHCARE CENTER | QUALITY CARE, COMPASSIONATE STAFF | CALL US NOW AT 123-456-7890 FOR APPOINTMENTS | Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate obcaecati temporibus possimus atque accusamus dolores deleniti sunt magnam \
        </Typography>
      </Box>
      <style>
        {`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default ScrollingText;

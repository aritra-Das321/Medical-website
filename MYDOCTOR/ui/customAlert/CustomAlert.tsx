// CustomAlert.tsx

import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Box, DialogActions, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

interface CustomAlertProps {
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  open: boolean;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, severity = 'info', open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { position: 'relative', zIndex: 9999 } }}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 9998,
        }}
      />
      <DialogContent
        sx={{
          position: 'relative',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor:'white',

        }}
      >
        <DialogTitle color={severity}>
          {severity.toUpperCase()}
        </DialogTitle>
        <Typography variant="h6" sx={{ my: 2 }}>
          {message}
        </Typography>
        <DialogActions>
        <Link href='/auth'><Button variant='contained'>Go to Log in</Button></Link>
        <Button variant='contained' color='secondary' onClick={onClose}>Not Now</Button>
        <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            sx={{ position: 'absolute', right: 13, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
      </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CustomAlert;

// src/components/CustomModal.tsx

import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface CustomModalProps {
  isOpen: boolean;
  message: string;
  onStay: () => void;
  onLeave: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, message, onStay, onLeave }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onStay}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Inactivity Alert'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onLeave} color="primary">
          Log Out
        </Button>
        <Button onClick={onStay} color="primary" autoFocus>
          Stay Logged In
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;

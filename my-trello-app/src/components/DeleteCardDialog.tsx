import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button 
} from '@mui/material';

interface DeleteCardDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (cardId: number) => void;
  cardId: number;
}

function DeleteCardDialog({ open, onClose, onConfirm, cardId }: DeleteCardDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Card</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this card?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onConfirm(cardId)} color="error"> 
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteCardDialog;
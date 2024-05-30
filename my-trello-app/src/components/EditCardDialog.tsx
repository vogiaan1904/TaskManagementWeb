import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions, 
  Button 
} from '@mui/material';
import { Card } from './type';

interface EditCardDialogProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (newTitle: string, cardId: number) => void;
  card: Card | null; 
  newCardTitle: string;
  setNewCardTitle: (newTitle: string) => void;
}

function EditCardDialog({ open, onClose, onUpdate, card, newCardTitle, setNewCardTitle }: EditCardDialogProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (card) { // Check if card is not null
      onUpdate(newCardTitle, card.id);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Card</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Card Title"
            type="text"
            fullWidth
            variant="standard"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit} component={(props) => <button {...props} />}> 
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCardDialog;
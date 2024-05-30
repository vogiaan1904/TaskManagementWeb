import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions, 
  Button 
} from '@mui/material';

interface AddCardDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, columnId: number) => void;
  columnId: number;
}

function AddCardDialog({ open, onClose, onCreate, columnId }: AddCardDialogProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate(title, columnId);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Card</DialogTitle>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit} component={(props) => <button {...props} />}> 
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCardDialog;
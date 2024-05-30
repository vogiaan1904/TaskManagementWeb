// src/components/AddBoardDialog.jsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

type AddBoardDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
};

function AddBoardDialog({ open, onClose, onCreate }: AddBoardDialogProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate(title);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Board</DialogTitle>
      <DialogContent>
      <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Board Title"
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

export default AddBoardDialog;
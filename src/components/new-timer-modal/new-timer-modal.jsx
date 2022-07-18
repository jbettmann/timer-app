import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Timer } from "../timer/timer";

export const NewTimerModal = ({ open, handleClose, addNewTimer }) => {
  const [name, setName] = useState("");

  const updateTimerName = (e) => {
    let value = e.target.value;
    setName(value);
  };

  const handleSubmit = () => {
    addNewTimer(name);
    handleClose();
    setName("");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>{name}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name Timer"
          type="text"
          onChange={(event) => updateTimerName(event)}
          fullWidth
        />
      </DialogContent>
      <Timer />
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleSubmit}>Start</Button>
      </DialogActions>
    </Dialog>
  );
};

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

export const TimesUp = ({ open, name, handleTimesUpClose }) => {
  return (
    <Dialog open={open} onClose={handleTimesUpClose}>
      <DialogContent>
        <DialogContentText>{name} IS DONE!</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleTimesUpClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

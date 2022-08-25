import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import "./timers-up.css";

export const TimesUp = ({ open, name, handleTimesUpClose, handleRepeat }) => {
  return (
    <Dialog id="times-up__main" open={open} onClose={handleTimesUpClose}>
      <DialogContent>
        <DialogContentText>{name} Finished!</DialogContentText>
      </DialogContent>
      <DialogActions id="times-up__buttons">
        <Button onClick={handleRepeat}>Repeat</Button>
        <Button onClick={handleTimesUpClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

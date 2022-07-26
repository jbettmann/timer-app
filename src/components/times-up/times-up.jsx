import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

export const TimesUp = ({ open, name, handleTimesUpClose, handleRepeat }) => {
  return (
    <Dialog open={open} onClose={handleTimesUpClose}>
      <DialogContent>
        <DialogContentText>{name} Finished!</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRepeat}>Repeat</Button>
        <Button onClick={handleTimesUpClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

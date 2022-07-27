import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Input,
} from "@mui/material";

export const NewTimerModal = ({ open, handleClose, addNewTimer }) => {
  const [name, setName] = useState("");

  // display time initially submitted by user before time starts running.
  let [submittedHours, setSubmittedHours] = useState(0);
  let [submittedMins, setSubmittedMins] = useState(0);
  let [submittedSeconds, setSubmittedSeconds] = useState(0);

  // Error message state
  const [error, setError] = useState("");

  const updateTimerName = (e) => {
    let value = e.target.value;
    setName(value);
  };

  // Handles submit once user inputs all values needed
  const handleSubmit = () => {
    if (
      (submittedHours >= 24 && submittedMins >= 1 && submittedSeconds >= 1) ||
      submittedHours >= 24
    ) {
      return setError("Hours must be under 24 for timer to run");
    }
    if (submittedMins >= 60) {
      return setError("Minutes must be between 0 -59 min");
    }
    if (submittedSeconds >= 60) {
      return setError("Seconds must be between 0 -59 sec");
    } else {
      let total =
        submittedHours * 60 * 60 * 1000 +
        submittedMins * 60 * 1000 +
        submittedSeconds * 1000;
      addNewTimer(name, total); // sends name to timer obj and sets name property to name
      handleClose(); // closes modal
      setName(""); // sets name value to "" in modal component
    }
  };

  // Real time validation hours entered is less than 24 and displays error message
  const handleHourSet = (e) => {
    setSubmittedHours(e.target.value);
    submittedHours <= 24
      ? setError("")
      : setError("Hours must be under 24 for timer to start");
  };

  // Real time validation for minutes entered to be less than 59 and displays error message
  const handleMinsSet = (e) => {
    setSubmittedMins(e.target.value);
    submittedMins <= 59
      ? setError("")
      : setError("Minutes must be under 60 for timer to start");
  };

  // Real time validation for seconds entered to be less than 59 and displays error message
  const handleSecondsSet = (e) => {
    setSubmittedSeconds(e.target.value);
    submittedSeconds <= 59
      ? setError("")
      : setError("Seconds must be under 60 for timer to start");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
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
      <form onSubmit={handleSubmit}>
        <Input
          type="number"
          name="hours"
          onChange={handleHourSet}
          onBlur={handleHourSet}
        />
        <div className="error">{error}</div>
        <Input
          type="number"
          name="mins"
          onChange={handleMinsSet}
          onBlur={handleMinsSet}
        />
        <Input
          type="number"
          name="seconds"
          onChange={handleSecondsSet}
          onBlur={handleSecondsSet}
        />
      </form>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleSubmit}>Start</Button>
      </DialogActions>
    </Dialog>
  );
};

import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Input,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import "./new-timer-modal.css";

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
  const handleSubmit = (e) => {
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
      if (e.target.title === "Save") {
        addNewTimer(name, total, false); // sends name to timer obj and sets name property to name
      } else {
        addNewTimer(name, total, true);
      }
      handleClose(); // closes modal
      setName(""); // sets name value to "" in modal component
    }
  };

  // Real time validation hours entered is less than 24 and displays error message
  const handleHourSet = (e) => {
    setSubmittedHours(e.target.value);
    e.target.value <= 24
      ? setError("")
      : setError("Hours must be under 24 for timer to start");
  };

  // Real time validation for minutes entered to be less than 59 and displays error message
  const handleMinsSet = (e) => {
    setSubmittedMins(e.target.value);
    e.target.value <= 59
      ? setError("")
      : setError("Minutes must be under 60 for timer to start");
  };

  // Real time validation for seconds entered to be less than 59 and displays error message
  const handleSecondsSet = (e) => {
    setSubmittedSeconds(e.target.value);
    e.target.value <= 59
      ? setError("")
      : setError("Seconds must be under 60 for timer to start");
  };

  return (
    <Dialog className="new-timer__modal" open={open} onClose={handleClose}>
      <DialogContent className="modal-name">
        <TextField
          disableUnderline
          margin="dense"
          id="name"
          placeholder="Timer Name"
          type="text"
          onChange={(event) => updateTimerName(event)}
          fullWidth
        />
      </DialogContent>
      <form className="new-timer__form" onSubmit={handleSubmit}>
        <Input
          disableUnderline
          type="number"
          className="new-timer-inputs"
          name="hours"
          placeholder="hrs"
          onChange={handleHourSet}
          onBlur={handleHourSet}
        />
        <p>:</p>
        <Input
          disableUnderline
          type="number"
          className="new-timer-inputs"
          name="mins"
          placeholder="mins"
          onChange={handleMinsSet}
          onBlur={handleMinsSet}
        />
        <p>:</p>
        <Input
          disableUnderline
          type="number"
          name="seconds"
          placeholder="secs"
          className="new-timer-inputs"
          onChange={handleSecondsSet}
          onBlur={handleSecondsSet}
        />
      </form>
      <div className="error">{error}</div>

      <DialogActions>
        <div className="start-cancel-buttons">
          <Button
            size="small"
            aria-label="Cancel timer edits"
            id="cancel-edits__button"
            color="secondary"
            title="Cancel"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            size="small"
            aria-label="Save timer changes"
            id="save-edits__button"
            color="secondary"
            title="Save"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
        <Button color="secondary" onClick={handleClose}>
          Close
        </Button>
        <IconButton
          aria-label="Start timer"
          color="secondary"
          className="play-button"
          type="submit"
          title="Start"
          onClick={handleSubmit}
        >
          <PlayArrowIcon sx={{ fontSize: 60 }} />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

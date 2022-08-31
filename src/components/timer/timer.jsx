import React, { useState, useEffect, useRef } from "react";
import useCountDown from "react-countdown-hook";
import AlertAudio from "../../assets/2001_Alert.mp3";
import { TimesUp } from "../times-up/times-up";
import { Button, Input, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import "./timer.css";

export const Timer = ({
  deleteTimer,
  id,
  name,
  total,
  newTimer,
  changeTimer,
}) => {
  // useCountDown hook.
  let initialTime; // initial number. default 60000ms
  let interval; // how often hook is ran. default 1000ms
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(
    initialTime,
    interval
  );
  // name of timer
  const [timerName, setTimerName] = useState(name);

  //timer total to total default
  // const [newTotalTime, setNewTotalTime] = useState(total);

  // state for when timer is running
  const [running, setRunning] = useState(false);

  // sets timer pause to false for buttons showing
  const [timerPause, setTimerPause] = useState(false);

  // sets timer alert state for when timer is finished
  const [timerFinished, setTimerFinished] = useState(false);

  // sets state for timer alert
  const [showTimesUpModal, setShowTimesUpModal] = useState(false);

  // Time submitted from modal for new timer
  const [newTimeFromModal, setNewTimeFromModal] = useState(newTimer);

  // controls edit view display
  const [editView, setEditView] = useState(false);

  // display time initially submitted by user before time starts running.
  let [submittedHours, setSubmittedHours] = useState(
    Math.floor((total % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))
  );
  let [submittedMins, setSubmittedMins] = useState(
    Math.floor((total % (60 * 60 * 1000)) / (1000 * 60))
  );
  let [submittedSeconds, setSubmittedSeconds] = useState(
    Math.floor((total % (1000 * 60)) / 1000)
  );

  // holds previous state of submitted time for cancel button when editing
  let prevHour = useRef(submittedHours);
  let prevMins = useRef(submittedMins);
  let prevSecs = useRef(submittedSeconds);
  let prevName = useRef(name);
  // hours, minutes and seconds passed to the start() in submit handle in millsec.
  let [second, setSecond] = useState(submittedSeconds * 1000);
  let [minute, setMinute] = useState(submittedMins * 60 * 1000);
  let [hour, setHour] = useState(submittedHours * 60 * 60 * 1000);

  // sets audio state to audio file
  const [audioPlay, setAudioPlay] = useState(new Audio(AlertAudio));

  // Error message state
  const [error, setError] = useState("");

  // Calculations for hour, minute and second for display on screen
  let hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (1000 * 60));
  let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Sets 0 in front of number less than 10 so always two digits.
  let runningHours = hours < 10 ? `0${hours}` : hours;
  let runningMins = minutes < 10 ? `0${minutes}` : minutes;
  let runningSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // real time form validation
  const FormValidation = (e) => {
    // Real time validation hours entered is less than 24 and displays error message
    if (e.target.name === "hours") {
      setSubmittedHours(e.target.value);
      if (e.target.value >= 24) {
        setError("Hours must be under 24 for timer to start");
      } else {
        setHour(e.target.value * 60 * 60 * 1000);
        setError("");
      }
    }

    // Real time validation for minutes entered to be less than 59 and displays error message
    if (e.target.name === "mins") {
      setSubmittedMins(e.target.value);
      if (e.target.value >= 60) {
        setError("Minutes must be under 60 for timer to start");
      } else {
        setMinute(e.target.value * 60 * 1000);
        setError("");
      }
    }

    // Real time validation for seconds entered to be less than 59 and displays error message
    if (e.target.name === "seconds") {
      setSubmittedSeconds(e.target.value);
      if (e.target.value >= 60) {
        setError("Seconds must be under 60 for timer to start");
      } else {
        setSecond(e.target.value * 1000);
        setError("");
      }
    }
  };

  // plays audio when time is up
  const startAudio = () => {
    audioPlay.play();
  };

  // Stops audio and set audio to beginning
  const stopAudio = () => {
    audioPlay.pause();
    setAudioPlay(new Audio(AlertAudio));
  };

  const startFromDisplay = () => {
    setRunning(true);
    setTimerFinished(true);
    setError("");
    setEditView(false);
    start(total);
  };

  // sets Running state to true and adds hour, minutes and seconds to total then submitted to start() in millsec.
  const handleSubmit = (e) => {
    e.preventDefault();
    let newTotalTimer = hour + minute + second;
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
    }
    if (submittedHours <= 0 && submittedMins <= 0 && submittedSeconds <= 0) {
      return alert("Please enter time to start timer");
    }
    if (hour === 0 && minute === 0 && second === 0) {
      changeTimer(id, newTotalTimer, timerName);
      setRunning(true);
      setTimerPause(false);
      setTimerFinished(true);
      setError("");
      setEditView(false);
      start(total);
    } else {
      changeTimer(id, newTotalTimer, timerName);
      setRunning(true);
      setTimerPause(false);
      setTimerFinished(true);
      setError("");
      setEditView(false);
      start(newTotalTimer);
    }
  };
  // Saves edits to timer
  const handleSave = (e) => {
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
      let newTotalTimer = hour + minute + second;
      changeTimer(id, newTotalTimer, timerName);
      setEditView(false);
    }
  };

  // Cancels all edits from edit timer
  const handleCancel = () => {
    setSubmittedHours(prevHour.current);
    setSubmittedMins(prevMins.current);
    setSubmittedSeconds(prevSecs.current);
    setTimerName(prevName.current);
    setEditView(false);
  };

  // Starts timer once time is set in new timer modal
  const startTimerFromModal = () => {
    start(total);
    setRunning(true);
    setTimerFinished(true);
    setError("");
  };

  // Repeats timer
  const handleRepeat = (e) => {
    e.preventDefault(e);
    start(total);
    stopAudio(); //stops audio and sets to og

    setShowTimesUpModal(false);
  };

  // resets hours, minutes and seconds along with running state.
  const handleReset = (e) => {
    e.preventDefault();
    stopAudio(); //stops audio and sets to og
    setTimerFinished(false);
    setShowTimesUpModal(false);
    setRunning(false);
    reset();
  };

  // alerts user when timer finished
  const alertFinish = () => {
    if (timeLeft === 0 && timerFinished) {
      setShowTimesUpModal(true);
      startAudio(); // starts timer audio
    }
  };
  //adds one minute to current timer
  const addAMinute = (e) => {
    let newTotal = timeLeft + 60000;
    start(newTotal);
    if (timerPause) {
      pause();
    }
  };

  const editTimer = () => {
    setEditView(true);
  };

  const handleBlur = (e) => {
    if (e.target.name === "hours") {
      if (e.target.value === "") {
        setSubmittedHours(0);
        setHour(0);
      } else {
        return submittedHours;
      }
    }
    if (e.target.name === "mins") {
      if (e.target.value === "") {
        setSubmittedMins(0);
        setMinute(0);
      } else {
        return submittedMins;
      }
    }
    if (e.target.name === "seconds") {
      if (e.target.value === "") {
        setSubmittedSeconds(0);
        setSecond(0);
      } else {
        return submittedSeconds;
      }
    }
  };

  useEffect(() => {
    alertFinish();

    // checks if newTimerFromModal is true to run startTimerFromModal
    if (newTimeFromModal) {
      startTimerFromModal();
      setNewTimeFromModal(0);
    }
  }, [timeLeft]);

  return (
    <>
      {/* start of Edit timer */}
      <div className={editView ? "timer " : "hide-timer"}>
        <Input
          disableUnderline
          type="text"
          name="name"
          className="timer-inputs"
          value={timerName}
          onChange={(e) => {
            setTimerName(e.target.value);
          }}
        />

        {running ? (
          <p>
            {runningHours}:{runningMins}:{runningSeconds}
            {/* {runningHours} Hours : {runningMins} Mins : {runningSeconds} Secs */}
          </p>
        ) : (
          <></>
        )}

        <form className="timer-form">
          <Input
            disableUnderline
            type="number"
            name="hours"
            className="timer-inputs"
            value={submittedHours}
            onFocus={() => setSubmittedHours("")}
            onBlur={handleBlur}
            onChange={FormValidation}
          />
          <label htmlFor="hours">hrs</label>

          <Input
            disableUnderline
            type="number"
            name="mins"
            className="timer-inputs"
            value={submittedMins}
            onFocus={() => setSubmittedMins("")}
            onBlur={handleBlur}
            onChange={FormValidation}
          />
          <label htmlFor="minutes">mins</label>

          <Input
            disableUnderline
            type="number"
            className="timer-inputs"
            name="seconds"
            value={submittedSeconds}
            onFocus={() => setSubmittedSeconds("")}
            onBlur={handleBlur}
            onChange={FormValidation}
          />
          <label htmlFor="seconds">secs</label>
        </form>
        <div className="error">{error}</div>

        <div className="grouped-edit-buttons">
          <div className="cancel-start-save">
            <Button
              size="small"
              aria-label="Cancel timer edits"
              id="cancel-edits__button"
              color="secondary"
              title="Cancel"
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <IconButton
              aria-label="Start timer"
              color="secondary"
              className="play-button play_pause"
              type="submit"
              title="Start"
              onClick={handleSubmit}
            >
              <PlayArrowIcon sx={{ fontSize: 60 }} />
            </IconButton>
            <Button
              size="small"
              aria-label="Save timer changes"
              id="save-edits__button"
              color="secondary"
              title="Save"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
          <Button
            id="delete-timer"
            className="delete"
            value={id}
            aria-label="delete timer"
            onClick={deleteTimer}
          >
            Delete
          </Button>
        </div>
      </div>
      {/* end of edit timer */}
      {/* start of face/display timer */}
      <div className={!editView ? "timer" : "hide-timer"}>
        <div className="edit-timer">
          <EditIcon
            id="edit-icon"
            aria-label="Edit timer"
            fontSize="small"
            color="secondary"
            onClick={editTimer}
          />

          <h3>{name}</h3>
        </div>
        {running ? (
          <>
            <p>
              {runningHours}:{runningMins}:{runningSeconds}
            </p>
            <Button
              size="small"
              aria-label="Add one minute to timer"
              id="add-minute-button"
              title="Add a minute"
              onClick={addAMinute}
            >
              +1 Minute
            </Button>
          </>
        ) : (
          <p>
            {submittedHours < 10 ? `0${submittedHours}` : submittedHours}:
            {submittedMins < 10 ? `0${submittedMins}` : submittedMins}:
            {submittedSeconds < 10 ? `0${submittedSeconds}` : submittedSeconds}
          </p>
        )}
        <div className="start-cancel-buttons">
          {!running && (
            <IconButton
              aria-label="Start timer"
              className="play-button"
              color="secondary"
              title="Start"
              onClick={startFromDisplay}
            >
              <PlayArrowIcon sx={{ fontSize: 60 }} />
            </IconButton>
          )}
          {running && !timerPause ? (
            <IconButton
              aria-label="Pause timer"
              className="play_pause"
              color="secondary"
              title="Pause"
              onClick={() => {
                pause();
                setTimerPause(true);
                setTimerFinished(false);
              }}
            >
              <PauseIcon sx={{ fontSize: 60 }} />
            </IconButton>
          ) : (
            running &&
            timerPause && (
              <IconButton
                aria-label="Resume timer"
                className="play-button play_pause"
                color="secondary"
                title="resume"
                onClick={() => {
                  resume();
                  setTimerPause(false);
                  setTimerFinished(true);
                }}
              >
                <PlayArrowIcon sx={{ fontSize: 60 }} />
              </IconButton>
            )
          )}
          {running ? (
            <Button
              size="small"
              className="cancel-button"
              aria-label="Cancel timer"
              variant="outlined"
              color="secondary"
              title="Cancel"
              onClick={handleReset}
            >
              Cancel
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <TimesUp
        open={showTimesUpModal}
        name={name}
        handleTimesUpClose={handleReset}
        handleRepeat={handleRepeat}
      />
    </>
  );
};

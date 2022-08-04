import React, { useState, useEffect, useRef } from "react";
import useCountDown from "react-countdown-hook";
import AlertAudio from "../../assets/2001_Alert.mp3";
import { TimesUp } from "../times-up/times-up";
import { Button, Input } from "@mui/material";

import "./timer.css";

export const Timer = ({
  deleteTimer,
  id,
  name,
  total,
  newTimer,
  timeFromModal,
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
  const [newTimeFromModal, setNewTimeFromModal] = useState(timeFromModal);

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

  // hours, minutes and seconds passed to the start() in submit handle in millsec.
  let [hour, setHour] = useState(0);
  let [minute, setMinute] = useState(0);
  let [second, setSecond] = useState(0);

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
    console.log(submittedHours, submittedMins, submittedSeconds);
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

  // Starts timer once time is set in new timer modal
  const startTimerFromModal = () => {
    start(newTimeFromModal);
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

  const saveTimerEdits = () => {
    setEditView(false);
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
      {" "}
      {/* start of Edit timer */}
      <div className={editView ? "timer" : "hide-timer"}>
        <Input
          type="text"
          name="name"
          value={timerName}
          onChange={(e) => {
            setTimerName(e.target.value);
          }}
        />
        <h3>{name}</h3>
        {running ? (
          <p>
            {runningHours}:{runningMins}:{runningSeconds}
            {/* {runningHours} Hours : {runningMins} Mins : {runningSeconds} Secs */}
          </p>
        ) : (
          <></>
        )}

        <form className="timer-form" onSubmit={handleSubmit}>
          <Input
            type="number"
            name="hours"
            value={submittedHours}
            onFocus={() => setSubmittedHours("")}
            onBlur={handleBlur}
            onChange={FormValidation}
          />
          <label htmlFor="hours">hours</label>

          <Input
            type="number"
            name="mins"
            value={submittedMins}
            onFocus={() => setSubmittedMins("")}
            onBlur={handleBlur}
            onChange={FormValidation}
          />
          <label htmlFor="hours">mins</label>

          <Input
            type="number"
            name="seconds"
            value={submittedSeconds}
            onFocus={() => setSubmittedSeconds("")}
            onBlur={handleBlur}
            onChange={FormValidation}
          />
          <label htmlFor="hours">secs</label>
        </form>
        <div className="error">{error}</div>

        <div className="buttons-container">
          <div className="start-cancel-buttons">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              title="Start"
              onClick={handleSubmit}
            >
              Start
            </Button>
            <Button
              variant="contained"
              color="secondary"
              title="Save"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
          {newTimer ? (
            <Button onClick={deleteTimer} value={id} aria-label="delete timer">
              Delete Timer
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* end of edit timer */}
      {/* start of face/display timer */}
      <div className={!editView ? "timer" : "hide-timer"}>
        <div className="buttons-container">
          <Button
            variant="contained"
            color="secondary"
            title="edit"
            onClick={editTimer}
          >
            edit timer
          </Button>
          <h3>{name}</h3>

          {running ? (
            <>
              <p>
                {runningHours}:{runningMins}:{runningSeconds}
              </p>
              <Button
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
              {submittedSeconds < 10
                ? `0${submittedSeconds}`
                : submittedSeconds}
            </p>
          )}
          <div className="start-cancel-buttons">
            {!running && (
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                title="Start"
                onClick={startFromDisplay}
              >
                Start
              </Button>
            )}
            {running && !timerPause ? (
              <Button
                variant="contained"
                color="secondary"
                title="Pause"
                onClick={() => {
                  pause();
                  setTimerPause(true);
                  setTimerFinished(false);
                }}
              >
                Pause
              </Button>
            ) : (
              running &&
              timerPause && (
                <Button
                  variant="contained"
                  color="secondary"
                  title="resume"
                  onClick={() => {
                    resume();
                    setTimerPause(false);
                    setTimerFinished(true);
                  }}
                >
                  Resume
                </Button>
              )
            )}
            {!running ? (
              <Button color="secondary">cancel</Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                title="Cancel"
                onClick={handleReset}
              >
                Cancel
              </Button>
            )}
          </div>
          {newTimer ? (
            <Button onClick={deleteTimer} value={id} aria-label="delete timer">
              Delete Timer
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

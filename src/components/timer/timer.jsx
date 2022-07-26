import React, { useState, useEffect } from "react";
import useCountDown from "react-countdown-hook";
import AlertAudio from "../../assets/2001_Alert.mp3";
import { TimesUp } from "../times-up/times-up";
import { Button, Input } from "@mui/material";

import "./timer.css";

export const Timer = ({ deleteTimer, id, name, newTimer, timeFromModal }) => {
  // useCountDown hook.
  let initialTime; // initial number. default 60000ms
  let interval; // how often hook is ran. default 1000ms
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(
    initialTime,
    interval
  );
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

  // display time initially submitted by user before time starts running.
  let [submittedHours, setSubmittedHours] = useState();
  let [submittedMins, setSubmittedMins] = useState();
  let [submittedSeconds, setSubmittedSeconds] = useState();

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

  // Real time validation hours entered is less than 24 and displays error message
  const handleHourChange = (e) => {
    setSubmittedHours(e.target.value);
    if (submittedHours >= 24) {
      setError("Hours must be under 24 for timer to start");
    } else {
      setHour(e.target.value * 60 * 60 * 1000), setError("");
    }
  };

  // Real time validation for minutes entered to be less than 59 and displays error message
  const handleMinsChange = (e) => {
    setSubmittedMins(e.target.value);
    if (submittedMins <= 59) {
      setMinute(e.target.value * 60 * 1000);
      setError("");
    } else {
      setError("Minutes must be under 60 for timer to start");
    }
  };

  // Real time validation for seconds entered to be less than 59 and displays error message
  const handleSecondsChange = (e) => {
    setSubmittedSeconds(e.target.value);

    if (submittedSeconds <= 59) {
      setSecond(e.target.value * 1000);
      setError("");
    } else {
      setError("Seconds must be under 60 for timer to start");
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

  // sets Running state to true and adds hour, minutes and seconds to total then submitted to start() in millsec.
  const handleSubmit = (e) => {
    e.preventDefault();
    let total = hour + minute + second;
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
      setRunning(true);
      start(total);
      setTimerFinished(true);
      setError("");
    }
  };

  // Starts timer once time is set in new timer modal
  const startTimerFromModal = () => {
    start(newTimeFromModal);
    setRunning(true);
    setTimerFinished(true);
    setError("");
  };

  // Closes Timer finish modals
  const handleTimesUpClose = () => {
    stopAudio(); //stops audio and sets to og
    setTimerFinished(false);
    setShowTimesUpModal(false);
  };

  // alerts user when timer finished
  const alertFinish = () => {
    if (timeLeft === 0 && timerFinished) {
      setShowTimesUpModal(true);
      startAudio(); // starts timer audio
    }
  };

  useEffect(() => {
    alertFinish();
    // checks if newTimerFromModal is true to run startTimerFromModal
    if (newTimeFromModal) {
      startTimerFromModal();
      setNewTimeFromModal(0);
    }
  });

  return (
    <div className="timer">
      <h3>{name}</h3>
      {running ? (
        <p>
          {runningHours} Hours : {runningMins}
          Mins : {runningSeconds} Secs
        </p>
      ) : (
        <p>
          {submittedHours < 10 ? `0${submittedHours}` : submittedHours} Hours :
          {submittedMins < 10 ? `0${submittedMins}` : submittedMins} Mins :
          {submittedSeconds < 10 ? `0${submittedSeconds}` : submittedSeconds}{" "}
          Secs
        </p>
      )}
      {!running && (
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          title="Start"
          onClick={handleSubmit}
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

      {!running ? (
        <form onSubmit={handleSubmit}>
          <Input
            type="number"
            name="hours"
            onChange={handleHourChange}
            onBlur={handleHourChange}
          />
          <div className="error">{error}</div>
          <Input
            type="number"
            name="mins"
            onChange={handleMinsChange}
            onBlur={handleMinsChange}
          />
          <Input
            type="number"
            name="seconds"
            onChange={handleSecondsChange}
            onBlur={handleSecondsChange}
          />
        </form>
      ) : (
        <div></div>
      )}
      {newTimer ? (
        <Button onClick={deleteTimer} value={id}>
          Delete Timer
        </Button>
      ) : (
        <></>
      )}
      <TimesUp
        open={showTimesUpModal}
        name={name}
        handleTimesUpClose={handleTimesUpClose}
      />
    </div>
  );
};

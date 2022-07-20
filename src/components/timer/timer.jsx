import React, { useState, useEffect } from "react";
import useCountDown from "react-countdown-hook";
import AlertAudio from "../../assets/2001_Alert.mp3";
import { TimesUp } from "../times-up/times-up";
import { Button } from "@mui/material";

import "./timer.css";

export const Timer = ({ deleteTimer, id, name, newTimer }) => {
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

  // display time initially submitted by user before time starts running.
  let [submittedHours, setSubmittedHours] = useState();
  let [submittedMins, setSubmittedMins] = useState();
  let [submittedSeconds, setSubmittedSeconds] = useState();

  // hours, minutes and seconds passed to the start() in submit handle in millsec.
  let [hour, setHour] = useState(0);
  let [minute, setMinute] = useState(0);
  let [second, setSecond] = useState(0);

  // Calculations for hour, minute and second for display on screen
  let hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (1000 * 60));
  let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  // Sets 0 in front of number less than 10 so always two digits.
  let runningHours = hours < 10 ? `0${hours}` : hours;
  let runningMins = minutes < 10 ? `0${minutes}` : minutes;
  let runningSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // sets audio state to audio file
  const [audioPlay, setAudioPlay] = useState(new Audio(AlertAudio));

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
    console.log(total);
    setRunning(true);
    start(total);
    setTimerFinished(true);
  };

  // resets hours, minutes and seconds along with running state.
  const handleReset = () => {
    setSubmittedHours(0);
    setSubmittedMins(0);
    setSubmittedSeconds(0);
    setRunning(false);
  };

  // Closes Timer finish modals
  const handleTimesUpClose = () => {
    stopAudio(); //stops audio and sets to og
    setTimerFinished(false);
    setShowTimesUpModal(false);
  };

  useEffect(() => {
    alertFinish();
  });
  // alerts user when timer finished
  const alertFinish = () => {
    if (timeLeft === 0 && timerFinished) {
      setShowTimesUpModal(true);
      startAudio(); // starts timer audio
    }
  };

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
      {running && timeLeft === 0 ? (
        <Button
          variant="contained"
          color="secondary"
          title="Reset"
          onClick={() => {
            reset();
            handleReset();
            setTimerFinished(false);
          }}
        >
          Reset
        </Button>
      ) : running ? (
        <Button
          variant="contained"
          color="secondary"
          title="Cancel"
          onClick={() => {
            reset();
            handleReset();
            setTimerFinished(false);
          }}
        >
          Cancel
        </Button>
      ) : (
        <Button variant="contained" color="secondary">
          cancel{" "}
        </Button>
      )}

      {!running ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="hours"
            onChange={(e) => {
              setSubmittedHours(e.target.value);
              setHour(e.target.value * 60 * 60 * 1000);
            }}
          />
          <input
            type="text"
            name="mins"
            onChange={(e) => {
              setSubmittedMins(e.target.value);
              setMinute(e.target.value * 60 * 1000);
            }}
          />
          <input
            type="text"
            name="seconds"
            onChange={(e) => {
              setSubmittedSeconds(e.target.value);
              setSecond(e.target.value * 1000);
            }}
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

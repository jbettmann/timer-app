import React, { useState } from "react";
import useCountDown from "react-countdown-hook";

export const Timer = () => {
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

  // display time initially submitted by user before time starts running.
  let [submittedHours, setSubmittedHours] = useState();
  let [submittedMins, setSubmittedMins] = useState();
  let [submittedSeconds, setSubmittedSeconds] = useState();

  // hours, minutes and seconds passed to the start() in submit handle in millsec.
  let [hour, setHour] = useState();
  let [minute, setMinute] = useState();
  let [second, setSecond] = useState();

  // Calculations for hour, minute and second for display on screen
  let hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (1000 * 60));
  let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  // Sets 0 in front of number less than 10 so always two digits.
  let runningHours = hours < 10 ? `0${hours}` : hours;
  let runningMins = minutes < 10 ? `0${minutes}` : minutes;
  let runningSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // sets Running state to true and adds hour, minutes and seconds to total then submitted to start() in millsec.
  const handleSubmit = (e) => {
    e.preventDefault();
    let total = hour + minute + second;
    console.log(total);
    setRunning(true);
    start(total);
  };

  // resets hours, minutes and seconds along with running state.
  const handleReset = () => {
    setSubmittedHours(0);
    setSubmittedMins(0);
    setSubmittedSeconds(0);
    setRunning(false);
  };

  // alerts user when timer finished
  const alertFinish = () => {
    alert("Finised!");
  };

  return (
    <div className="App">
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
        <button type="submit" title="Start" onClick={handleSubmit}>
          Start
        </button>
      )}
      {running && !timerPause ? (
        <button
          title="Pause"
          onClick={() => {
            pause();
            setTimerPause(true);
          }}
        >
          Pause
        </button>
      ) : (
        running &&
        timerPause && (
          <button
            title="resume"
            onClick={() => {
              resume();
              setTimerPause(false);
            }}
          >
            Resume
          </button>
        )
      )}
      {running && submittedHours ? (
        <button
          title="Cancel"
          onClick={() => {
            reset();
            handleReset();
          }}
        >
          Cancel
        </button>
      ) : (
        <button>cancel </button>
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
    </div>
  );
};

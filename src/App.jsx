import React, { useState, useEffect } from "react";
import useCountDown from "react-countdown-hook";

import "./App.css";

function App() {
  let [initialTime, setInitialTime] = useState();
  const [running, setRunning] = useState(false);
  let [displayHours, setDisplayHours] = useState();
  let [displayMins, setDisplayMins] = useState();
  let [displaySeconds, setDisplaySeconds] = useState();

  let [hour, setHour] = useState();
  let [minute, setMinute] = useState();
  let [second, setSecond] = useState();

  console.log("on first mount", initialTime);
  let interval;
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(
    initialTime,
    interval
  );
  console.log("on mounts", initialTime);

  let hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (1000 * 60));
  let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  let showHours = hours < 24 ? `0${hours}` : hours;
  let showMins = minutes < 10 ? `0${minutes}` : minutes;
  let showSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const handleSubmit = (e) => {
    e.preventDefault();
    let total = hour + minute + second;
    setInitialTime(total);
    setRunning(true);
    start(total);
  };

  return (
    <div className="App">
      {running ? (
        <p>
          {showHours} Hours : {showMins}
          Mins : {showSeconds} Secs
        </p>
      ) : (
        <p>
          {displayHours < 24 ? `0${displayHours}` : displayHours} Hours :
          {displayMins < 10 ? `0${displayMins}` : displayMins}
          Mins : {displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds}
          Secs
        </p>
      )}
      {!running ? (
        <button
          title="Start"
          onClick={() => {
            start(initialTime);
            setRunning((e) => !e);
          }}
        >
          Start
        </button>
      ) : (
        <button
          title="Stop"
          onClick={() => {
            pause();
            setRunning((e) => !e);
          }}
        >
          Stop
        </button>
      )}
      <button
        title="resume"
        onClick={() => {
          resume();
          setRunning(true);
        }}
      >
        Resume
      </button>
      <button
        title="Reset"
        onClick={() => {
          reset();
          setRunning(false);
        }}
      >
        Reset
      </button>
      {!initialTime && !running ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="hours"
            onChange={(e) => {
              setDisplayHours(
                e.target.value %
                  Math.floor((24 * 60 * 60 * 1000) / (1000 * 60 * 60))
              );
              setHour(e.target.value * 60 * 60 * 1000);
              console.log(hour);
            }}
          />
          <input
            type="text"
            name="mins"
            onChange={(e) => {
              setDisplayMins(e.target.value % Math.floor(60 * 60 * 1000)) /
                (1000 * 60);
              setMinute(e.target.value * 60 * 1000);
              console.log(minute);
            }}
          />
          <input
            type="text"
            name="seconds"
            onChange={(e) => {
              setDisplaySeconds(
                e.target.value % Math.floor((1000 * 60) / 1000)
              );
              setSecond(e.target.value * 1000);
              console.log(second);
            }}
          />
          <button type="submit">Start</button>
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;

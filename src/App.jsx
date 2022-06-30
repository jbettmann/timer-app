import React, { useState, useEffect } from "react";
import useCountDown from "react-countdown-hook";

import "./App.css";

function App() {
  const [initialTime, setInitialTime] = useState(0);
  console.log("on first mount", initialTime);
  let interval;
  let [time, setTime] = useState();
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(
    time,
    interval
  );
  console.log("on mounts", time);

  let hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (1000 * 60));
  let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  let displayHours = hours < 10 ? `0${hours}` : hours;
  let displayMins = minutes < 10 ? `0${minutes}` : minutes;
  let displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className="App">
      <p>
        {displayHours} Hours : {displayMins}
        Mins : {displaySeconds} Secs
      </p>
      <button title="Start" onClick={() => start()}>
        Start
      </button>
      <button title="Stop" onClick={() => pause()}>
        Stop
      </button>
      <button title="resume" onClick={() => resume()}>
        Resume
      </button>
      <button title="Reset" onClick={() => reset()}>
        Reset
      </button>

      <form>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="hours"
        />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default App;

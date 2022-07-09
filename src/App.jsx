import React, { useEffect, useState } from "react";

import "./App.css";
import { Timer } from "./components/timer/timer";
import { NewTimer } from "./components/timer/new-timer";

function App() {
  let [timers, setTimers] = useState([<Timer />, <Timer />, <Timer />]);

  const addNewTimer = () => {
    setTimers([...timers, <NewTimer deleteTimer={deleteTimer} />]);
    console.log(timers);
  };

  const deleteTimer = (e) => {
    console.log(value);
    setTimers(timers.filter((item) => item != value));
  };

  useEffect(() => {
    console.log(timers);
  });

  return (
    <div className="App">
      {timers.map((timer) => (
        <div>{timer}</div>
      ))}

      <button onClick={addNewTimer}>Add Timer</button>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";

import "./App.css";
import { Timer } from "./components/timer/timer";

function App() {
  let [timers, setTimers] = useState([<Timer />, <Timer />, <Timer />]);

  const addNewTimer = () => {
    setTimers([...timers, <Timer />]);
    console.log(timers);
  };

  return (
    <>
      {timers.map((timer) => (
        <div>{timer}</div>
      ))}

      <button onClick={addNewTimer}>Add Timer</button>
    </>
  );
}

export default App;

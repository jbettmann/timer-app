import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import "./App.css";
import { Timer } from "./components/timer/timer";
import { NewTimer } from "./components/timer/new-timer";

function App() {
  let [timers, setTimers] = useState([
    { id: nanoid(), name: "Mash-In" },
    { id: nanoid(), name: "Rest" },
    { id: nanoid(), name: "Boil" },
  ]);
  // let [newTimers, setNewTimers] = useState([]);

  const addNewTimer = () => {
    setTimers([...timers, { id: nanoid(), name: "", newTimer: true }]);
  };

  const deleteTimer = (e) => {
    let id = e.target.value;
    setTimers(timers.filter((item) => item.id != id));
  };

  useEffect(() => {
    console.log(timers);
  });

  return (
    <div className="App">
      {timers.map((timer) => (
        <Timer
          key={timer.id}
          id={timer.id}
          name={timer.name}
          newTimer={timer.newTimer}
          deleteTimer={deleteTimer}
        />
      ))}

      <button onClick={addNewTimer}>Add Timer</button>
    </div>
  );
}

export default App;

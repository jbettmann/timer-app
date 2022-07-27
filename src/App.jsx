import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import "./App.css";
import { Timer } from "./components/timer/timer";
import { NewTimerModal } from "./components/new-timer-modal/new-timer-modal";

function App() {
  let [timers, setTimers] = useState([
    { id: nanoid(), name: "Mash-In" },
    { id: nanoid(), name: "Rest" },
    { id: nanoid(), name: "Boil" },
  ]);

  // sets state of modal for new timer. Default is to not show
  const [open, setOpen] = useState(false);

  // Opens new timer modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Closes modal
  const handleClose = () => {
    setOpen(false);
  };
  // Adds new time to timer array and sets name and total time added
  const addNewTimer = (timerName, total) => {
    setTimers([
      ...timers,
      { id: nanoid(), name: timerName, newTimer: true, total: total },
    ]);
  };

  const deleteTimer = (e) => {
    let id = e.target.value;
    setTimers(timers.filter((item) => item.id != id));
  };

  useEffect(() => {
    console.log(timers);
  }, []);

  return (
    <div className="App">
      {timers.map((timer) => (
        <Timer
          key={timer.id}
          id={timer.id}
          name={timer.name}
          newTimer={timer.newTimer}
          timeFromModal={timer.total}
          deleteTimer={deleteTimer}
        />
      ))}
      <button onClick={handleClickOpen}>Add Timer</button>
      <NewTimerModal
        open={open}
        handleClose={handleClose}
        addNewTimer={addNewTimer}
      />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import "./App.css";
import { Timer } from "./components/timer/timer";
import { NewTimerModal } from "./components/new-timer-modal/new-timer-modal";
import { SearchTimers } from "./components/search-timers/search-timers";

function App() {
  // Gets timer state from localStorage
  let [timers, setTimers] = useState([
    { id: nanoid(), name: "Mash-In", total: 18000000 },
    { id: nanoid(), name: "Vorlauf", total: 90000 },
    { id: nanoid(), name: "Boil", total: 36000000 },
  ]);

  const [totalTime, setTotalTime] = useState(0);

  // sets state of modal for new timer. Default is to not show
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  // Save timers to localStorage
  const saveTimerToStorage = (timerItem) => {
    setTimers(timerItem);
    localStorage.setItem("timers", JSON.stringify(timerItem));
  };

  // Adds new time to timer array and sets name and total time added
  const addNewTimer = (timerName, total) => {
    const newTimerAdded = {
      id: nanoid(),
      name: timerName,
      newTimer: true,
      total: total,
    };
    setTotalTime(total);
    const newTimerList = [...timers, newTimerAdded];
    saveTimerToStorage(newTimerList);
  };

  const deleteTimer = (e) => {
    let id = e.target.value;
    const timerList = timers.filter((item) => item.id != id);
    saveTimerToStorage(timerList);
  };

  // Opens new timer modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Closes modal
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    //checks if any timers are in localStorage and if so, gets them.
    const items = JSON.parse(localStorage.getItem("timers"));
    if (items) {
      setTimers(items);
    }
  }, []);

  return (
    <div className="App">
      {/* <SearchTimers search={search} setSearch={setSearch} /> */}
      {timers.map((timer) => (
        <Timer
          key={timer.id}
          id={timer.id}
          name={timer.name}
          newTimer={timer.newTimer}
          timeFromModal={totalTime}
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

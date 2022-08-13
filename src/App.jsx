import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import "./App.css";
import { Timer } from "./components/timer/timer";
import { NewTimerModal } from "./components/new-timer-modal/new-timer-modal";
import { SearchTimers } from "./components/search-timers/search-timers";
import { Button } from "@mui/material";

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

  // Filters timers when search input changes
  let filteredTimers = timers;

  if (search !== "") {
    let regex = new RegExp(search, "gi");
    filteredTimers = timers.filter((timer) => {
      return timer.name.match(regex);
    });
  }

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

  // saves changes to timers
  const changeTimer = (id, total, name) => {
    // get timers from localStorage
    let data = JSON.parse(localStorage.getItem("timers"));
    // check if timer excites
    let newTimer = data.find((timer) => timer.id === id);
    // if new timer does excites...
    if (newTimer) {
      //and the name parm is present, change name of timer
      if (name) {
        newTimer.name = name;
      }
      // if total parm is present, change total
      if (total) {
        newTimer.total = total;
      }
    } else {
      data.push({
        id,
        total,
        name,
      });
    }
    console.log(data);
    saveTimerToStorage(data);
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
    //checks if any timers are in localStorage and if so, gets them and if not, set them.
    const items = JSON.parse(localStorage.getItem("timers"));
    if (items) {
      setTimers(items);
    } else {
      localStorage.setItem("timers", JSON.stringify(timers));
    }
  }, []);

  return (
    <div className="App">
      <SearchTimers search={search} setSearch={setSearch} />
      {filteredTimers.map((timer) => (
        <div key={timer.id} className="timers">
          <Timer
            id={timer.id}
            name={timer.name}
            total={timer.total}
            newTimer={timer.newTimer}
            timeFromModal={totalTime}
            deleteTimer={deleteTimer}
            changeTimer={changeTimer}
          />
        </div>
      ))}

      <Button onClick={handleClickOpen}>Add Timer</Button>
      <NewTimerModal
        open={open}
        handleClose={handleClose}
        addNewTimer={addNewTimer}
      />
    </div>
  );
}

export default App;

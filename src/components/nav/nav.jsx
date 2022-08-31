import React from "react";
import { SearchTimers } from "../search-timers/search-timers";
import { IconButton } from "@mui/material";
import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import "./nav.css";

export default function Nav({ search, setSearch, handleClickOpen }) {
  return (
    <div className="nav">
      <h1>Timer++</h1>
      <div className="search-add">
        <SearchTimers search={search} setSearch={setSearch} />

        <IconButton onClick={handleClickOpen} id="add-timer__button">
          <AddAlarmIcon color="secondary" />
        </IconButton>
      </div>
    </div>
  );
}

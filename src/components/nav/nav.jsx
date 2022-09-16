import React, { useState } from "react";
import { SearchTimers } from "../search-timers/search-timers";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import "./nav.css";

export default function Nav({ search, setSearch, handleClickOpen }) {
  const [searchBar, setSearchBar] = useState(false);

  return (
    <div className="nav">
      <h1>Timer++</h1>
      <div
        onClick={() => setSearchBar(true)}
        onBlur={() => setSearchBar(false)}
        className="search-add"
      >
        {searchBar ? (
          <SearchTimers
            search={search}
            setSearch={setSearch}
            searchBar={searchBar}
          />
        ) : (
          <SearchIcon />
        )}
      </div>
    </div>
  );
}

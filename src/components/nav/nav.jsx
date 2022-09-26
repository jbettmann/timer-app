import React, { useState } from "react";
import { SearchTimers } from "../search-timers/search-timers";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import "./nav.css";

export default function Nav({ search, setSearch, handleClickOpen }) {
  const [searchBar, setSearchBar] = useState(false);

  return (
    <div className="nav">
      {/* <IconButton
        color="inherit"
        className="menu-icon"
        aria-label="open drawer"
      >
        <MenuIcon />
      </IconButton> */}

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
          <IconButton>
            <SearchIcon sx={{ color: "#fff" }} />
          </IconButton>
        )}
      </div>
    </div>
  );
}

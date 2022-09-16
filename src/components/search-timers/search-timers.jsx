import React from "react";
import "./search-timers.css";
import SearchIcon from "@mui/icons-material/Search";

export const SearchTimers = ({ search, setSearch, searchBar }) => {
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      {/* <SearchIcon className="search-icon" /> */}
      <label htmlFor="search" className="search-label"></label>
      <input
        className={searchBar ? "search focus" : "search"}
        type="search"
        role="searchbox"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </form>
  );
};

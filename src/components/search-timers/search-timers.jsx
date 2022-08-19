import React from "react";
import "./search-timers.css";

export const SearchTimers = ({ search, setSearch }) => {
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search" className="search-label"></label>
      <input
        className="search"
        type="search"
        role="searchbox"
        placeholder="Search timers"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </form>
  );
};

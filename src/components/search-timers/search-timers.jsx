import React from "react";

export const SearchTimers = ({ search, setSearch }) => {
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="text"
        role="searchbox"
        placeholder="Search timers"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

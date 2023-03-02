import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";

const Search = ({ value, onChange, children }) => (
  <div>
    <label htmlFor="search">{children}</label>
    <input id="search" type="text" value={value} onChange={onChange} placeholder="enter search query"/>
  </div>
);

const App = () => {
  const [search, setSearch] = useState("");

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <div>
      <img src="" alt="search icon" />
      <Search value={search} onChange={handleChange}>
        SEARCH:
      </Search>
      <p>Searches for {search ? search : "..."}</p>
    </div>
  );
};

export default App;

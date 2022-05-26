import React from "react";
import { Link } from "react-router-dom";
import FilterBy from "../FilterBy";
import SearchBar from "../SearchBar";
export default function NavBar() {
  return (
    <div>
      <Link to="/">
        <button className="button">Home</button>
      </Link>
      <Link to="/contact">
        <button className="button">Contact</button>
      </Link>
      <FilterBy />
      <SearchBar />
    </div>
  );
}

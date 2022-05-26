import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
export default function NavBar() {
  return (
    <div>
      <Link to="/">
        <button>Home</button>
      </Link>
      <SearchBar />
    </div>
  );
}

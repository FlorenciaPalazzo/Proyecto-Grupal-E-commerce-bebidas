import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductByName } from "../../redux/actions";
import "./SearchStyles.css"

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getProductByName(name));
    setName("");
  };

  return (
    <div className="searchbar-main">
      <input
      className="input"
        type="text"
        placeholder="Search product..."
        onChange={handleInputChange}
        value={name}
      />
      <button className="button" onClick={handleSubmit} type="submit">
        Search
      </button>
    </div>
  );
}

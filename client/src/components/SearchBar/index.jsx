import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductByName } from "../../redux/actions";

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
    <div>
      <input
        type="text"
        placeholder="Search product..."
        onChange={handleInputChange}
        value={name}
      />
      <button onClick={handleSubmit} type="submit">
        Search
      </button>
    </div>
  );
}

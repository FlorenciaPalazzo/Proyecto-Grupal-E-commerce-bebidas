import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../fb";
import { resetUser } from "../../redux/actions";
import FilterBy from "../FilterBy";
import SearchBar from "../SearchBar";
import "./NavStyles.css"
export default function NavBar({ setCurrentPage }) {
  const isLoged = useSelector((state) => state.isLoged);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function out() {
    signOut(auth)
      .then(() => {
        console.log("logout");
        //dispatch(setLoading(true))
        dispatch(resetUser());
        //dispatch(setLoading(false))
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }

  return (
    <div className="nav-main">
      {isLoged ? (
        <div className="nav-links">
          <Link to="/">
        <button className="button">Landing</button>
      </Link>
      <Link to="/contact">
        <button className="button">Contact</button>
      </Link>
      <Link to="/cart">
        <button className="button-cart">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" />
          </svg>
        </button>
      </Link>
          <button className="button" onClick={out}>Logout</button>
          <button className="button" onClick={() => navigate("/profile")}>Profile</button>
          
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/">
        <button className="button">Landing</button>
      </Link>
      <Link to="/contact">
        <button className="button">Contact</button>
      </Link>
       <Link to="/cart">
        <button className="button-cart">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" />
          </svg>
        </button>
      </Link>  
          <button className="button" onClick={() => navigate("/login")}>Login</button>
          <button className="button" onClick={() => navigate("/register")}>Sign up</button>
         
        </div>
      )}
      <div className="div-searchbar">
        <SearchBar />
        </div>
        <div className="div-filter">
        <FilterBy setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

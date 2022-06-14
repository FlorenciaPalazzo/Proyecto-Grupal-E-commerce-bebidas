import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../fb";
import { resetUser } from "../../redux/actions";
import FilterBy from "../FilterBy";
import SearchBar from "../SearchBar";
// import "./NavStyles.css";
import swal from "sweetalert";
export default function NavBarSec({ setCurrentPage }) {
  const isLoged = useSelector((state) => state.isLoged);
  const usuarioActual = useSelector((state) => state.currentUser);
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
    <nav class="navbar  navbar-expand-lg bg-dark position-relative ">
      {isLoged ? (
        <div class="container-fluid">
          <Link to="/">
            <div>
              <button type="button" class="btn btn-outline-dark  bg-dark ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="white"
                  class="bi bi-house"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                  />
                </svg>
              </button>
            </div>
          </Link>
        </div>
      ) : (
        <div class="container-fluid">
          <Link to="/">
            <div>
              <button type="button" class="btn btn-outline-dark  bg-dark ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="white"
                  class="bi bi-house"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                  />
                </svg>
              </button>
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
}

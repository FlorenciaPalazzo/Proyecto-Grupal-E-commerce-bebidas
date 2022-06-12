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
export default function NavBar({ setCurrentPage }) {
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
          <button
            class="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="white"
                class="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </span>
          </button>

          <Link to="/">
            <button>
              <img src="./images/Logo-Letras.jpg" height="50px" />
            </button>
          </Link>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle text-white bg-dark"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mi Cuenta
                </a>

                <ul
                  class="dropdown-menu text-white bg-dark"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link
                      to="/profile"
                      class="dropdown-item text-white bg-dark"
                    >
                      Mi Perfil
                    </Link>
                  </li>

                  <li>
                    {" "}
                    <Link
                      to={`/favoritos/${usuarioActual.uid}`}
                      class="dropdown-item text-white bg-dark"
                    >
                      Favoritos
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={`/historial/${usuarioActual.uid}`}
                      class="dropdown-item text-white bg-dark"
                    >
                      Historial
                    </Link>
                  </li>

                  <li>
                    <hr class="dropdown-divider color-white" />
                  </li>

                  <li>
                    <a onClick={out} class="dropdown-item text-white bg-dark">
                      Salir
                    </a>
                  </li>
                </ul>
              </li>

              <Link to="/cart">
                <button type="button" class="btn btn-outline-dark  bg-dark ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="white"
                    class="bi bi-cart2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                  </svg>
                </button>
              </Link>
            </ul>
          </div>
        </div>
      ) : (
        <div class="container-fluid">
          <Link to="/">
            <button>
              <img src="./images/Logo-Letras.jpg" height="50px" />
            </button>
          </Link>
          <Link to="/login">
            <button
              type="button "
              class="btn btn-outline-warning   bg-dark text-light"
            >
              Iniciar Sesión
            </button>
          </Link>

          <Link to="/register">
            <button
              type="button"
              class="btn btn-outline-warning  bg-dark text-light"
            >
              Registrarse
            </button>
          </Link>

          <Link to="/cart">
            <button type="button" class="btn btn-outline-dark  bg-dark ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="white"
                class="bi bi-cart2"
                viewBox="0 0 16 16"
              >
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
              </svg>
            </button>
          </Link>
        </div>
      )}

      <div class="mx-3">
        <SearchBar setCurrentPage={setCurrentPage} />
      </div>
    </nav>
  );
}

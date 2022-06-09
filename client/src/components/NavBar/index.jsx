import { signOut } from "firebase/auth";
import React from "react";
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
let idPrueba="50"
  return (
      
<nav class="navbar navbar-expand-lg bg-light">
{/* {isLoged ? ( */}
  <div class="container-fluid">

    {/* <a class="navbar-brand" href="#">Navbar</a> */}
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        {/* <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li> */}
        {/* <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li> */}

        <li class="nav-item dropdown">

          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Mi Cuenta
          </a>

          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link to="/profile" class="dropdown-item">Mi Perfil</Link></li>

            <li> <Link to={`/favoritos/${usuarioActual.uid}`} class="dropdown-item">Favoritos</Link></li>
           
            <li><Link to={`/historial/${usuarioActual.uid}`}class="dropdown-item">Historial</Link></li>

            <li><hr class="dropdown-divider"/></li>
             <li><a onClick={out} class="dropdown-item">Salir</a></li>
          </ul>
        </li>
      </ul>

      <Link to="/cart"><button type="button" class="btn btn-outline-dark"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
</svg></button></Link>

{/* ):(<h1>Esperando info</h1>)} */}

    <SearchBar  setCurrentPage={setCurrentPage}/>     
    </div>
  </div>



      </nav>

  );
}





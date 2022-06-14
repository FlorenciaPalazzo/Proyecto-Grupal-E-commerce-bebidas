import React from "react";
import { Link } from "react-router-dom";

export default function Nav({ setCurrentPage }) {
    return(
    <nav class="navbar  navbar-expand-lg bg-dark position-relative ">
         <Link to="/" >
               
              <img src="/images/Logo-Letras.jpg"width="50%" />
              </Link>
    </nav>)
}
import React from "react";
import { Link } from "react-router-dom";
import "./MissingRouteStyles.css"


export default function MissingRoute(){

return(
    <div className="notFoundImage">
        <div className="goHome">
    <Link to="/">
            <button class="btn btn-dark">
            Volver al home
          </button>
        </Link>
        </div>
    </div>

)}
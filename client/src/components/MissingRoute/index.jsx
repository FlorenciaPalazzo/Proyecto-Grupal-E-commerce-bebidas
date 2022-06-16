import React from "react";
import { Link } from "react-router-dom";
import "./MissingRouteStyles.css";

console.log(
  "Usted ha entrado a una ruta que no existe en este proyecto, por error descubrio la guarida del hombre lombriz. (se llama J*** An******)"
);
export default function MissingRoute() {
  return (
    <div className="notFoundImage">
      <div className="goHome">
        <Link to="/">
          <button class="btn btn-dark">Volver al home</button>
        </Link>
      </div>
    </div>
  );
}

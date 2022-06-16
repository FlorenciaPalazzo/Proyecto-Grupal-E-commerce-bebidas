import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import "./MissingRouteStyles.css";

console.log(
  "Usted ha entrado a una ruta que no existe en este proyecto, por error descubrio la guarida del hombre lombriz. (se llama J*** An******)"
);
export default function MissingRoute() {
  const isAdmin = useSelector((state) => state.isAdmin);
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <div className="notFoundImage">
      {isLoading /* revisen esto!! */ ? (
        <Loading />
      ) : (
        <div className="goHome">
          <Link to={isAdmin ? "/admin" : "/"}>
            <button class="btn btn-dark">Volver al home</button>
          </Link>
        </div>
      )}
    </div>
  );
}

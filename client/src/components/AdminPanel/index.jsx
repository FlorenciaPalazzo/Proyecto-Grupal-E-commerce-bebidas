import { signOut } from "firebase/auth";
import { push } from "firebase/database";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../fb";
import { getUserDb, getUsersLoged, resetUser } from "../../redux/actions";
import ViewUsers from "../ViewUsers";

export default function AdminPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usersLoged = useSelector((state) => state.usersLoged);

  function out() {
    signOut(auth)
      .then(() => {
        console.log("logout");
        //dispatch(setLoading(true))
        dispatch(resetUser());
        //dispatch(setLoading(false))
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }

  useEffect(() => {
    dispatch(getUsersLoged());
  }, [dispatch]);

  return (
    <div>
      <button className="button" onClick={out}>
        Logout
      </button>
      <h1>Hola, este es el panel de administrador</h1>
      <div>
        <h3>Usuarios</h3>
        <ViewUsers />
      </div>
      <div>
        <Link to="/adminreview">
          <button>Ver las reviews de los usuarios</button>
        </Link>
      </div>
    </div>
  );
}

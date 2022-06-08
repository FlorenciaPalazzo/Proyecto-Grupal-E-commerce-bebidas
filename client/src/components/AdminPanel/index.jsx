import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../fb";
import { resetUser } from "../../redux/actions";
import ViewUsers from "../ViewUsers";

export default function AdminPanel() {
const dispatch = useDispatch()
const navigate = useNavigate()

function out() {
    signOut(auth)
      .then(() => {
        console.log("logout");
        //dispatch(setLoading(true))
        dispatch(resetUser());
        //dispatch(setLoading(false))
        navigate("/")
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }

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
    </div>
  );
}

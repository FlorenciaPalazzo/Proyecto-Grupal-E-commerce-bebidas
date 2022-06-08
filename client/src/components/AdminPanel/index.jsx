import { signOut } from "firebase/auth";
import { push } from "firebase/database";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../fb";
import {
  getAllReviews,
  getUserDb,
  getUsersLoged,
  resetUser,
} from "../../redux/actions";
import { ReviewCar } from "../Review/ReviewCar";
import ViewUsers from "../ViewUsers";

export default function AdminPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let revs = useSelector((state) => state.allReviews);
  const usersLoged = useSelector((state) => state.usersLoged);
  console.log("userisLoged", usersLoged);
  console.log("REVSS", revs);

  //tiene el id del usuario
  let array = [];
  revs.forEach((e) => {
    usersLoged.forEach((r) => {
      if (r.id === e.usuarioId) {
        array.push(r);
        console.log("SOY EL ARRAY--->", array);
      }
    });
  });

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
    dispatch(getAllReviews());
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
        <h1>Reviews</h1>
        {revs?.map((r) => {
          let otroArray;
          array.find((e) => {
            if (e.id === r.usuarioId) {
              otroArray = e.email;
              console.log("otroArray", otroArray);
            }
          });

          return (
            <div key={r.id} value={r.id}>
              <ReviewCar
                titulo={r.titulo}
                comentario={r.comentario}
                puntaje={r.puntaje}
                producto={r.productoId}
                fecha={r.createdAt}
                emailUsuario={otroArray}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

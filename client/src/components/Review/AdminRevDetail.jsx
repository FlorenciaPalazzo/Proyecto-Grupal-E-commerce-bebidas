import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearState, getReview, getUsersLoged } from "../../redux/actions";
import ReactStars from "react-rating-stars-component";
import { ReviewCar } from "./ReviewCar";

export const AdminRevDetail = (/* { id } */) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const rev = useSelector((state) => state.review);
  const usersLoged = useSelector((state) => state.usersLoged);

  let filtroId = [];
  rev.forEach((e) => {
    usersLoged.forEach((r) => {
      if (r.id === e.usuarioId) {
        filtroId.push(r);
      }
    });
  });
  console.log(rev);
  let puntaje = rev.map((e) => e.puntaje);
  let prom = puntaje.reduce((a, b) => {
    return a + b;
  }, 0);
  prom = prom / puntaje.length;
  prom = Math.round(prom);
  console.log(prom);

  useEffect(() => {
    dispatch(getUsersLoged());
    dispatch(getReview(id));
    return () => {
      dispatch(clearState());
    };
  }, [dispatch, id]);
  return (
    <div>
      <div>
        <h2>Promedio del producto:</h2>
        {prom ? (
          <ReactStars
            count={prom}
            size={35}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            edit={false}
            color="#ffd700"
          />
        ) : null}
      </div>

      <div>
        {rev?.map((r) => {
          let email;
          filtroId.find((e) => {
            if (e.id === r.usuarioId) {
              email = e.email;
              console.log("email", email);
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
                emailUsuario={email}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllReviews, getReviewByUser } from "../../redux/actions";
import { ReviewCar } from "./ReviewCar";

export const AdminEmailUser = () => {
  const { id } = useParams();
  /*  console.log(id); */
  const dispatch = useDispatch();
  const allRevs = useSelector((state) => state.allReviews);
  console.log("allRevs", allRevs);

  let idsFiltereds = allRevs.map((e) => {
    if (e.id === id) {
      idsFiltereds.push(e);
    }
  });
  /* console.log(idsFiltereds); */
  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);
  useEffect(() => {
    if (allRevs.length) {
      dispatch(getReviewByUser(id));
    }
  }, [dispatch]);

  return (
    <div>
      {/* {idsFiltereds && idsFiltereds.map(e => {
             <ReviewCar
             titulo={r.titulo}
             comentario={r.comentario}
             puntaje={r.puntaje}
             producto={r.productoId}
             fecha={r.createdAt}
             emailUsuario={otroArray}
             usuarioId={r.usuarioId}
           />
        })} */}
    </div>
  );
};

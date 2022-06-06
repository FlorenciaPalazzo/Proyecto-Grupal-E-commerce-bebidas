import React from "react";
import ReactStars from "react-rating-stars-component";

export const ReviewCar = ({ titulo, comentario, puntaje, nombre, imagen, createdAt }) => {
  return (
    <div>
      <div>
        <h4>{nombre}</h4>
        <h4>{imagen}</h4>
        <h4>Fecha: {createdAt}</h4>
      </div>
      <p>Titulo: {titulo}</p>
      <p>Comentario: {comentario}</p>
      Puntaje:{" "}
      <ReactStars
        count={puntaje}
        size={24}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        edit={false}
        color="#ffd700"
      />
    </div>
  );
};

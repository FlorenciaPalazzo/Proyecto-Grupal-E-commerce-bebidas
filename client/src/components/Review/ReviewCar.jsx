import React from "react";
import ReactStars from "react-rating-stars-component";

export const ReviewCar = ({ titulo, comentario, puntaje }) => {
  return (
    <div>
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

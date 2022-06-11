import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { getProducts , deleteReview, isAdmin } from "../../redux/actions";
import { Link } from "react-router-dom";
import swal from "sweetalert";
export const ReviewCar = ({
  titulo,
  comentario,
  puntaje,
  producto,
  fecha,
  emailUsuario,
  usuarioId,
  id
}) => {

  const dispatch = useDispatch();
  const prod = useSelector((state) => state.products);
  let [bool, setBool] = useState(false);
  const filt = prod.find((e) => e.id === producto);
  const admin = useSelector((state) => state.isAdmin)

  const handleDelete = (e) => {
    e.preventDefault();
    swal({
      title : "¿Seguro que quieres borrar esta review?",
      text : "Le notificaremos al usuario que infrigió las normas de la página",
      type : "warning",
      buttons : {
        cancel : "Cancelar",
        cofirm : {
          text : "Borrar review",
          value : "confirm"
        },
      },
    }).then((value) => {
      if(value === "confirm"){ 
      dispatch(deleteReview(id));
      setBool(!bool)}
      // window.location.reload
    }) 
    .catch((err) => {
      console.log(err)
    })
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [bool]);
  return (
    <div>
      <div>
        {filt ? (
          <div>
            <h4>{filt.nombre}</h4>
            <img width="10%" src={filt.imagen} alt="" />
            <h4>Fecha: {fecha.split("T")[0]}</h4>
          </div>
        ) : (
          <div>
            <h3>Review de la página</h3>
            <img width="10%" src="./logo/logo.png" alt="" />
            <h4>Fecha: {fecha.split("T")[0]}</h4>
          </div>
        )}
      </div>
      {emailUsuario ? (
        <Link to={`/adminemail/${usuarioId}`}>
          <p>Email del usuario: {emailUsuario}</p>
        </Link>
      ) : null}
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
      {
        admin ? 
        <button onClick={handleDelete} value={usuarioId}>
        ❌
      </button>
      : null
      }
      
    </div>
  );
};

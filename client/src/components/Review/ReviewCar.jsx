import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteReview, isAdmin } from "../../redux/actions";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import "./ReviewCar.css";
import AdminPanel from "../AdminPanel";
import Loading from "../Loading";
export const ReviewCar = ({
  titulo,
  comentario,
  puntaje,
  producto,
  fecha,
  emailUsuario,
  usuarioId,
  id,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.isLoading);
  const prod = useSelector((state) => state.products);
  let [bool, setBool] = useState(false);
  const filt = prod.find((e) => e.id === producto);
  const admin = useSelector((state) => state.isAdmin);
  console.log(admin, "EL ADMIN");

  const handleDelete = (e) => {
    e.preventDefault();
    swal({
      title: "¿Seguro que quieres borrar esta review?",
      text: "Le notificaremos al usuario que infrigió las normas de la página",
      type: "warning",
      buttons: {
        cancel: "Cancelar",
        cofirm: {
          text: "Borrar review",
          value: "confirm",
        },
      },
    })
      .then((value) => {
        if (value === "confirm") {
          dispatch(deleteReview(id));
          setBool(!bool);
        }
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [bool, admin]);
  return (
    <div className="reviewCar-body">
      <AdminPanel />
      {loading ? (
        <Loading />
      ) : (
        <div className="reviewCar-contenedor">
          <div>
            {admin ? (
              <div className="reviewCar-x">
                <button onClick={handleDelete} value={usuarioId}>
                  ❌
                </button>
              </div>
            ) : null}
            {filt ? (
              
              <div>
                <div className="reviewCar-items">
                  <h4>{filt.nombre}</h4>
                </div>
                <div className="reviewCar-items">
                  {" "}
                  <img width="50%" src={filt.imagen} alt="" />
                </div>
                <div className="reviewCar-items">
                  <h4>{fecha.split("T")[0]}</h4>
                </div>
              </div>
            ) : (
              <div>
                <div className="reviewCar-items">
                  <h3>Review de la página</h3>
                </div>
                <div className="reviewCar-items">
                  <img width="20%" src="./logo/logo.png" alt="" />
                </div>
                <div className="reviewCar-items">
                  <h4>{fecha.split("T")[0]}</h4>
                </div>
              </div>
            )}
          </div>
          <div>
            {emailUsuario ? (
              <Link to={`/adminemail/${usuarioId}`}>
                <p>Email del usuario: {emailUsuario}</p>
              </Link>
            ) : null}

            <div className="reviewCar-items">
              <p>Titulo: {titulo}</p>
            </div>
            <div className="reviewCar-items">
              <p>Comentario: {comentario}</p>
            </div>
            <div className="reviewCar-star">
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
          </div>
        </div>
      )}
    </div>
  );
};

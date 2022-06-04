import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductById, getReview } from "../../redux/actions";
import "./DetailStyles.css";
import ReactStars from "react-rating-stars-component";
import swal from "sweetalert";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const verified = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const isLoged = useSelector((state) => state.isLoged);
  const product = useSelector((state) => state.detail);
  const rev = useSelector((state) => state.review);
  console.log(rev, "SOY EL REV");
  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getReview(id));
  }, [dispatch, id]);

  const handleAlertReview = (e) => {
    e.preventDefault();
    swal({
      title: "Debes ingresar con tu usuario",
      text: "...para dejar una reseña ⭐⭐⭐!",
      buttons: {
        cancel: "Ahorita no joven",
        register: {
          text: "Registrarse",
          value: "register",
        },
        login: {
          text: "Iniciar sesion",
          value: "login",
        },
      },
      icon: "warning",
    }).then((value) => {
      if (value === "register") {
        navigate("/register");
      }

      if (value === "login") {
        navigate("/login");
      }
    });
  };

  return (
    <div className="detail-background">
      <Link to="/home">
        <button className="button">Back</button>
      </Link>
      {product ? (
        <div className="detail-content">
          <div className="detail-compra">
            <h1 className="detail-name">{product.nombre}</h1>
            <h1 className="detail-title">Price: $ {product.precio}</h1>
            <button className="button-shop">Añadir al carrito</button>
          </div>
          <div className="image-div">
            <img className="detail-image" src={product.imagen} alt="" />
          </div>

          <div className="detail-description">
            <div className="detail-left">
              <p className="detail-title">Brand: {product.marca}</p>
              <p className="detail-title">Size: {product.ml} ml</p>
              <p className="detail-title">
                Alcohol content: {product.graduacion} %
              </p>
            </div>
            <div className="detail-right">
              <p
                className="detail-title"
                dangerouslySetInnerHTML={{ __html: product.descripcion }}
              />
            </div>
          </div>
          <div className="review-detail">
            {rev.length ? (
              rev.map((e) => {
                return (
                  <div className="review-body">
                    <p>Titulo: {e.titulo}</p>
                    <p>Comentario: {e.comentario}</p>
                    <p>
                      Puntaje:{" "}
                      <ReactStars
                        count={e.puntaje}
                        size={24}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        edit={false}
                        color="#ffd700"
                      />
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="review-body">no hay reviews</div>
            )}
          </div>
          {isLoged ? (
            <Link to={`/Review/${id}`}>
              <button className="button">Contanos tu experiencia</button>
            </Link>
          ) : (
            <button onClick={handleAlertReview} className="button">
              Contanos tu experiencia
            </button>
          )}
        </div>
      ) : (
        console.log("No hay nada acá")
      )}
    </div>
  );
}

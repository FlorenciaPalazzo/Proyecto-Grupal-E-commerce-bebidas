import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addCart,
  clearState,
  getProductById,
  getReview,
  getProducts,
} from "../../redux/actions";
import "./DetailStyles.css";
import ReactStars from "react-rating-stars-component";
import swal from "sweetalert";
import Card from "../Card";
import NavBar from "../NavBar";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const verified = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const isLoged = useSelector((state) => state.isLoged);
  const product = useSelector((state) => state.detail);
  const rev = useSelector((state) => state.review);
  const products = useSelector((state) => state.products);
  console.log(rev, "SOY EL REV");
  let cart = product;
  const handleCart = (e) => {
    e.preventDefault();
    let cart = product;
    cart.quantity = 1;
    swal({
      title: "Producto agregado al carrito ",
      type: "success",
      icon: "success",
      buttons: false,
      timer: 800,
    });
    dispatch(addCart(cart));
  };
  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getReview(id));
    dispatch(getProducts());
    return () => {
      //componen did unmount
      dispatch(clearState()); // limpio el state de details
    };
  }, [dispatch, id]);

  const handleAlertReview = (e) => {
    e.preventDefault();
    swal({
      title: "Debes ingresar con tu usuario",
      text: "...para dejar una reseña ⭐⭐⭐!",
      buttons: {
        cancel: "Seguir navegando",
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
  const filterRelacionados = products.filter((e) => e.tipo === product.tipo);
  return (
    <div className="detail-background">
      <Link to="/">
        <img className="details-logo" src="/logo/logo.png" alt="logo" />
      </Link>
      {product ? (
        <div className="detail-content">
          <div className="detail-compra">
            <h1 className="detail-name">{product.nombre}</h1>
            <h1 className="detail-title">Price: $ {product.precio}</h1>
            <button
              className="button-shop"
              onClick={handleCart}
              value={product}
            >
              Añadir al carrito
            </button>
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
          {/* {isLoged ? (
            <Link to={`/Review/${id}`}>
              <button className="button">Contanos tu experiencia</button>
            </Link>
          ) : (
            <button onClick={handleAlertReview} className="button">
              Contanos tu experiencia
            </button>
          )} */}
        </div>
      ) : (
        console.log("No hay nada acá")
      )}
      <div>
        <h3>Productos relacionados</h3>
        {filterRelacionados
          ? filterRelacionados.slice(0, 5).map((e) => {
              return (
                <div key={e.id} className="div-key-card">
                  <Link to={"/bebida/" + e.id}>
                    <Card
                      nombre={e.nombre}
                      imagen={e.imagen}
                      id={e.id}
                      marca={e.marca}
                      ml={e.ml}
                      graduacion={e.graduacion}
                      precio={e.precio}
                    />
                  </Link>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

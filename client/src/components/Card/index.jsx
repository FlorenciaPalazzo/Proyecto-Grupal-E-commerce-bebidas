import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, setFavorito } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import "./CardStyles.css";
import swal from "sweetalert";
export default function Card({
  nombre,
  imagen,
  id,
  marca,
  ml,
  graduacion,
  precio,
}) {
  const usuario = useSelector((state) => state.currentUser);
  const isLoged = useSelector((state) => state.isLoged);
  let a = usuario ? usuario.uid : null;

  const navigate = useNavigate();
  const [fav, setFav] = useState({
    id_prod: id,
    id_user: a,
  });
  let productObject = {
    nombre,
    imagen,
    id,
    marca,
    ml,
    graduacion,
    precio,
    quantity: 1,
    subtotal: precio,
  };
  const dispatch = useDispatch();

  const handleAddCarrito = (e) => {
    e.preventDefault();
    dispatch(addCart(productObject));
  };

  const handleAddFavorito = (e) => {
    console.log("fav", fav);
    e.preventDefault();
    dispatch(setFavorito(fav));
    return () => {
      setFav({ id_user: a });
    };
  };

  const handleAlertFav = (e) => {
    e.preventDefault();
    swal({
      title: "Debes ingresar con tu usuario",
      text: "...para agregar tus bebidas a favoritos❤!",
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

  const handleAlertCarrito = (e) => {
    e.preventDefault();
    swal({
      title: "Debes ingresar con tu usuario",
      text: "...para poder comprar 🛒🛒🛒!",
      buttons: {
        cancel: "Ahorita no joven",
        register: {
          text: "Registrarse",
          value: "register",
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

  //acá traigo todas las propiedades
  return (
    //empiezo a renderizar
    <div className="card-main">
      {" "}
      <div className="card">
        {" "}
        <img
          className="card-imagen"
          src={imagen}
          alt="img not found"
          width="30%"
        />{" "}
        <div className="card-content">
          <h2 className="card-title"> {nombre} </h2>
          <p className="card-price">Precio: ${precio} </p>
        </div>
        <div>
          <div>
            <button onClick={handleAddCarrito} className="button-shop">
              Añadir al carrito
            </button>

            {!isLoged ? (
              <button
                className="button-fav"
                value={fav.id}
                onClick={handleAlertFav}
              >
                ❤ {/* el corazon de toni (es chiquito) */}
              </button>
            ) : (
              <button onClick={handleAddFavorito} className="button-fav">
                ❤
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

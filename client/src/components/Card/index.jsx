import React, { /*  useEffect, */ useState } from "react";
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
  stock,
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
    stock,
  };

  const dispatch = useDispatch();

  const handleAddCarrito = (e) => {
    e.preventDefault();

    if (productObject.stock === 0) {
      swal({
        title: "Producto sin stock 🛒",
        icon: "warning",
        buttons: false,
        timer: 800,
      });
    } else {
      dispatch(addCart(productObject));
      swal({
        title: "Producto agregado al carrito ",
        type: "success",
        icon: "success",
        buttons: false,
        timer: 800,
      });
    }

    console.log("stock", productObject.stock);
  };

  const handleAddFavorito = (e) => {
    console.log("fav", fav);
    e.preventDefault();
    swal({
      title: "Agregado a favoritos ",
      type: "success",
      buttons: false,
      timer: 500,
    });
    dispatch(setFavorito(fav));
    /* return () => {
      setFav({ id_user: a });
    }; */
  };

  const handleAlertFav = (e) => {
    e.preventDefault();
    swal({
      title: "Debes ingresar con tu usuario",
      text: "...para agregar tus bebidas a favoritos❤!",
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

  /*  const handleAlertCarrito = (e) => {
    e.preventDefault();
    swal({
      title: "Debes ingresar con tu usuario",
      text: "...para poder comprar 🛒🛒🛒!",
      buttons: {
        cancel: "Seguir navegando",
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
  }; */

  //acá traigo todas las propiedadess
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
              Añadir al carrito{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-cart-plus"
                viewBox="0 0 18 18"
              >
                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
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

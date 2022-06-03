import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, setFavorito } from "../../redux/actions";
import "./CardStyles.css";
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
  let a = usuario ? usuario.uid : null;

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
  console.log("subtotal", productObject.subtotal);
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

  //acá traigo todas las propiedades
  return (
    //empiezo a renderizar
    <div className="card-main">
      {" "}
      {/*div contenedor principal*/}
      <div className="card">
        {" "}
        {/*div de la card*/}
        
        <img
          className="card-imagen"
          src={imagen}
          alt="img not found"
          width="30%"
        />{" "}
        {/*imagen del producto*/}
        <div className="card-content">
          {/*div del contenido*/}
          <h2 className="card-title"> {nombre} </h2> {/*nombre del producto*/}
          {/* <p className="card-body">
            
            <p className="card-brand">Brand: {marca}</p>
            <p className="card-alcohol">Alcohol content: {graduacion} % </p>
            <p className="card-ml">Size: {ml}ml </p>{" "}
          </p> */}
          <p className="card-price">Price: ${precio} </p>
        </div>
        <button onClick={handleAddCarrito} className="button-shop">
          Añadir al carrito
        </button>
        <button
          className="button-fav"
          value={fav.id}
          onClick={handleAddFavorito}
        >
          ❤ {/* el corazon de toni (es chiquito) */}
        </button>
      </div>
    </div>
  );
}

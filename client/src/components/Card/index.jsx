import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../redux/actions";

export default function Card({
  nombre,
  imagen,
  id,
  marca,
  ml,
  graduacion,
  precio,
}) {
  let productObject = {
    nombre,
    imagen,
    id,
    marca,
    ml,
    graduacion,
    precio,
    quantity: 1,
  };
  const dispatch = useDispatch();

  const handleAddCarrito = (e) => {
    e.preventDefault();
    dispatch(addCart(productObject));
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
        <button onClick={handleAddCarrito}>Agregar al carrito!</button>
        <img
          className="card-imagen"
          src={imagen}
          alt="img not found"
          width="30%"
        />{" "}
        {/*imagen del producto*/}
        <div className="card-content">
          {" "}
          {/*div del contenido*/}
          <h2 className="card-title"> {nombre} </h2> {/*nombre del producto*/}
          <p className="card-body">
            {" "}
            {/*cuerpo de la card*/}
            Brand: {marca} <br /> {/*Marca*/}
            Alcohol content: {graduacion} % <br /> {/*Graduacion*/}
            Size: {ml}ml <br /> {/*Tamaño en mililitros*/}
            Price: ${precio} <br /> {/*Precio*/}
          </p>
          <button href={id} className="button">
            Details
          </button>{" "}
          {/*Boton para ver los detalles*/}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../redux/actions";
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
        <button onClick={handleAddCarrito} className="button-shop">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" />
          </svg>
        </button>
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
          <p className="card-body">
            {/*cuerpo de la card*/}
            <p className="card-brand">Brand: {marca}</p>
            <p className="card-alcohol">Alcohol content: {graduacion} % </p>
            <p className="card-ml">Size: {ml}ml </p>
s          </p>
          <p className="card-price">Price: ${precio} </p>
        </div>
      </div>
    </div>
  );
}

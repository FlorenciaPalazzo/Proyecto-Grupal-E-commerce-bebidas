import React, { useEffect, useState } from "react";
import { matchPath } from "react-router-dom";

const ShoppingCart = () => {
  let productCart = JSON.parse(window.localStorage.getItem("product"));
  const localValue = () => {
    return JSON.parse(window.localStorage.getItem("product")); //creo
  };

  console.log(localValue());

  useEffect(() => {
    localValue();
  }, []);

  return (
    <div>
      <h1>Carrito de compras</h1>
      <h3>Productos: </h3>
      {productCart &&
        productCart.map((e) => {
          return (
            <div key={e.id}>
              <span>{`${e.nombre} $${e.precio}  ${e.ml}`}</span>
              <img src={e.imagen} alt="img not found" width="20%" />
            </div>
          );
        })}
    </div>
  );
};

export default ShoppingCart;

/* 
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ShoppingCart = () => {
  //let productCart = useSelector((state) => state.productCart);
  let products;
  const localValue = () => {
    products = JSON.parse(window.localStorage.getItem("product")); //creo
  };
  let [carrito] = useState(JSON.parse(window.localStorage.getItem("product")));
  useEffect(() => {
    console.log("entro al useEffect de ShoppingCart");
    localValue();
  }, [carrito]);
  console.log("carrito ------>", carrito);
  return (
    <div>
      <h1>Carrito de compras</h1>
      <h3>Productos: </h3>
      {carrito &&
        carrito.map((e) => {
          return (
            <div key={e.id}>
              <span>{`${e.nombre} $${e.precio}  ${e.ml}`}</span>
              <img src={e.imagen} alt="img not found" width="20%" />
            </div>
          );
        })}
    </div>
  );
};

*/

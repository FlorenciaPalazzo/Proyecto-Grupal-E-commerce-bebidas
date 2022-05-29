import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, deleteOne, updateCart } from "../../redux/actions";

const ShoppingCart = () => {
  //useSelector user isVerified
  const productReducer = useSelector((state) => state.productCart);
  const dispatch = useDispatch();
  let productCart = JSON.parse(window.localStorage.getItem("product"));
  const localValue = () => {
    return JSON.parse(window.localStorage.getItem("product"));
  };

  useEffect(() => {
    localValue();
  }, [dispatch, productReducer, productCart]);

  let productObject = [];
  let deleteProdObject = [];
  const addProduct = (e) => {
    e.preventDefault();
    let getAdd = productObject.find((p) => p.id === e.target.value); //busco el que necesito
    dispatch(addCart(getAdd));
    dispatch(updateCart());
  };
  const deleteProduct = (e) => {
    e.preventDefault();
    let getDelete = deleteProdObject.find((p) => p.id === e.target.value);
    dispatch(deleteOne(getDelete));
    dispatch(updateCart());
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <h3>Products: </h3>
      {productReducer &&
        productReducer.map((element) => {
          if (element && element.quantity === 0) return;
          productObject.push(element);
          deleteProdObject.push(element);
          console.log(productObject, "productObject");
          console.log(deleteProdObject, "deleteProdObject");

          return (
            <div>
              <div key={element.id}>
                <h3>{`${element.nombre}`}</h3>
                <img src={element.imagen} alt="img not found" width="20%" />
                <span>
                  <button onClick={deleteProduct} value={element.id}>
                    -
                  </button>
                  ${element.precio} x {element.quantity} = $
                  {element.precio * element.quantity}
                  <button onClick={addProduct} value={element.id}>
                    +
                  </button>
                </span>
              </div>
            </div>
          );
        })}
      <span>
        <button>Buy Products</button> <button>Clean Cart</button>
      </span>
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, deleteOne } from "../../redux/actions";

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
  }, [dispatch, productReducer]);

  let productObject;
  const addProduct = (e) => {
    e.preventDefault();
    dispatch(addCart(productObject));
  };
  const deleteProduct = (e) => {
    e.preventDefault();
    dispatch(deleteOne(e.target.value));
  };
  return (
    <div>
      <h1>Shopping Cart</h1>
      <h3>Products: </h3>
      {productCart &&
        productCart.map((element) => {
          console.log("productObject-->", productObject);
          productObject = element;
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
                  <button onClick={addProduct}>+</button>
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

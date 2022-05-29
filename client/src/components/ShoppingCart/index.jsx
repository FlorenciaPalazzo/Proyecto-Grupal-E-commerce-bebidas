import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, cleanCart, deleteOne } from "../../redux/actions";

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

  let productArray = [];
  let subtotal = [];
  let total = subtotal.reduce((a, b) => a + b, 0);
  console.log("total-----", total);
  const addProduct = (e) => {
    e.preventDefault();
    let productObject = productArray.find((el) => el.id === e.target.value);
    dispatch(addCart(productObject));
  };
  const deleteProduct = (e) => {
    e.preventDefault();
    dispatch(deleteOne(e.target.value));
  };
  const cleanAllCart = (e) => {
    e.preventDefault();
    dispatch(cleanCart());
  };
  return (
    <div>
      <h1>Shopping Cart</h1>
      <h3>Products: </h3>
      <h3>SubTotal: {total}</h3>
      {productCart &&
        productCart.map((element) => {
          subtotal.push(element.precio * element.quantity);
          productArray.push(element);
          console.log("subtotal-----", subtotal);

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
        <button>Buy Products</button>{" "}
        <button onClick={cleanAllCart}>Clean Cart</button>
      </span>
    </div>
  );
};

export default ShoppingCart;

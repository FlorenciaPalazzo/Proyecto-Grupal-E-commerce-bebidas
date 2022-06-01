import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteMercadoPago, getMercadoPago } from "../../redux/actions";

export const Checkout = () => {
  const sandbox = useSelector((state) => state.mpSandBox);
  const products = useSelector((state) => state.productCart);
  let productCart = JSON.parse(window.localStorage.getItem("product"));
  let navigate = useNavigate();
  const dispatch = useDispatch();

  /* const handleMercadoPago = (e) => {
    e.preventDefault();
    dispatch(deleteMercadoPago());
  }; */

  useEffect(() => {
    if (!sandbox) dispatch(getMercadoPago());
    /* dispatch(deleteMercadoPago()); */
    console.log("sandbox ------>", sandbox);
  }, [sandbox, dispatch]);

  return (
    <div>
      <h2>Checkout</h2>
      {!sandbox && productCart.length ? (
        <span>Cargando</span>
      ) : sandbox ? (
        <button onClick="">
          <a href={sandbox}>PAGAR</a>
        </button>
      ) : productCart.length === 0 && !sandbox ? (
        <span>Ya realizaste tu compra</span>
      ) : null}
    </div>
  );
};

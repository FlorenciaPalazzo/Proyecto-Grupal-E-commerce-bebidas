import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMercadoPago, getMercadoPago } from "../../redux/actions";

export const Checkout = () => {
  const sandbox = useSelector((state) => state.mpSandBox);
  const products = useSelector((state) => state.productCart);
  const dispatch = useDispatch();

  /* const handleMercadoPago = (e) => {
    e.preventDefault();
    dispatch(deleteMercadoPago());
  }; */
  useEffect(() => {
    console.log("cualquier cosaaaaaaaaaaaaaaaaaa");
    dispatch(getMercadoPago());
    return () => {
      dispatch(deleteMercadoPago());
    };
  }, []);

  return (
    <div>
      Checkout
      <button /* onClick={handleMercadoPago} */>
        <a href={sandbox}>PAGAR</a>
      </button>
    </div>
  );
};

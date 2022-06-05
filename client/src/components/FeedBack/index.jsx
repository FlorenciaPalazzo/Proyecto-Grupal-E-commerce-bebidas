import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteMercadoPago, addComprados } from "../../redux/actions";

export const FeedBack = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carrito = useSelector(state => state.productCart)
  let foo;
  let usuario = localStorage.getItem('pan')    
  console.log(usuario)
  
  let map = carrito.forEach(e => {
    dispatch(addComprados({ id_user: usuario, id_product: e.id }))
  })
  
  useEffect(() => {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    foo = params.get("status");
    console.log("foo", foo);
    if (foo === "approved") {
      console.log(carrito)
      // if( a !== null){
          //aqui van las cosa
            dispatch(
              map(),
          deleteMercadoPago());
          console.log("APROBADO");
          setTimeout(navigate("/home"), 10000);
        // }
    } else {
      // dispatch( aqui borramos si no fue aprub)
      navigate("/cart");
    }
  }, [dispatch]);
  return <div>Status: {foo}</div>;
};

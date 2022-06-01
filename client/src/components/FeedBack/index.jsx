import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteMercadoPago } from "../../redux/actions";

export const FeedBack = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let foo;
  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    foo = params.get("status");

    console.log("foo", foo);
    if (foo === "approved") {
      dispatch(deleteMercadoPago());
      console.log("APROBADO");
      setTimeout(navigate("/home"), 10000);
    } else {
      navigate("/cart");
    }
  }, []);
  return <div>Status: {foo}</div>;
};

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import NavBarSec from "../NavBarSec";
import Footer from "../Footer";
import "./ShoppingCart.css";

import {
  addCart,
  cleanCart,
  deleteMercadoPago,
  deleteOne,
  feedBack,
  getMercadoPago,
  orderMercadoPago,
} from "../../redux/actions";
import Loading from "../Loading";

const ShoppingCart = () => {
  const isAdmin = useSelector((state) => state.isAdmin);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.isLoading);

  const verified = useSelector((state) => state.currentUser);
  console.log("soy verified", verified);
  const feedBackReducer = useSelector((state) => state.feedBackMP);
  const productReducer = useSelector((state) => state.productCart);
  let productCart = JSON.parse(window.localStorage.getItem("product"));
  const localValue = () => {
    return JSON.parse(window.localStorage.getItem("product"));
  };
  console.log("productCart", productCart);
  console.log("feedbackReducer", feedBackReducer);

  let productArray = [];
  let subtotal = productCart?.map(
    (element) => element.precio * element.quantity
  );

  let total = 0;
  subtotal?.forEach((e) => (total += e));
  console.log("total-----", total);
  const addProduct = (e) => {
    e.preventDefault();
    let productObject = productArray.find((el) => el.id === e.target.value);
    console.log("stock", productObject.stock);
    productObject.stock === 0
      ? swal({
          title: "Producto sin stock 🛒",
          icon: "warning",
          buttons: false,
          timer: 800,
        })
      : dispatch(addCart(productObject));
  };
  const deleteProduct = (e) => {
    e.preventDefault();
    dispatch(deleteOne(e.target.value));
  };
  const cleanAllCart = (e) => {
    e.preventDefault();
    //dispatch(cleanCart());
    swal({
      title: "Carrito vaciado ",
      type: "warning",
      buttons: false,
      timer: 500,
    });
    dispatch(deleteMercadoPago());
  };

  let postCarrito = (e) => {
    e.preventDefault();
    console.log("productCart --- post carrito", productCart);
    dispatch(orderMercadoPago(productCart));
    navigate(`/checkout/${verified.uid}`);
  };

  const handleAlertCarrito = (e) => {
    e.preventDefault();
    if (!productCart.length) {
      swal({
        title: "El carrito esta vacío",
        icon: "warning",
      });
    } 

    else if (!verified){
      swal({
        title: "Debes estar registrado!",
        icon: "warning",
      });
    }

    else if (verified && !verified.emailVerified) {
      swal({
        title: "Debes estar verificado!",
        icon: "warning",
      });
    } else if (!verified.emailVerified) {
      swal({
        title: "Por favor VERIFICÀ tu email!",
        icon: "warning",
      });
    }
  };

  useEffect(() => {
    if (!loading) {
      if ((verified && !isAdmin )|| !verified) {
        if (!feedBackReducer) dispatch(feedBack());
        localValue();
      } else {
        console.log("navigate verified");
        navigate("/*");
      }
    }
  }, [dispatch, productReducer, feedBackReducer, loading]);
  console.log("object");
  return (
    <div></div>
  );
};

export default ShoppingCart;

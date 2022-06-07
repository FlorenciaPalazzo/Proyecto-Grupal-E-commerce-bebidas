import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./ShoppingCart.css"

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
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.isLoading);

  const verified = useSelector((state) => state.currentUser); //isEmail
  const feedBackReducer = useSelector((state) => state.feedBackMP);
  const productReducer = useSelector((state) => state.productCart);
  let productCart = JSON.parse(window.localStorage.getItem("product"));
  const localValue = () => {
    return JSON.parse(window.localStorage.getItem("product"));
  };
  console.log("productCart", productCart);
  console.log("feedbackReducer", feedBackReducer);
  useEffect(() => {
    if (!feedBackReducer) dispatch(feedBack());
    localValue();
  }, [dispatch, productReducer, feedBackReducer]);

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
    dispatch(addCart(productObject));
  };
  const deleteProduct = (e) => {
    e.preventDefault();
    dispatch(deleteOne(e.target.value));
  };
  const cleanAllCart = (e) => {
    e.preventDefault();
    //dispatch(cleanCart());
    dispatch(deleteMercadoPago());
  };

  let postCarrito = (e) => {
    e.preventDefault();
    console.log("productCart --- post carrito", productCart);
    dispatch(orderMercadoPago(productCart));
    navigate("/checkout");
  };

  const handleAlertCarrito = (e) => {
    e.preventDefault();
    swal({
      title: "Debes ingresar con tu usuario",
      text: "...para poder comprar 🛒🛒🛒!",
      buttons: {
        cancel: "Ahorita no joven",
        register: {
          text: "Registrarse",
          value: "register",
        },
        login: {
          text: "Iniciar sesion",
          value: "login",
        },
      },
      icon: "warning",
    }).then((value) => {
      if (value === "register") {
        navigate("/register");
      }

      if (value === "login") {
        navigate("/login");
      }
    });
  };

  return (
    <div className="carrito-container">
      {loading /* revisen esto!! */ ? (
        <Loading />
      ) : (
      <div className="carrito-body">
        <Link to="/">
            
            <img className="details-logo" src="/logo/logo.png" alt="logo"/>
                  
                </Link>
      <div className="carrito-background">
        
      <h1>Shopping Cart</h1>
          
        <div className="carrito-main">
          
          
          {productCart &&
            productCart.map((element) => {
              productArray.push(element);

              return (
                <div className="carrito-content">
                  <div key={element.id} className="carrito-product">
                    <img src={element.imagen} alt="img not found" width="20%" />
                    <h3>{`${element.nombre}`}</h3>
                    <span className="carrito-price">
                      <button className="button-minus" onClick={deleteProduct} value={element.id}>
                      ➖
                      </button>
                      <div>
                        ${element.precio} x {element.quantity} = $
                      {element.precio * element.quantity}
                      </div>
                      <button className="button-plus" onClick={addProduct} value={element.id}>
                      ➕
                      </button>
                    </span>
                  </div>
                </div>
              );
            })}
            

          <span>
            {verified && verified.email && productCart.length ? (
              <div className="carrito-resumen">
                <button className="button" onClick={cleanAllCart}>Clean Cart</button>
                <h1 className="carrito-total">Precio: ${total}</h1>
                <button className="button-pagar" onClick={postCarrito}>PAGAR</button>
              </div>
            ) : !verified ? (
              <button className="button-pagar" onClick={handleAlertCarrito}>Pagar</button>
            ) : (
              <div>
              </div>
            )}
          </span>
        </div>
        </div>
        </div>
      )}
      
    </div>
  );
};

export default ShoppingCart;

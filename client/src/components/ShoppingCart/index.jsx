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
    } else if (!verified) {
      swal({
        title: "No estas registrado!",
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
    <div>
      {loading /* revisen esto!! */ ? (
        <Loading />
      ) : (
        <div>
          <NavBarSec />
          <div className="shopping-cart">
            <div className="card">
              <div className="row">
                <div className="col-md-8 cart">
                  <div className="title">
                    <div className="row">
                      <div className="col">
                        <h4>
                          <b>Carrito</b>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="carrito-main">
                    {productCart &&
                      productCart.map((e) => {
                        productArray.push(e);
                        return (
                          <div
                            className="row border-top border-bottom"
                            id={e.id}
                          >
                            <div className="row main align-items-center">
                              <div className="col-2">
                                <img
                                  className="img-fluid"
                                  src={e.imagen}
                                  alt="img not found"
                                  width="20%"
                                />
                              </div>
                              <div className="col">
                                <div className="row">{e.nombre}</div>
                              </div>
                              <div className="col d-flex flex-row">
                                <button
                                  className="border"
                                  onClick={deleteProduct}
                                  value={e.id}
                                >
                                  ➖
                                </button>
                                <div className="col">
                                  ${e.precio} x {e.quantity} = $
                                  {e.precio * e.quantity}
                                </div>
                                <button
                                  className="border"
                                  onClick={addProduct}
                                  value={e.id}
                                >
                                  ➕
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <button className="btn" onClick={cleanAllCart}>
                    Limpiar carrito
                  </button>
                  <div className="back-to-shop">
                    <a href="/">
                      <span className="text-muted">Volver al home</span>
                    </a>
                  </div>
                </div>
                <div className="col-md-4 summary">
                  <div>
                    <h5>
                      <b>Resumen</b>
                    </h5>
                  </div>
                  <hr />
                  <span>
                    <div className="row">
                      <div className="col">PRECIO</div>
                      <div className="col text-right">${total}</div>

                      {!verified?.emailVerified ||
                      !verified ||
                      !productCart?.length ? (
                        <button
                          className="btn bg-success"
                          onClick={handleAlertCarrito}
                        >
                          PAGAR
                        </button>
                      ) : (
                        <button
                          className="btn bg-success"
                          onClick={postCarrito}
                        >
                          PAGAR
                        </button>
                      )}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;

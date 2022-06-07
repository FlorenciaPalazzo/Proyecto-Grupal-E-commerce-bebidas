import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
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
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.isLoading);

  const verified = useSelector((state) => state.currentUser); //isEmail
  console.log("soy verified", verified);
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
    navigate(`/checkout/${verified.uid}`);
  };

  const handleAlertCarrito = (e) => {
    e.preventDefault();
    swal({
      title: "Debes ingresar con tu usuario Validado",
      text: "...para poder comprar 🛒🛒🛒!",
      buttons: {
        cancel: "Seguir navegando",
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
            <button className="button">Regresar</button>
          </Link>
          <div className="carrito-background">
            <h1>Carrito</h1>

            <div className="carrito-main">
              {productCart &&
                productCart.map((element) => {
                  productArray.push(element);

                  return (
                    <div className="carrito-content">
                      <div key={element.id} className="carrito-product">
                        <img
                          src={element.imagen}
                          alt="img not found"
                          width="20%"
                        />
                        <h3>{`${element.nombre}`}</h3>
                        <span className="carrito-price">
                          <button
                            className="button"
                            onClick={deleteProduct}
                            value={element.id}
                          >
                            ➖
                          </button>
                          <div>
                            ${element.precio} x {element.quantity} = $
                            {element.precio * element.quantity}
                          </div>
                          <button
                            className="button"
                            onClick={addProduct}
                            value={element.id}
                          >
                            ➕
                          </button>
                        </span>
                      </div>
                    </div>
                  );
                })}

              <span>
                <div className="carrito-resumen">
                  <button className="button" onClick={cleanAllCart}>
                    Limpiar carrito
                  </button>
                  <h1 className="carrito-total">Precio: ${total}</h1>

                  {/* {verified && !verified.emailVerified ? (
                    <button className="button" onClick={handleAlertCarrito}>
                      PAGAR
                    </button>
                  ) : ( */}
                  <button className="button-pagar" onClick={postCarrito}>
                    PAGAR
                  </button>
                  {/* )} */}
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
//           <span>
//             {verified && verified.email && productCart.length ? (
//               <div>
//                 <button onClick={postCarrito}>Finalizar Compra</button>
//                 <button> <Link to= "/home">Seguir Comprando</Link></button>
//                 <button onClick={cleanAllCart}>Vaciar Carrito</button>
//               </div>
//             ) : !verified ? (
//               <button onClick={handleAlertCarrito}>Pagar</button>
//             ) : (
//               <button onClick={handleAlertCarrito}>Pagar</button>
//             )}
//           </span>
//         </div>
//       )}
//       <Link to="/home">
//         <button>Regresar.</button>
//       </Link>
//     </div>
//   );
// };

export default ShoppingCart;

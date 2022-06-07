import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { deleteMercadoPago, addHist } from "../../redux/actions";
import Loading from "../Loading";

export const FeedBack = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.isLoading);
  let productCart = JSON.parse(window.localStorage.getItem("product"));
  // const user = useSelector((state) => state.currentUser);
  let user = localStorage.getItem('pan')
  
  console.log(user, "Hola, soy el user uid")

  let map = productCart.map(e => e.id)

  const [historial, setHistorial] = useState({
    id_user: user,
    id_prods: map
  })

  console.log(historial, "Todo se trajo bien a la primera")

  let foo;
  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    foo = params.get("status");

    console.log("foo", foo);
    if (foo === "approved") {
      dispatch(addHist(historial));
      console.log("APROBADO");
      setTimeout(navigate("/"), 10000);
      swal({
        title: "Dejanos tu opinion",
        text: "... que tal te parecio el producto ⭐⭐⭐!",
        buttons: {
          cancel: "Ahorita no joven",
          review: {
            text: "Opina",
            value: "Opina",
          },
        },
        icon: "warning",
      }).then((value) => {
        if (value === "Opina") {
          navigate("/review");
        }
      });
      return () => {
        dispatch(deleteMercadoPago())
      }
    } else {
      navigate("/cart");
    }
  }, [dispatch,historial,loading]);
  return (
    <div>
    {loading ? ( <Loading/>) : (
  <div>
    Status: {foo}
  </div>
  )}
    </div>
  )};

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { deleteMercadoPago, addHist, putProduct, getReviewPage } from "../../redux/actions";
import Loading from "../Loading";

export const FeedBack = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  
  let revPage = useSelector((state) => state.reviewPage);
  const loading = useSelector((state) => state.isLoading);
  let productCart = JSON.parse(window.localStorage.getItem("product"));
  // const user = useSelector((state) => state.currentUser);
  let user = localStorage.getItem("user");

  console.log(user, "Hola, soy el user uid");
  
  let map = productCart.map((e) => e.id);
  
  const [historial, setHistorial] = useState({
    id_user: user,
    id_prods: map,
  });
  console.log(revPage, "soy las reviews de la pagina <=====================")
  
  console.log(historial, "Todo se trajo bien a la primera");
  useEffect(() => {
    dispatch(getReviewPage())
  },[dispatch])
  
useEffect(()=>{
   productCart.map(e=>dispatch(putProduct(e)) )
},[dispatch, productCart])
  let foo;
  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    foo = params.get("status");

    // console.log("foo", foo);
    if (foo === "approved") {
      dispatch(addHist(historial))
      // dispatch(getReviewPage())

      ;
      console.log("APROBADO");
      setTimeout(navigate("/"), 50000);
      if(!revPage.includes(user)){
        swal({
          title: "Queremos saber tu opinion",
          text: "... Dejá tu reseña de nuestra pagina!! ⭐⭐⭐!",
          buttons: {
            cancel: "Seguir navegando",
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
      }
      return () => {
        dispatch(deleteMercadoPago());
      };
    } else {
      navigate("/cart");
    }
  }, [dispatch, historial, loading]);
  return <div>{loading ? <Loading /> : <div>Status: {foo}</div>}</div>;
};

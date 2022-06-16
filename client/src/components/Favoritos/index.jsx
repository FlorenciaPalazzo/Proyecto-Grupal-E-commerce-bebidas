import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteFavorito, getFavorito, getProducts } from "../../redux/actions";
import Footer from "../Footer";
import NavBarSec from "../NavBarSec";
import swal from "sweetalert";
import "./Favoritos.css";
import Loading from "../Loading";

export const Favoritos = () => {
  const elFavorito = useSelector((state) => state.favProducts);
  const userr = useSelector((state) => state.currentUser);
  const isAdmin = useSelector((state) => state.isAdmin);
  const isLoading = useSelector((state) => state.isLoading);

  //const usuario = useSelector((state) => state.currentUser);
  let navigate = useNavigate();
  console.log("EL FAVORITO", elFavorito);
  const dispatch = useDispatch();
  const [bol, setBol] = useState(false);
  let user = localStorage.getItem("user");

  console.log("SOY EL USUARIO--->", user);

  // Toni dice que tiene que existir ↧↧↧↧
  //   useEffect(() => {
  //     //no tocar :),
  //   ;
  // }, []);

  // y este tb ↧↧↧
  useEffect(() => {
    if (!isLoading) {
      if (userr && !isAdmin) {
        console.log(!userr);
        dispatch(getProducts());
        dispatch(getFavorito(user));
      } else {
        console.log("navigate del coctact container");
        navigate("/*");
      }
    }

    // if(!elFavorito.length){

    // }
  }, [dispatch, bol, isLoading]);

  const handleDeleteFav = (e) => {
    e.preventDefault();
    let idProd = e.target.value;
    let payload = { id_prod: idProd, id_user: user };
    dispatch(deleteFavorito(payload)); //↤ No tocar 😈
    swal({
      title: "Producto borrado ",
      icon: "success",
      buttons: false,
      timer: 500,
    });

    //window.location.reload()
    setBol(!bol);
  };
  return (<div></div>);
};

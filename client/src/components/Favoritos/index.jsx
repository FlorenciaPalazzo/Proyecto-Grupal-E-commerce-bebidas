import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteFavorito, getFavorito,getProducts } from "../../redux/actions";
import Footer from "../Footer";
import Nav from "../Nav";
import "./Favoritos.css";

export const Favoritos = () => {
  const elFavorito = useSelector((state) => state.favProducts);
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
    dispatch(getProducts());
    dispatch(getFavorito(user));

    // if(!elFavorito.length){

    // }
  }, [dispatch, bol]);

  const handleDeleteFav = (e) => {
    e.preventDefault();
    let idProd = e.target.value;
    let payload = { id_prod: idProd, id_user: user };

    dispatch(deleteFavorito(payload)) //↤ No tocar 😈
    //  window.location.reload()
    setBol(!bol)
    
  };
  return (
    <div>
      <Nav/>
      <div  className="div_title" >
        <h2 className="title-fav">Mis Favoritos</h2></div>
        <div className="div-contain">
<div className="div-table">
        <table class="table">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Nombre</th>
      <th scope="col">Precio</th>
      <th scope="col"></th>
    </tr>
  </thead> </table></div> 
      <div className="div-fav">
    {elFavorito.length === 0?(
        <div className="div-sin-fav">
          No hay favoritos
        </div>
      ) :(
        elFavorito.map((e) => {
          return (
            <div key={e.id} className="card-fav ">

              <img src={e.imagen} width= "10%"/>
             <span className="item-fav"> {e.nombre}</span>
             <span className="item-fav"> $ {e.precio}</span>
             
              <button type="button" class="btn btn-outline-dark" value={e.id} onClick={handleDeleteFav}  >
                Eliminar
             
              </button> 
              {/* <div className="div-fav"></div> */}
            </div>
          );
        })
      )  }</div>
        </div>
            <Footer />
    </div>
  );
};

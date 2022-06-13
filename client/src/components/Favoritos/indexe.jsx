import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteFavorito, getFavorito, getProducts, setUser } from "../../redux/actions";
import swal from "sweetalert";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Loading from "../Loading";
import "./Favoritos.css";

export const Favoritos = () => {
  const elFavorito = useSelector((state) => state.favProducts);
  //const usuario = useSelector((state) => state.currentUser);
  let navigate = useNavigate();
  console.log("EL FAVORITO", elFavorito);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.isLoading);
  let user = localStorage.getItem("user");

  console.log("SOY EL USUARIO--->", user);

  // Toni dice que tiene que existir ↧↧↧↧
  useEffect(() => {
    //no tocar :), 
    dispatch(getProducts());
  }, []);

  // y este tb ↧↧↧
  useEffect(() => {

    if (!elFavorito.length) {
      dispatch(getFavorito(user));

    }
  }, [dispatch]);

  const handleDeleteFav = (e) => {
    e.preventDefault();
    let idProd = e.target.value;
    let payload = { id_prod: idProd, id_user: user };

    swal({
      title: "Favorito eliminado ",
      type: 'warning',
      icon: 'warning',
      buttons: false,
      timer: 1000
    })
    dispatch(deleteFavorito(payload)) //↤ No tocar 😈
    window.location.reload()

  };
  
  const usuarioActual = useSelector((state) => state.currentUser);
  console.log("usuario", usuarioActual);
  const isLoged = useSelector((state) => state.isLoged);
  console.log("soy loged", isLoged);
  return (
    <div>
      <Link to="/">
        <button className="button">Home</button>
      </Link>
      {loading /* revisen esto!! */ ? (
        <Loading />
      ) :
        isLoged ?
          <div>
            <NavBar />
            <div className="title-fav"><h2>Lista de Favoritos</h2></div>

            {elFavorito.length ? (
              elFavorito.map((e) => {
                return (
                  <div key={e.id} class="table table-striped table-hover" className="card-fav">

                    
                    <img src={e.imagen} width="10%" />
                    <span>{e.nombre}</span>
                    <button value={e.id} onClick={handleDeleteFav}>
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                              </svg>

                    </button>
                  </div>
                );
              })
            ) : (
              <div class="container-fluid">
                <Link to="/">
                  <button className="button">Home</button>
                </Link>
                <div>

                  <h2>Lista de Favoritos</h2></div>
                <div class="table table-striped table-hover" >
                  {elFavorito.length > 0 ? (
                    elFavorito.map((e) => {
                      return (
                        <div key={e.id} >

                          <p> {e.nombre}</p>
                          <img src={e.imagen} width="10%" />
                          <button

                            // class="navbar-toggler "
                            // type="button"
                            // data-bs-toggle="collapse"
                            // data-bs-target="#navbarSupportedContent"
                            // aria-controls="navbarSupportedContent"
                            // aria-expanded="false"
                            // aria-label="Toggle navigation"
                            value={e.id}
                            onClick={handleDeleteFav}
                          >
                       
                             

                          
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div>
                      <h2>No hay favoritos</h2>
                    </div>
                  )}
                </div>
              </div>
            )} </div>
          :
          navigate("/")
      }

      <Footer />
    </div>
  );
};
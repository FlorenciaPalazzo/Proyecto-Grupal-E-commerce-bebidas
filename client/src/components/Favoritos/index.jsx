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

    //  window.location.reload()
    setBol(!bol);
  };
  return (
    <div>
      {isLoading /* revisen esto!! */ ? (
        <Loading />
      ) : (
        <div>
          <NavBarSec />
          <div className="div_title">
            <h2 className="title-fav">Mis Favoritos</h2>
          </div>
          <div className="div-contain">
            <div className="div-table">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio </th>
                    <th scope="col"></th>
                  </tr>
                </thead>{" "}
              </table>
            </div>
            <div className="div-fav">
              {elFavorito.length === 0 ? (
                <div className="div-sin-fav">
                  <h2>Aún no has agregado favoritos..</h2>

                  <div className="fav-gif">
                    <iframe
                      src="https://i.gifer.com/7JH.gif"
                      width="250"
                      height="250"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ) : (
                elFavorito.map((e) => {
                  return (
                    <div key={e.id} className="card-fav ">
                      <div className="fav-imagen">
                        <img src={e.imagen} width="50%" />
                      </div>
                      <span className="item-fav"> {e.nombre}</span>
                      <span className="item-fav"> $ {e.precio}</span>
                      <div className="div-btn-eliminar-fav">
                        <button
                          type="button"
                          class="btn btn-outline-dark"
                          value={e.id}
                          onClick={handleDeleteFav}
                        >
                          Eliminar
                        </button>
                      </div>
                      {/* <div className="div-fav"></div> */}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

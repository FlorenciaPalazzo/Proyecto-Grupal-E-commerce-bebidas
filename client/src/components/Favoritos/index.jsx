import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deleteFavorito, getFavorito } from "../../redux/actions";

export const Favoritos = () => {
  const elFavorito = useSelector((state) => state.favProducts);
  const usuario = useSelector((state) => state.currentUser);

  console.log("EL FAVORITO", elFavorito);
  const dispatch = useDispatch();

  let a = usuario ? usuario.uid : null;

  console.log("SOY EL USUARIO--->", usuario.uid);

  useEffect(() => {
    if (!elFavorito.length) {
      dispatch(getFavorito(usuario.uid));
    }
  }, [elFavorito]);

  const handleDeleteFav = (e) => {
    e.preventDefault();
    let idProd = e.target.value;
    let payload = { id_prod: idProd, id_user: a };

    dispatch(deleteFavorito(payload));
    // dispatch(getFavorito(usuario.uid))
  };
  return (
    <div>
      <Link to="/home">
        <button className="button">Home</button>
      </Link>
      <div>Lista de Favoritos</div>

      {elFavorito.length > 0 ? (
        elFavorito.map((e) => {
          return (
            <div key={e.id}>
              <button className="button" value={e.id} onClick={handleDeleteFav}>
                Delete
              </button>
              {e.nombre}
              <img src={e.imagen} />
            </div>
          );
        })
      ) : (
        <div>
          <h2>No hay favoritos</h2>
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deleteFavorito, getFavorito } from "../../redux/actions";
import Loading from "../Loading";

export const Favoritos = () => {
  const elFavorito = useSelector((state) => state.favProducts);
  const loading = useSelector((state) => state.isLoading);
  //const product = useSelector((state) => state.products);
  const [bool, setBool] = useState(true);

  const dispatch = useDispatch();

  let user = localStorage.getItem("user");

  useEffect(() => {
    console.log("Antes del if", bool);
    console.log("Elfavorito antes del if", elFavorito);
    if (bool && elFavorito) {
      dispatch(getFavorito(user));
      setBool(false);
    }
    console.log("Elfavorito despues del if", elFavorito);

    console.log("despues del if", bool);
  }, [dispatch, elFavorito, bool]);

  const handleDeleteFav = (e) => {
    e.preventDefault();
    let idProd = e.target.value;
    let payload = { id_prod: idProd, id_user: user };

    dispatch(deleteFavorito(payload));
    setBool(true);
  };
  return (
    <div>
      {loading /* revisen esto!! */ ? (
        <Loading />
      ) : (
        <div>
          <Link to="/">
            <button className="button">Home</button>
          </Link>
          <div>Lista de Favoritos</div>

          {elFavorito.length > 0 ? (
            elFavorito.map((e) => {
              return (
                <div key={e.id}>
                  <button
                    className="button"
                    value={e.id}
                    onClick={handleDeleteFav}
                  >
                    Borrar
                  </button>
                  {e.nombre}
                  <img src={e.imagen} width="20%" />
                </div>
              );
            })
          ) : (
            <div>
              <h2>No hay favoritos</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

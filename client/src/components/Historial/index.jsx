import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getAllReviews,
  getHist,
  getProducts,
  getReview,
} from "../../redux/actions";

const Historial = () => {
  const dispatch = useDispatch();
  const historial = useSelector((state) => state.historial);
  let revs = useSelector((state) => state.allReviews);
  const user = useSelector((state) => state.currentUser);
  const prod = useSelector((state) => state.products);
  const { id } = useParams();
  // console.log(id, "soy el di")
  console.log(historial, "Hay cosas en historial ");

  console.log(revs, "SOY EL REVS MIRAME MIRAME MIREAME");
  const prodFind = prod.filter((e) => e.id === revs.productoId);

  let [bool, setBool] = useState(false);
  let allRevs = revs.map((e) => `${e.productoId} ${e.usuarioId}`);
  console.log(allRevs, "SOY ALLREVS <====================");
  // let revId = allRevs.find(e => e.id)
  
  useEffect(() => {
    dispatch(getAllReviews());
    return () => {
      dispatch(getAllReviews());
    };
  }, []);

  useEffect(() => {
    //no tocar :),
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    dispatch(getHist(id));
  }, [dispatch]);

  return (
    <div>
      <Link to="/">
      <button className="button">Home</button>
      </Link>
      Historial de compras de {id}
      <div>
        {historial.length > 0 ? (
          historial.map((e) => {
            return (
              <div key={e.id}>
                <h2>{e.nombre}</h2>
                <h2>{e.marca}</h2>
                <img src={e.imagen} width="20%" />
                {!allRevs.includes(`${e.id} ${id}`) ? (
                  <Link to={`/Review/${e.id}`}>
                    <button className="button">Contanos tu experiencia</button>
                  </Link>
                ) : (
                  <Link to={`/profile`}>
                    <p>Ya tenes una review de este producto</p>
                  </Link>
                )}
              </div>
            );
          })
        ) : (
          <div>
            <h1>No has comprado nada</h1>
          </div>
        )}
      </div>
    </div>
  );
};
export default Historial;

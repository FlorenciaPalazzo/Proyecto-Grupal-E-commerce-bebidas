import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReviews,
  getReviewPage,
  getUsersLoged,
} from "../../redux/actions";
import { ReviewCar } from "../Review/ReviewCar";

export const AdminReview = () => {
  const dispatch = useDispatch(); /////////////////////////////////

  let revs = useSelector((state) => state.allReviews);
  let revsPage = useSelector((state) => state.reviewPage);
  const usersLoged = useSelector((state) => state.usersLoged);
  const [filterReviews, setfilterReviews] = useState([]);

  //tiene el id del usuario
  let array = [];
  revs.forEach((e) => {
    usersLoged.forEach((r) => {
      if (r.id === e.usuarioId) {
        array.push(r);
      }
    });
  });
  let pagePuntaje = [];
  revsPage.forEach((e) => {
    pagePuntaje.push(e.puntaje);
  });
  let accio = 0;
  let larguen = pagePuntaje.length;
  let sumaPage = pagePuntaje.forEach((e) => (accio += e));
  let promPage = accio / larguen;
  let prom = 0;
  prom = Math.round(promPage);

  const handleSelector = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value === "pagina") {
      setfilterReviews([...revsPage]);
    } else if (e.target.value === "productos") {
      let arr = [];
      revs.forEach((e) => {
        if (e.productoId !== null) {
          arr.push(e);
        }
      });
      setfilterReviews([...arr]);
    } else {
      setfilterReviews([...revs]);
    }
  };
  useEffect(() => {
    dispatch(getAllReviews());
    dispatch(getUsersLoged());
    dispatch(getReviewPage());
  }, [dispatch]);
  return (
    <div>
      {
        <div>
          <div>
            <h2>Promedio de la página:</h2>
            {prom ? (
              <ReactStars
                count={prom}
                size={35}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                edit={false}
                color="#ffd700"
              />
            ) : null}
          </div>
          <h1>Reviews</h1>
          <select name="" id="" onChange={handleSelector}>
            <option disabled>Filtrar reviews</option>
            <option value="all">Todas</option>
            <option value="pagina">Página</option>
            <option value="productos">Productos</option>
          </select>
          {filterReviews?.map((r) => {
            let otroArray;
            array.find((e) => {
              if (e.id === r.usuarioId) {
                otroArray = e.email;
                console.log("otroArray", otroArray);
              }
            });
            return (
              <div key={r.id} value={r.id}>
                <ReviewCar
                  titulo={r.titulo}
                  comentario={r.comentario}
                  puntaje={r.puntaje}
                  producto={r.productoId}
                  fecha={r.createdAt}
                  emailUsuario={otroArray}
                />
              </div>
            );
          })}
        </div>
      }
    </div>
  );
};

/* <div>
        <Link to="/adminreview">
          <button>Ver las reviews de los usuarios</button>
        </Link>
      </div> */

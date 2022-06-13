import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import {
  getAllReviews,
  getProducts,
  getReviewPage,
  getUsersLoged,
  filterUserReview,
} from "../../redux/actions";
import { ReviewCar } from "../Review/ReviewCar";

export const AdminReview = () => {
  const dispatch = useDispatch(); /////////////////////////////////

  let revsPage = useSelector((state) => state.reviewPage);
  let revs = useSelector((state) => state.allReviews);
  const usersLoged = useSelector((state) => state.usersLoged);
  const loading = useSelector((state) => state.isLoading);
  const admin = useSelector((state) => state.isAdmin);

  const [filterReviews, setfilterReviews] = useState([]);
  const products = useSelector((state) => state.products);
  console.log("products", products);

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
    dispatch(filterUserReview(e.target.value));
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllReviews());
    dispatch(getUsersLoged());
    dispatch(getReviewPage());
    setfilterReviews([...revs]);
  }, [dispatch, admin]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : admin ? (
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
              <div></div>
              <h1>Reviews</h1>
              <select name="" id="" onChange={handleSelector}>
                <option disabled>Filtrar reviews</option>
                <option value="all">Todas</option>
                <option value="pagina">Página</option>
                <option value="productos">Productos</option>
              </select>
              {revs
                ? revs.map((r) => {
                    let otroArray;
                    array.find((e) => {
                      if (e.id === r.usuarioId) {
                        otroArray = e.email;
                        console.log("otroArray", otroArray);
                      }
                    });
                    return (
                      <div key={r.id} value={r.id}>
                        {r.productoId ? (
                          <Link to={`/adminreview/${r.productoId}`}>
                            Ver todas las reviews de este producto
                          </Link>
                        ) : null}

                        <ReviewCar
                          titulo={r.titulo}
                          comentario={r.comentario}
                          puntaje={r.puntaje}
                          producto={r.productoId}
                          fecha={r.createdAt}
                          emailUsuario={otroArray}
                          usuarioId={r.usuarioId}
                          id={r.id}
                        />
                      </div>
                    );
                  })
                : null}
            </div>
          }
          <Link to={`/admin`}>
            <button>Volver al panel del admin</button>
          </Link>
        </div>
      ) : (
        <h1> No eres administrador </h1>
      )}
      <Link to="/">
        <button class="btn btn-outline-warning  mx-3  bg-white text-dark">
          Volver al home
        </button>
      </Link>
    </div>
  );
};

/* <div>
        <Link to="/adminreview">
          <button>Ver las reviews de los usuarios</button>
        </Link>
      </div> */

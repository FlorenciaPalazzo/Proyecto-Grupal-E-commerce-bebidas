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
import AdminPanel from "../AdminPanel";
import "./AdminReview.css";

export const AdminReview = () => {
  const dispatch = useDispatch(); /////////////////////////////////

  let revsPage = useSelector((state) => state.reviewPage);
  let revs = useSelector((state) => state.allReviews);
  console.log(revs, "SOY REVS");
  const usersLoged = useSelector((state) => state.usersLoged);
  const loading = useSelector((state) => state.isLoading);
  const admin = useSelector((state) => state.isAdmin);

  const [filterReviews, setfilterReviews] = useState([]);
  const products = useSelector((state) => state.products);
  console.log("products", products);

  /* if (products.length) {
    let filterProdId = products.map((e) => e.id);
    console.log("filterProdId", filterProdId);
    let searchId;
    let coso = revs.map((e) => {
      console.log("entra");
      filterProdId.forEach((f) => {
        console.log("entra al otro");
        if (e.productoId === f) {
          searchId.push(e);
        }
      });
    });
    console.log("searchId", searchId);
  } */

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

  // const handleSelector = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   if (e.target.value === "pagina") {
  //     setfilterReviews([...revsPage]);
  //   } else if (e.target.value === "productos") {
  //     let arr = [];
  //     revs.forEach((e) => {
  //       if (e.productoId !== null) {
  //         arr.push(e);
  //       }
  //     });
  //     setfilterReviews([...arr]);
  //   } else if(e.target.value === "all") {
  //     setfilterReviews([...revs]);
  //   } else {
  //     setfilterReviews([...revs]);
  //   }
  // };
  // useEffect(() => {
  //   setfilterReviews([...revs]);
  // }, []);

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
      <AdminPanel />
      {loading ? (
        <Loading />
      ) : admin ? (
        <div>
          {
            <div className="admin-review-madre">
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
              <div className="admin-review-contenedor">
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
                        <div key={r.id} value={r.id} className="aaaaaaaa">
                          {r.productoId ? (
                            <div>
                              <Link to={`/adminreview/${r.productoId}`}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  fill="currentColor"
                                  class="bi bi-list-stars"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"
                                  />
                                  <path d="M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53z" />
                                </svg>
                              </Link>
                            </div>
                          ) : null}
                          <div>
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
                        </div>
                      );
                    })
                  : null}
              </div>

              <Link to={`/admin`}>
                <button>Volver al panel del admin</button>
              </Link>
            </div>
          }
          {/* <Link to={`/admin`}>
        <button>Volver al panel del admin</button>
      </Link> */}
        </div>
      ) : (
        <h1> null </h1>
      )}
      {/* <Link to="/">
        <button class="btn btn-outline-warning  mx-3  bg-white text-dark">
          Volver al home
        </button>
      </Link> */}
    </div>
  );
};

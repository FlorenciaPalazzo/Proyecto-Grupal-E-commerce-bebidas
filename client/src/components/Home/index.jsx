import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getBrands, getProducts, getReviewPage } from "../../redux/actions";
import swal from "sweetalert";
import NavBar from "../NavBar";
import Card from "../Card";
import Pagination from "../Pagination";
import Loading from "../Loading";
import ReactStars from "react-rating-stars-component";
import "./HomeStyles.css";

function Home() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products);
  const rev = useSelector((state) => state.reviewPage);
  console.log(rev, "SOY EL REV");
  const navigate = useNavigate();
  const loading = useSelector((state) => state.isLoading);
  const searchProduct = useSelector((state) => state.searchProduct);
  const verified = useSelector((state) => state.currentUser);
  const isLoged = useSelector((state) => state.isLoged);
  const [, /*order*/ setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage /*setProductsPerPage*/] = useState(20); //15 productos por pagina

  const indexOfLastProduct = currentPage * productsPerPage; // 15
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // 0
  //Productos que estan en la pagina actual
  const currentProducts = product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    //no tocar :)
    dispatch(getProducts());
    dispatch(getReviewPage());
  }, []);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch, product, loading, searchProduct, rev]);

  const handleAlertReview = (e) => {
    e.preventDefault();
    swal({
      title: "Debes ingresar con tu usuario",
      text: "...para dejar una reseña ⭐⭐⭐!",
      buttons: {
        cancel: "Ahorita no joven",
        register: {
          text: "Registrarse",
          value: "register",
        },
        login: {
          text: "Iniciar sesion",
          value: "login",
        },
      },
      icon: "warning",
    }).then((value) => {
      if (value === "register") {
        navigate("/register");
      }

      if (value === "login") {
        navigate("/login");
      }
    });
  };

  console.log("searchProduct", searchProduct);
  return (
    <div>
      {loading /* revisen esto!! */ ? (
        <Loading />
      ) : (
        <div className="div-body">
          <NavBar setCurrentPage={setCurrentPage} />
          <div>
            <Pagination
              currentPage={currentPage}
              productsPerPage={productsPerPage}
              product={product.length}
              pagination={pagination}
            />
            <div className="card-container">
              {currentProducts.length > 0 ? (
                currentProducts.map((e) => {
                  return (
                    <div key={e.id} className="div-key-card">
                      <Link to={"/bebida/" + e.id}>
                        <Card
                          nombre={e.nombre}
                          imagen={e.imagen}
                          id={e.id}
                          marca={e.marca}
                          ml={e.ml}
                          graduacion={e.graduacion}
                          precio={e.precio}
                        />
                      </Link>
                    </div>
                  );
                })
              ) : !searchProduct.length ? (
                <div>
                  <h1 className="error">No hay productos con ese nombre</h1>
                </div>
              ) : (
                <div>
                  <h1 className="error">No products were found</h1>
                </div>
              )}
              <div></div>
            </div>
            {/* <div>
            <div className="detail-description">
            {rev ? rev.map(e => {return(
              <div key= {e.id}>
                <p>Titulo: {e.titulo}</p>
                <p>Comentario: {e.comentario}</p>
                <p>Puntaje: <ReactStars
                count={e.puntaje}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                edit={false}
                color="#ffd700"
              /></p>
              </div>
            )}): 
            
            <p>no hay reviews</p>
            }
            </div>
            </div>
          </div> */}
            <div className="footer">
              <div className="text">Contact</div>
              <div className="text">About</div>

              <div>
                <div className="detail-description">
                  {rev ? (
                    rev.map((e) => {
                      return (
                        <div key={e.id}>
                          <p>Titulo: {e.titulo}</p>
                          <p>Comentario: {e.comentario}</p>
                          <p>
                            Puntaje:{" "}
                            <ReactStars
                              count={e.puntaje}
                              size={24}
                              isHalf={true}
                              emptyIcon={<i className="far fa-star"></i>}
                              halfIcon={<i className="fa fa-star-half-alt"></i>}
                              fullIcon={<i className="fa fa-star"></i>}
                              edit={false}
                              color="#ffd700"
                            />
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <p>No hay reviews</p>
                  )}
                </div>
              </div>
              {isLoged ? (
                <Link to="/Review">
                  <button className="button">Contanos tu experiencia</button>
                </Link>
              ) : (
                <Link to="">
                  <button onClick={handleAlertReview} className="button">
                    Contanos tu experiencia
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Home;

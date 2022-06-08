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
import Carousel from "../Carousel";
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
  if (verified) {
    window.localStorage.setItem("user", verified.uid);
    console.log(verified.uid, "SOY UN MILAGRO"); //podemos usar esto para arreglar shopping cart y para el favoritos
  }

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
        cancel: "Seguir navegando",
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

  //////////////👇👇👇aqui modo oscuro 👇👇👇///////////

  const [checked, setChecked] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  useEffect(() => {
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", localStorage.getItem("theme"));
  }, [checked]);

  const toggleThemeChange = () => {
    if (checked === false) {
      localStorage.setItem("theme", "dark");
      setChecked(true);
    } else {
      localStorage.setItem("theme", "light");
      setChecked(false);
    }
  };

  /////////////////👆👆👆aqui modo oscuro 👆👆👆/////////////////
  return (
    <div>
      {loading /* revisen esto!! */ ? (
        <Loading />
      ) : (
        <div className="div-body">
          {/* 👇👇👇modo oscuro para el render 👇👇👇*/}
          <p>Click para cambiar el tema</p>
          <label>
            <input
              type="checkbox"
              defaultChecked={checked}
              onChange={() => toggleThemeChange()}
            />
          </label>
          <NavBar setCurrentPage={setCurrentPage} />
          <div className="banner">
            <img className="banner-img" src="/images/bannerchico.png" alt="banner" />
          </div>
          <div>
            
            <Carousel />
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
                  <h1 className="error">No se encontraron productos</h1>
                </div>
              ) : (
                <div>
                  <h1 className="error">No se encontraron productos</h1>
                </div>
              )}
              <div></div>
            </div>
            <Pagination
              currentPage={currentPage}
              productsPerPage={productsPerPage}
              product={product.length}
              pagination={pagination}
            />
            <div className="footer">

            <Link to="/contact">
            <button className="button">Contacto</button>
          </Link>

              <div className="text">About</div>

              <div>
                <div>
                  {rev ? (
                    rev.map((e) => {
                      return (
                        <div key={e.id}>
                          <p>Titulo: {e.titulo}</p>
                          <p>Comentario: {e.comentario}</p>
                          <div>
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
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <span>No hay reviews</span> // esto es lo que tiraba error del pDOM en la consola
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Home;
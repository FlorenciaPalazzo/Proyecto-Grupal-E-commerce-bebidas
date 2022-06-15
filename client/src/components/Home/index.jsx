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
import CarouselBrands from "../CarouselBrands";
import FilterBy from "../FilterBy";
import Contact from "../Contact";
import Footer from "../Footer";
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
  const admin = useSelector((state) => state.isAdmin);
  const [order, setOrder] = useState("");

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
    if (admin) {
      navigate("/admin");
    }
  }, [dispatch, product, loading, /*  searchProduct, */ rev, admin]);
  console.log("admin", admin);
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
          <FilterBy setCurrentPage={setCurrentPage} />

          <img src="/images/imagen-Registrate3.jpg" class="img-fluid" />

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
                  if (e.descripcion !== null) {
                    //TRANSITE CON CUIDADO, CEMENTO FRESCO.-
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
                            stock={e.stock}
                          />
                        </Link>
                      </div>
                    );
                  }
                })
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
            <div>
              <CarouselBrands />
            </div>

            <div className="cont-contact">
              <div className="form-cont">
                <iframe
                  width="100%"
                  height="100%"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=Distribuidora%20Henry&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                ></iframe>
              </div>

              <div className="form-cont">
                <div className="form-text">Contáctanos</div>
                <Contact />
              </div>
            </div>

            <div className="home-reviews-render">
              {rev ? (

                rev.slice(0, 4).map((e) => {

                  return (
                    <div key={e.id} className='home-reviews-carta'>
                      <p>Titulo: {e.titulo}</p>
                      <p>Comentario: {e.comentario}</p>
                      <div className="home-reviews-star">
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
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}
export default Home;

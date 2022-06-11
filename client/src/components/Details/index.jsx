import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addCart,
  clearState,
  getProductById,
  getReview,
  getProducts,
} from "../../redux/actions";
import "./DetailStyles.css";
import Loading from "../Loading";
import ReactStars from "react-rating-stars-component";
import swal from "sweetalert";
import Card from "../Card";
import NavBar from "../NavBar";
import Footer from "../Footer";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const verified = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const isLoged = useSelector((state) => state.isLoged);
  const product = useSelector((state) => state.detail);
  const rev = useSelector((state) => state.review);
  const products = useSelector((state) => state.products);
  const loading = useSelector((state) => state.isLoading);
  console.log(rev, "SOY EL REV");
  let cart = product;
  const handleCart = (e) => {
    e.preventDefault();
    let cart = product;
    cart.quantity = 1;
    swal({
      title: "Producto agregado al carrito ",
      type: "success",
      icon: "success",
      buttons: false,
      timer: 800,
    });
    dispatch(addCart(cart));
  };
  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getReview(id));
    dispatch(getProducts());
    return () => {
      //componen did unmount
      dispatch(clearState()); // limpio el state de details
    };
  }, [dispatch, id]);

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
  const filterRelacionados = products.filter((e) => e.tipo === product.tipo);
  return (
<div>
{loading /* revisen esto!! */ ? (
        <Loading />
      ) : (
  <div>
  <NavBar/>
  <div class="container">

    <div class="card">
        <div class="card-body">
          <div class=" d-flex justify-content-center">
            <h1 class="display-5 p-4 ">{product.nombre}</h1>
          </div>
            
            
            <div class="row">
                <div class="col-lg-5 col-md-5 col-sm-6">
                    <img src={product.imagen} class="img-responsive" width="75%"/>
                </div>
                <div class="col-lg-7 col-md-7 col-sm-6">
                    <h4 class="box-title mt-5">Descripción</h4>
                    <p dangerouslySetInnerHTML={{ __html: product.descripcion }}/>
                    
                    <button class="btn btn-dark btn-rounded mr-1" data-toggle="tooltip" onClick={handleCart} value={product}>
                    <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-cart-plus"
                viewBox="0 0 18 18"
              >
                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
                    </button>
                    
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <h3 class="box-title mt-5">General Info</h3>
                    <div class="table-responsive">
                        <table class="table table-striped table-product">
                            <tbody>
                                <tr>
                                    <td width="390">Marca</td>
                                    <td>{product.marca}</td>
                                </tr>
                                <tr>
                                    <td>Tamaño</td>
                                    <td>{product.ml}</td>
                                </tr>
                                <tr>
                                    <td>Graduación</td>
                                    <td>{product.graduacion}</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        

       
       <div>
    </div>
    <div className="review-detail">
             {rev.length ? (
               rev.map((e) => {
                 return (
                   <div className="review-body">
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
               <div className="review-body">no hay reviews</div>
             )}
           </div>
           
    
    
</div>
<div>
      <h3>Productos relacionados</h3>
      <div class="card-group">
      
      {filterRelacionados
           ? filterRelacionados.slice(0, 5).map((e) => {
               return (
                 <div key={e.id} class="card">
                   <Link to={"/bebida/" + e.id}>
                   <img src={e.imagen} class="card-img-top"/>
                    <div class="card-body">
                      <h5 class="card-title">{e.nombre}</h5>
                      <p class="card-text">${e.precio}</p>
                    </div>
                   </Link>
                 </div>
               );
             })
           : null}
</div>
    </div>
</div>
<Footer/>
</div>
      )}
</div>
  );
}

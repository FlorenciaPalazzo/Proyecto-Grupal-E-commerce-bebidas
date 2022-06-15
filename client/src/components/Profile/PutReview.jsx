import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import {
  findReviewId,
  getProducts,
  getReview,
  postReview,
  putReview,
} from "../../redux/actions";
import NavBarSec from "../NavBarSec";
import '../Review/ReviewStyles.css'

function validate({
  value,
  name,
  setTituloError,
  setComentarioError,
  setPuntajeError,
}) {
  console.log("VALUE", value);
  if (name === "titulo") {
    if (value.length === 0) {
      setTituloError("Debes ingresar un titulo");
    } else if (value.length < 4) {
      setTituloError("El titulo debe contener mas caracteres");
    } else if (value.length > 40) {
      setTituloError("El titulo es demasiado largo");
    } else setTituloError(null);
  }
  if (name === "comentario") {
    if (value.length === 0) {
      setComentarioError("Debes ingresar un comentario");
    } else if (value.length < 5) {
      setComentarioError("¡El comentario es muy corto, queremos saber mas!");
    } else if (value.length > 250) {
      setComentarioError("El comentario es demasiado largo");
    } else setComentarioError(null);
  }
  /* if(name === "puntaje") */
}

export default function PutReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  //   const usuario = useSelector((state) => state.currentUser);
  let products = useSelector((state) => state.products);
  console.log(products, 'productos del state')
  //   let [bool, setBool] = useState(false);
  const review = useSelector((state) => state.findreview);
  console.log(review, 'qque review es')
  
  let revsLocal = JSON.parse(localStorage.getItem("userputid"));
  console.log(revsLocal, "AAAAAAAAAAAAAAAAAAAA");
  let prod = products.filter((e) => e.id === revsLocal.productoId);
  console.log(prod, 'productos para cuando')
  const [tituloError, setTituloError] = useState(null);
  const [comentarioError, setComentarioError] = useState(null);
  const [puntajeError, setPuntajeError] = useState(null);
  //   let idUser = localStorage.getItem("user");
  //   useEffect(() => {}, [usuario]);
  let imgLocal 
   if(revsLocal.length){
  products.forEach(e => {
    console.log(e, 'que tiene el forEach')
    if(e.id === revsLocal.productoId){
      imgLocal = e.imagen;
    }
  })
}
console.log(imgLocal, 'imagen local')
  const [input, setInput] = useState({
    titulo: revsLocal.titulo,
    comentario: revsLocal.comentario,
    puntaje: "",
    usuarioId: revsLocal.usuarioId,
    productoId: revsLocal.productoId,
    id: revsLocal.id,
  });

  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    let name = e.target.name;
    let value = e.target.value;
    console.log("name", name);
    validate({
      name,
      value,
      setTituloError,
      setComentarioError,
    });
  };
  const ratingChanged = (newRating) => {
    setInput({ ...input, puntaje: newRating });
  };

  //   const handlePut = (e) => {
  //     e.preventDefault();
  //     console.log(input, 'HANDLE PPUT')
  //     setBool(!bool);

  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    swal({
      title: "Review dejada con exito ",
      type: "success",
      icon: "success",
      buttons: false,
      timer: 800,
    });
    console.log("input", input);
    dispatch(putReview(input));
    console.log(input, "dispatch input");
    setInput({
      titulo: "",
      comentario: "",
      puntaje: "",
      usuarioId: "",
      productoId: "",
      id: "",
    });
    navigate("/profile");
  };
  useEffect(() => {
    dispatch(getProducts())
  },[])
  useEffect(() => {
    dispatch(findReviewId(id));
    return () => {
      dispatch(findReviewId(id));
      // dispatch(getProducts())
    };
  }, [dispatch]);
  return (
    <div>
      <NavBarSec />
      <div className="reviewContainer">
      {prod && prod[0] ? (
        <div className="logoFondo">
          {/* <h1>¡Contanos que te parecio {prod[0].nombre}!</h1> */}
          <img src={prod[0].imagen } width="50%" />
        </div>
      ) : imgLocal && imgLocal ?  (
        <div className="logoFondo">
        <img src={imgLocal} width="50%" />
        </div>
      ) : (
      <div className="logoFondo">
      <img  src="/images/logo.png" width="50%" />
      </div>
      )}
      <div class="registration-form" className="reviewForm">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="reviewLabel">Titulo:</label>
          <div class="form-group">
          <input
            type="text"
            class="form-control item"
            placeholder={input.titulo}
            // value={input.titulo}
            name="titulo"
            onChange={handleOnChange}
          />
          </div>
        </div>
        <div>
          {tituloError && <span className="register-span ">{tituloError}</span>}{" "}
        </div>
        <div>
          <label className="reviewLabel">Comentario:</label>
          <textarea class="form-control item"
            placeholder={input.comentario}
            // value={input.comentario}
            name="comentario"
            onChange={handleOnChange}
          />
        </div>
        <div>
          {comentarioError && (
            <span className="register-span ">{comentarioError}</span>
            )}
        </div>
        <div>
          <ReactStars
            name="puntaje"
            count={5}
            onChange={ratingChanged}
            size={24}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
        </div>
        {!input.puntaje && (
          <span className="register-span ">¡No te olvides de puntuarnos! </span>
          )}
        <div className="buttonsReview">
          {!tituloError &&
          !comentarioError &&
          input.puntaje &&
          input.comentario &&
          input.titulo ? (
            <button class="btn btn-dark" type="submit">
              Puntuar
            </button>
          ) : (
            <div>¡Debes llenar todos los campos!</div>
            )}
        <div>   
          <Link to="/profile">
            <button class="btn btn-dark">Atras</button>
          </Link>
        </div> 
        </div>
      </form>
      </div>
      </div>
    </div>
  );
}

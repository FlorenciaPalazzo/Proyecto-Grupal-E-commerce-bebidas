import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { getProducts, postReview } from "../../redux/actions";
import { Link, useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import NavBarSec from '../NavBarSec'
import './ReviewStyles.css'

//no hay titulo, description, puntaje
//titulo mayor 4 y menor a 40
//description mayor a 10 y menor 250
//puntaje haya
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

export default function PostReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const usuario = useSelector((state) => state.currentUser);
  let products = useSelector((state) => state.products);
  const [tituloError, setTituloError] = useState(null);
  const [comentarioError, setComentarioError] = useState(null);
  const [puntajeError, setPuntajeError] = useState(null);

  let prod = products.filter((e) => e.id === id);
  let idUser = localStorage.getItem("user");
  useEffect(() => {}, [usuario]);
  const [input, setInput] = useState({
    titulo: "",
    comentario: "",
    puntaje: "",
    usuarioId: idUser,
    productoId: id,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("dejoRevPag", JSON.parse(true));
    swal({
      title: "Review dejada con exito ",
      type: "success",
      icon: "success",
      buttons: false,
      timer: 800,
    });
    dispatch(postReview(input));
    setInput({
      titulo: "",
      comentario: "",
      puntaje: "",
    });

    navigate("/");
    console.log(setInput);
  };
  useEffect(() => {
    dispatch(getProducts());
    return () => {
      dispatch(getProducts());
    };
  }, []);
  return (
    <div>
      <NavBarSec />
    <div className="reviewContainer">
      {prod && prod[0] ? (
          <div className="logoFondo">
          {/* <h1>¡Contanos que te parecio {prod[0].nombre}!</h1> */}
          <img src={prod[0].imagen} width="50%" />
        </div>
      ) : (
        
        <div className="logoFondo">
        {/* <div className="reviewPage">
        <h1>¡Contanos tu opinion sobre nosotros!</h1>
        </div> */}
        <img  src="/images/logo.png" width="50%" />
        </div>
      
      )}
      <div class="registration-form" className="reviewForm">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div >
          <label className="reviewLabel">Titulo:</label>
          <div class="form-group">
          <input
            type="text"
            class="form-control item"
            placeholder="Titulo"
            /* value={input.titulo} */
            name="titulo"
            onChange={handleOnChange}
            />
            </div>
        <div>
          {tituloError && <span className="register-span ">{tituloError}</span>}{" "}
        </div>
        <div>
          <label className="reviewLabel">Comentario:</label>
          <textarea class="form-control item"
            placeholder="Comentario"
            /* value={input.comentario} */
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
          <Link to="/">
            <button class="btn btn-dark">Back</button>
          </Link>
        </div>
            </div>
        </div>
      </form>
      </div>
    </div>
    </div>
  );
}

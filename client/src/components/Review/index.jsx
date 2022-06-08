import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { getProducts, postReview } from "../../redux/actions";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function PostReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const usuario = useSelector((state) => state.currentUser);
  let products = useSelector((state) => state.products);

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
  };
  const ratingChanged = (newRating) => {
    setInput({ ...input, puntaje: newRating });
  };

  console.log(idUser);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      {prod && prod[0] ? (
        <div>
          <h1>¡Contanos que te parecio {prod[0].nombre}!</h1>
          <img src={prod[0].imagen} width="30%" />
        </div>
      ) : (
        <h1>¡Contanos tu opinion sobre nosotros!</h1>
      )}

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Titulo:</label>
          <input
            type="text"
            placeholder="Titulo"
            value={input.titulo}
            name="titulo"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>Comentario:</label>
          <textarea
            placeholder="comentario"
            value={input.comentario}
            name="comentario"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
        </div>

        <div>
          <button className="button" type="submit">
            Puntuar
          </button>
        </div>
        <div>
          <Link to="/">
            <button className="button">Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

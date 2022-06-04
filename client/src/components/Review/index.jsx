import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { postReview } from "../../redux/actions";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function PostReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const usuario = useSelector((state) => state.currentUser);
  let idUser = usuario ? usuario.uid : "toni";

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
  return (
    <div>
      <h1>Dejanos un comentario y ganate un tetra.</h1>
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
          <input
            type="text"
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

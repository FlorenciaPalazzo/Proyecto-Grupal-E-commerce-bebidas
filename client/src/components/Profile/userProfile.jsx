import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from "react-file-base64";
import { auth } from "../../fb";
import { sendPasswordResetEmail } from "firebase/auth";
import { getUserDb, resetUserDb } from "../../redux/actions";
import ReactStars from "react-rating-stars-component";
import { ReviewCar } from "../Review/ReviewCar";
import './userProfile.css'
import {
  deleteReview,
  getAllReviews,
  getReview,
  getReviewPage,
  putReview,
} from "../../redux/actions";
import { Link, useNavigate, useParams } from "react-router-dom";
//import db from "../../../../api/src/db";

function UserProfile() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const dbUser = useSelector((state) => state.dbUser);
  const user = useSelector((state) => state.currentUser);
  const prod = useSelector((state) => state.products);
  const [endLoading, setEndLoading] = useState(false);
  const {id} = useParams();

  let revs = useSelector((state) => state.allReviews);
  const prodFind = prod.filter((e) => e.id === revs.productoId);
  console.log(prodFind, "productoId");

  let [bool, setBool] = useState(false);
  console.log("user", user);
  let allRevs = revs.filter((e) => user.uid === e.usuarioId);

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(deleteReview(e.target.value));
    setBool(!bool);
  };
  const handleLocalStorage = (e) => {
    e.preventDefault();
  localStorage.setItem("userputid", e.target.value)
  console.log(e.target.value, 'soy el console')
    navigate(`/putreview/${e.target.name}`)
  };

  useEffect(() => {
    if (user) {
      dispatch(getUserDb(user.uid));
    }

    setEndLoading(true);
    dispatch(getAllReviews());
    return () => {
      dispatch(resetUserDb());
      dispatch(getAllReviews());
    };
  }, [dispatch, endLoading, bool]);

  return (
    <div className="user-profile-contenedor">
      <h1>Perfil de usuario</h1>
      <h2>{user && user.email}</h2>
      <h2>{dbUser && dbUser.nombre} </h2>
      <div>
        {
          /* !user.photoURL && dbUser */ dbUser?.image ? (
            <img src={dbUser.image} alt="" />
          ) : user.photoURL ? (
            <img src={user.photoURL} alt="" />
          ) : (
            <img src="./images/default.jpg" alt="" />
          )
        }
        <h2>Reviews</h2>
        {allRevs.length ? (
          allRevs.map((r) => {
            return (
              <div key={r.id} value={r.id} className='aaaaaaa' >
                <ReviewCar
                  titulo={r.titulo}
                  comentario={r.comentario}
                  puntaje={r.puntaje}
                  producto={r.productoId}
                  fecha={r.createdAt}
                />
                <div className="boton-editar-rev">
                <button onClick={handleLocalStorage} value={JSON.stringify(r)} name={r.id}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                </svg>
                </button>
                </div>
              </div>
            );
          })
        ) : (
          <div>No hay reviews!</div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;

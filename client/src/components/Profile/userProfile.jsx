import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from "react-file-base64";
import { auth } from "../../fb";
import { sendPasswordResetEmail } from "firebase/auth";
import { getUserDb, resetUserDb } from "../../redux/actions";
import ReactStars from "react-rating-stars-component";
import { ReviewCar } from "../Review/ReviewCar";

import {
  deleteReview,
  getAllReviews,
  getReview,
  getReviewPage,
  putReview,
} from "../../redux/actions";
//import db from "../../../../api/src/db";

function UserProfile() {
  const dispatch = useDispatch();
  const dbUser = useSelector((state) => state.dbUser);
  const user = useSelector((state) => state.currentUser);
  const prod = useSelector((state) => state.products);
  const [endLoading, setEndLoading] = useState(false);

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
  const handlePut = (e) => {
    e.preventDefault();
    dispatch(putReview(e.target.value));
    setBool(!bool);
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
    <div>
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
              <div key={r.id} value={r.id}>
                <ReviewCar
                  titulo={r.titulo}
                  comentario={r.comentario}
                  puntaje={r.puntaje}
                  producto={r.productoId}
                  fecha={r.createdAt}
                />
                <div></div>
                <button onClick={handleDelete} value={r.id}>
                  ❌
                </button>
                <button onClick={handlePut} value={r.id}>
                  ✏️
                </button>
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

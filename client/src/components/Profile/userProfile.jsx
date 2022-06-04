import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import {
  deleteReview,
  getAllReviews,
  getReview,
  getReviewPage,
  putReview,
} from "../../redux/actions";
import { ReviewCar } from "../Review/ReviewCar";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);
  let revs = useSelector((state) => state.allReviews);
  console.log("user", user);

  let allRevs = revs.filter((e) => user.uid === e.usuarioId);
  const handleDelete = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(deleteReview(e.target.value));
    window.location.reload();
  };
  const handlePut = (e) => {
    e.preventDefault();
    dispatch(putReview(e.target.value));
    //window.location.reload()
    console.log("Me meto al put");
  };
  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch /* , allRevs */]);

  return (
    <div>
      <h1>User Profile</h1>
      <h2>{user && user.email}</h2>
      <div>
        <h2>Reviews</h2>
        {allRevs &&
          allRevs.map((r) => {
            return (
              <div key={r.id} value={r.id}>
                <ReviewCar
                  titulo={r.titulo}
                  comentario={r.comentario}
                  puntaje={r.puntaje}
                />
                <button onClick={handleDelete} value={r.id}>
                  ❌
                </button>
                <button onClick={handlePut} value={r.id}>
                  ✏️
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default UserProfile;

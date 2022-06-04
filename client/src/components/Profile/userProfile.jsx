import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  deleteReview,
  getAllReviews,
  getReview,
  getReviewPage,
  putReview,
} from "../../redux/actions";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);
  let revs = useSelector((state) => state.allReviews);
  console.log("user", user);

  let allRevs = revs.filter((e) => user.uid === e.usuarioId);
  let idRev;
  const handleDelete = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(deleteReview(e.target.value));
  };
  const handlePut = (e) => {
    e.preventDefault();
    dispatch(putReview(e.target.value));
    console.log("Me meto al put");
  };
  useEffect(() => {
    dispatch(getAllReviews());
    navigate("/profile");
  }, [dispatch]);

  return (
    <div>
      <h1>User Profile</h1>
      <h2>{user && user.email}</h2>
      <div>
        <h2>Reviews</h2>
        {allRevs &&
          allRevs.map((r) => {
            //console.log("r.id", r.id);  esto le tengo que pasar al handle
            return (
              <div key={r.id} value={r.id}>
                <p>Titulo: {r.titulo}</p>
                <p>Comentario: {r.comentario}</p>
                <p>
                  Puntaje:{" "}
                  <ReactStars
                    count={r.puntaje}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    edit={false}
                    color="#ffd700"
                  />
                </p>
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

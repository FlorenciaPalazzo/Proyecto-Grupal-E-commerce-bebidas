import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { useEffect } from "react";
import {
  deleteReview,
  getAllReviews,
  getReview,
  getReviewPage,
  putReview,
} from "../../redux/actions";

function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);
  let revs = useSelector((state) => state.allReviews);
  console.log("user", user);

  let allRevs = revs.filter((e) => user.uid === e.usuarioId);
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReview());
  };
  const handlePut = (e) => {
    e.preventDefault();
    dispatch(putReview());
  };
  useEffect(() => {
    /* dispatch(getReviewPage());
    dispatch(getReview()); */
    dispatch(getAllReviews());
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      <h2>{user && user.email}</h2>
      <div>
        <h2>Reviews</h2>
        {
          allRevs &&
            allRevs.map((e) => {
              return (
                <div key={e.id}>
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
                  <button onClick={handlePut}>✏️</button>
                  <button onClick={handleDelete}>❌</button>
                </div>
              );
            })
          /*  : (
          <div>No hay reviews hasta el momento</div>
        ) */
        }
      </div>
    </div>
  );
}

export default UserProfile;

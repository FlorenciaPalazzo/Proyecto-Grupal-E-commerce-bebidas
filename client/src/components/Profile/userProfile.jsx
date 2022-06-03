import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { use } from "../../../../api/src/routes/modules/review";
import { getReview, getReviewPage } from "../../redux/actions";

function UserProfile() {
  const user = useSelector((state) => state.currentUser);
  // const dispatch = useDispatch();
  let rev = useSelector((state) => state.review);
  let revPage = useSelector((state) => state.reviewPage);

  let revTotalus = rev.concat(revPage);
  console.log(revTotalus, 'ASDSADASD');

  // useEffect(() =>{
  //   dispatch(getReview(id))
  //   dispatch(getReviewPage())
  // },[dispatch, id])

  return (
    <div>
      <p>User Profile</p>
      <p>{user && user.email}</p>
    </div>
  );
}

export default UserProfile;

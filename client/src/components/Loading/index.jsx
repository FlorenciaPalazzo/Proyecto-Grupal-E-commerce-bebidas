import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../fb";
import {
  isAdmin,
  setUser,
  setLoading,
  getUserDb,
  updateUser,
  getStats,
} from "../../redux/actions";
import gif from "./loader.gif";
import "./loading.css"
function Loading() {
  const loading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("effect loading");
    console.log(auth.currentUser);
    dispatch(getStats());
    onAuthStateChanged(auth, (currUser) => {
      if (currUser && currUser.emailVerified) {
        console.log("entro a actulizar el usuario");
        dispatch(
          updateUser({
            id: currUser.uid,
            isVerified: currUser.emailVerified,
          })
        );
      }
      if (currUser) {
        dispatch(getUserDb(currUser.uid));
        dispatch(setUser(currUser));
        dispatch(isAdmin(currUser.email));
      } else {
        console.log("el loading no enconrtro un usuario activo");
        //dispatch(setLoading(loading))
      }
      dispatch(setLoading(!loading));
    });
  }, []);
  return (
    <div className="container-loading">
      <div className="loading">

        <img src={gif} alt="" />
      </div>
    </div>
  );
}

export default Loading;

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../fb";
import { isAdmin, setUser, setLoading, getUserDb } from "../../redux/actions";

function Loading() {
  const loading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("effect loading");
    console.log(auth.currentUser);
    dispatch(getUserDb())
    onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        console.log("el loading enconrtro un usuario activo");
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
    <div>
      <p>Loading...</p>
    </div>
  );
}

export default Loading;

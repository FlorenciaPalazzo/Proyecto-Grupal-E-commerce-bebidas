import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin, login, setUser, setLoading } from "../../redux/actions";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import { app, auth } from "../../fb";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Loading from "../Loading";

function Home () {
  const admin = useSelector((state) => state.isAdmin);
  const user =  useSelector((state) => state.currentUser);
  const message = useSelector((state) => state.message);
  const state = useSelector((state) => state);
  const loading = useSelector((state) => state.isLoading);

  const dispatch = useDispatch();
  function cuser() {
//     onAuthStateChanged(auth, (currUser) => {
//       console.log(currUser);
//       //dispatch(setUser(currUser))
//     });
    console.log(auth.currentUser);
    console.log("state", state);
  }
  function out(){
    signOut(auth).then(() => {
      console.log("logout");
      //dispatch(setLoading(true))
      dispatch(setUser(null))
      //dispatch(setLoading(false))
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
  }

  function prueba (){
      //dispatch(setMessage())
  } 
  useEffect(() => {

    // if(user && !user.email){
    //      onAuthStateChanged(auth, (currUser) => {
    //          console.log(currUser);
    //          dispatch(setUser(currUser))
    //          dispatch(isAdmin(currUser.email))
    //        });
    // }
    console.log("loading home", loading);
    console.log("state home", state);
  }, [loading]);
  return (
    <div>
        { loading ?
            <Loading/>
            :
            <div>
                <h1>Home</h1>
                {user ? 
                    <p>
                        {user.email}
                    </p>
                    :
                    <p>
                        No iniciaste sesion
                    </p>
                }
                <NavBar />
                <button onClick={cuser}>ver user</button>
                {
                    user ?
                    <div>
                        <Link to="/profile">
                            <button>profile</button>
                        </Link>
                        <button onClick={out}>logout</button>
                    </div>
                :
                
                <Link to="/login">
                    <button>login</button>
                </Link>
                }
                    <button onClick={prueba}>dispatch</button>
            </div>          
        }
    </div>
  );
}

export default Home;
// front-alcaraz
// ultima

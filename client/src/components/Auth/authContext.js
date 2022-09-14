import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../fb";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin, setLoading, setUser, updateUser } from "../../redux/actions";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export function AuthProvider({ children }) {
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.currentUser);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => signOut(auth);

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {

    
    console.log("effect del context");
     onAuthStateChanged(auth, (currUser) => {
      console.log("onAuthStateChanged del context");
      if (currUser && currUser.emailVerified) {
        dispatch(
          updateUser({
            id: currUser.uid,
            isVerified: currUser.emailVerified,
          })
        );
      }
      if (currUser) {
        console.log("currUser dd", currUser);
        dispatch(setUser(currUser));
        dispatch(isAdmin(currUser.email));
      } else {
        navigate("/")
        console.log("el loading no enconrtro un usuario activo");
        //dispatch(setLoading(loading))
      }
      // dispatch(setLoading(!loading));
      setLoading(false);
    }) 
    
  }, [user]);


  if(!loading){

    return (
      <authContext.Provider
        value={{
          signup,
          login,
          user,
          logout,
          loading,
          loginWithGoogle,
          resetPassword,
        }}
      >
        { children }
      </authContext.Provider>
    );
  } else {
    return <Loading /> 
  }

}

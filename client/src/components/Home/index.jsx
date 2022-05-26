import React, { useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Login from "../Login";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBrands, getProducts, isAdmin, setUser, setLoading} from "../../redux/actions";
import NavBar from "../NavBar";
import Card from "../Card";
import { app, auth } from "../../fb";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Loading from "../Loading";

function Home() {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products);
  const admin = useSelector((state) => state.isAdmin);
  const loading = useSelector((state) => state.isLoading);
  
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

  useEffect(() => {
    console.log("effect");
    adminHandler();
    dispatch(getProducts());
    dispatch(getBrands());
  }, [user, dispatch,loading]);
  console.log(user, admin);
  return (
    <div>
     { loading ?
            <Loading/>
            :
      <NavBar />
      <Login />
      {product &&
        product.map((e) => {
          return (
            <div key={e.id}>
              <Link to={"/bebida/" + e.id}>
                <Card
                  nombre={e.nombre}
                  imagen={e.imagen}
                  id={e.id}
                  marca={e.marca}
                  ml={e.ml}
                  graduacion={e.graduacion}
                  precio={e.precio}
                />
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default Home;
// front-alcaraz
// ultima

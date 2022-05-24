import React, { useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Login from "../Login";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin } from "../../redux/actions";
import NavBar from "../NavBar";
import Card from "../Card";
function Home() {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products);
  const admin = useSelector((state) => state.isAdmin);
  function adminHandler() {
    if (isAuthenticated && user) {
      dispatch(isAdmin(user.email));
    }
  }

  useEffect(() => {
    console.log("effect");
    adminHandler();
  }, [user, product]);
  console.log(user, admin);
  return (
    <div>
      <NavBar />
      {isAuthenticated && (
        <div>

          <span>
            Hi, {user.name}{" "}
            <img width={50} height={50} src={user.picture} alt={user.name} />
          </span>
          <div>Logged: {String(isAuthenticated)}</div>
          <div>Verified: {String(user.email_verified)}</div>
          <div>Is Admin: {String(admin)}</div>
        </div>
      )}

      <Login />
      {product &&
        product.map((e) => {
          return (
            <Card
              nombre={e.nombre}
              imagen={e.imagen}
              id={e.id}
              marca={e.marca}
              ml={e.ml}
              graduacion={e.graduacion}
              precio={e.precio}
            />
          );
        })}
    </div>
  );
}

export default Home;
// front-alcaraz
// ultima

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBrands, getProducts } from "../../redux/actions";
import NavBar from "../NavBar";
import Card from "../Card";
import Loading from "../Loading";

function Home() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products);
  const user = useSelector((state) => state.currentUser);
  const admin = useSelector((state) => state.isAdmin);
  const loading = useSelector((state) => state.isLoading);
  useEffect(() => {
    console.log("effect");
    dispatch(getProducts());
    dispatch(getBrands());
  }, [dispatch, loading]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <NavBar />
          <div>{user.email}</div>
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
      )}
    </div>
  );
}

export default Home;
// nueva-alcaraz
// ultima

import React, { useEffect, useState } from "react";
import { useAuth0, /*withAuthenticationRequired*/ } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBrands, getProducts, isAdmin } from "../../redux/actions";
import NavBar from "../NavBar";
import Card from "../Card";
import Pagination from "../Pagination";
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

  const [, /*order*/ setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage /*setProductsPerPage*/] = useState(15); //15 productos por página

  const indexOfLastProduct = currentPage * productsPerPage; // 15
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // 0
  //Productos que estan en la pagina actual
  const currentProducts = product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => { 
    console.log(product);
    console.log("effect");
    adminHandler();
    if(product.length === 0){
      dispatch(getProducts());
    }
    dispatch(getBrands());
  }, [user, dispatch, product]);
 
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

      <div>
      <Pagination
          productsPerPage={productsPerPage}
          product={product.length}
          pagination={pagination}
          />
          <div>
            
            {currentProducts.length > 0 ? (
            currentProducts.map((e) => {
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
        })) : (
        <div>
          <h1 className="error">No products were found</h1>
          </div>)
        }
        </div>
        </div>
          
      
    </div>
  );
}

export default Home;
// front-alcaraz
// ultima

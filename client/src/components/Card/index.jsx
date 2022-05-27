import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCart, setFavorito } from "../../redux/actions";

export default function Card({
  nombre,
  imagen,
  id,
  marca,
  ml,
  graduacion,
  precio,
}) {
  //let [localProduct, setLocalProduct] = useState();
  const globalCart = useSelector((state) => state.productCart);
  let productObject = { nombre, imagen, id, marca, ml, graduacion, precio };
  const dispatch = useDispatch();
  let [carrito, setCarrito] = useState(
    JSON.parse(window.localStorage.getItem("product")) //
  ); // :)

  const handleAddCarrito = (e) => {
    console.log("productObject: ", productObject);
    e.preventDefault();
    dispatch(addCart(productObject));
    setCarrito([...globalCart, productObject]);
  };

  const handleAddFavProd= (e) =>{
    e.preventDefault();
    dispatch(setFavorito())
  }

  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(carrito));
    return () => {
      JSON.parse(window.localStorage.getItem("product"));
    };
  }, [carrito, "product"]);

  //acá traigo todas las propiedades
  return (
    //empiezo a renderizar
    <div className="card-main">
      {" "}
      {/*div contenedor principal*/}
      <Link to={"/bebida/" + id}>

          <div className="card">
              {" "}
              {/*div de la card*/}
              <img
                className="card-imagen"
                src={imagen}
                alt="img not found"
                width="30%"
              />{" "}
              {/*imagen del producto*/}

                  <div className="card-content">
                    {" "}
                    {/*div del contenido*/}
                    <h2 className="card-title"> {nombre} </h2> {/*nombre del producto*/}
                    <p className="card-body">
                      {" "}
                      {/*cuerpo de la card*/}
                      Brand: {marca} <br /> {/*Marca*/}
                      Alcohol content: {graduacion} % <br /> {/*Graduacion*/}
                      Size: {ml}ml <br /> {/*Tamaño en mililitros*/}
                      Price: ${precio} <br /> {/*Precio*/}
                    </p>
                  
                   </div>
          </div>
     </Link>
          <button onClick={handleAddCarrito}>Agregar al carrito!</button>

          <button onClick={(e)=>handleAddCarrito(e)}>❤</button>
            {/*Boton para favorito*/}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addCart } from "../../redux/actions";

// export default function Card({
//   nombre,
//   imagen,
//   id,
//   marca,
//   ml,
//   graduacion,
//   precio,
// }) {
//   //let [localProduct, setLocalProduct] = useState();
//   const globalCart = useSelector((state) => state.productCart);
//   let productObject = { nombre, imagen, id, marca, ml, graduacion, precio };
//   const dispatch = useDispatch();
//   let [carrito, setCarrito] = useState(
//     JSON.parse(window.localStorage.getItem("product"))
//   ); // :)

//   const handleAddCarrito = (e) => {
//     console.log("productObject: ", productObject);
//     e.preventDefault();
//     dispatch(addCart(productObject));
//     setCarrito(globalCart);
//   };

//   useEffect(() => {
//     localStorage.setItem("product", JSON.stringify(carrito));
//   }, [carrito]);

//   //acá traigo todas las propiedades
//   return (
//     //empiezo a renderizar
//     <div className="card-main">
//       {" "}
//       {/*div contenedor principal*/}
//       <div className="card">
//         {" "}
//         {/*div de la card*/}
//         <button onClick={handleAddCarrito}>Agregar al carrito!</button>
//         <img
//           className="card-imagen"
//           src={imagen}
//           alt="img not found"
//           width="30%"
//         />{" "}
//         {/*imagen del producto*/}
//         <div className="card-content">
//           {" "}
//           {/*div del contenido*/}
//           <h2 className="card-title"> {nombre} </h2> {/*nombre del producto*/}
//           <p className="card-body">
//             {" "}
//             {/*cuerpo de la card*/}
//             Brand: {marca} <br /> {/*Marca*/}
//             Alcohol content: {graduacion} % <br /> {/*Graduacion*/}
//             Size: {ml}ml <br /> {/*Tamaño en mililitros*/}
//             Price: ${precio} <br /> {/*Precio*/}
//           </p>
//           <button href={id} className="button">
//             Details
//           </button>{" "}
//           {/*Boton para ver los detalles*/}
//         </div>
//       </div>
//     </div>
//   );
// }

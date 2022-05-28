import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../redux/actions";

export default function Card({
  nombre,
  imagen,
  id,
  marca,
  ml,
  graduacion,
  precio,
}) {
  let productObject = {
    nombre,
    imagen,
    id,
    marca,
    ml,
    graduacion,
    precio,
    quantity: 1,
  };
  const dispatch = useDispatch();

  const handleAddCarrito = (e) => {
    e.preventDefault();
    dispatch(addCart(productObject));
  };

  //acá traigo todas las propiedades
  return (
    //empiezo a renderizar
    <div className="card-main">
      {" "}
      {/*div contenedor principal*/}
      <div className="card">
        {" "}
        {/*div de la card*/}
        <button onClick={handleAddCarrito}>Agregar al carrito!</button>
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
          <button href={id} className="button">
            Details
          </button>{" "}
          {/*Boton para ver los detalles*/}
        </div>
      </div>
    </div>
  );
}

//-------sabado a la mañana al principio
/* 
//let products = useSelector((state) => state.productCart);
  const saveLocalStorage = () => {
    let result = JSON.parse(window.localStorage.getItem("auxiliar"));
    localStorage.setItem("product", JSON.stringify(result)); //lo guarda
  };
  const getLocalStorage = () => {
    JSON.parse(localStorage.getItem("product")); //trae todos
  };
  const auxLocalStorage = () => {
    /*  localStorage.length === 0? 
    localStorage.setItem("auxiliar", JSON.stringify(productObject));
  };

  useEffect(() => {
    saveLocalStorage();
  }, []);
  useEffect(() => {
    getLocalStorage();
  }, [dispatch]);
*/

//--------------------viernes "andando"
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
//   const dispatch = useDispatch();
//   let productObject = { nombre, imagen, id, marca, ml, graduacion, precio };
//   let products = useSelector((state) => state.productCart);
//   const saveLocalStorage = () => {
//     localStorage.setItem("product", JSON.stringify(products)); //lo guarda
//   };
//   const getLocalStorage = () => {
//     JSON.parse(localStorage.getItem("product")); //trae todos
//   };
//   const handleAddCarrito = (e) => {
//     //dudas
//     e.preventDefault();
//     dispatch(addCart(productObject));
//   };

//   useEffect(() => {
//     //se puede cambiar
//     console.log("Se crea el localSto");
//     saveLocalStorage();
//   }, []);
//   useEffect(() => {
//     console.log("Se actualiza el local sto");
//     getLocalStorage();
//   }, [products]);
//   //----------------------------------------------------------------------------------hasta aca "anda"
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

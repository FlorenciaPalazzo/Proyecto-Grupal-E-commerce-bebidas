//  <nav class="navbar navbar-expand-lg navbar-light bg-light">
//       {isLoged ? (
//         <div > 

//           <div className="nav-right">
//             <Link to={`/favoritos/${usuarioActual.uid}`}>
//               <button className="button">Ver Favoritos</button>
//             </Link>

//             <Link to={`/historial/${usuarioActual.uid}`}>
//             <button className="button" > Historial de compras </button>
//             </Link>

//             <Link to="/cart">
//               <button className="button-cart">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
//                   <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" />
//                 </svg>
//               </button>
//             </Link>

//             <div className="dropdown">
//               <button class="navbar-toggler"> Tu cuenta </button>
//               <div className="dropdown-content">
//                 <button className="button" onClick={out}>
//                   Logout
//                 </button>
//                 <button className="button" onClick={() => navigate("/profile")}>
//                   Perfil
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="nav-links">
//           <div className="button-search">
//            <SearchBar  setCurrentPage={setCurrentPage}/>
//            </div>

//           <div className="nav-right">
          

//             <Link to="/cart">
//               <button className="button-cart">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
//                   <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" />
//                 </svg>
//               </button>
//             </Link>
//             <div className="dropdown">
//               <button className="dropbtn"> Tu cuenta </button>
//               <div className="dropdown-content">
//                 <button className="button" onClick={() => navigate("/login")}>
//                   Login
//                 </button>
//                 <button
//                   className="button"
//                   onClick={() => navigate("/register")}
//                 >
//                   Registrarse
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="div-filter-main">
//         <FilterBy setCurrentPage={setCurrentPage} />
       
//       </div>
//       {/* <div className="div-searchbar">
        
//       </div> */}
//     </nav>

//////////////////////filtros////////////////////

//   <div className="div-filter">

//     <div className="div-select">
//       <select className="selector" name="" id="" onChange={handleBrand}>
//         <option>Marcas</option>
//         <option value="all">Todas</option>
//         {brands &&
//           brands.map((b) => (
//             <option key={b} name={b} value={b}>
//               {b}
//             </option>
//           ))}
//       </select>
//     </div>
//     <div className="div-select">
//       <select className="selector" onChange={handleType} defaultValue="Type">
//         <option value="">Tipos</option>
//         <option value="all">Todas</option>
//         {/* puede sacarse */}
//         <option value="cerveza">Birras</option>
//         <option value="vino">Vinos</option>
//         <option value="espumante">Espumantes</option>
//         <option value="destilado">Destilados</option>
//       </select>
//     </div>
//     <div className="div-select">
//       <select
//         className="selector"
//         name=""
//         id=""
//         onChange={handleGraduation}
//         defaultValue="Graduation"
//       >
//         <option value="">Graduacion</option>
//         <option value="all">Todas</option>
//         {/* puede sacarse */}
//         <option value="low">3°-20°</option>
//         <option value="medium">21°-38°</option>
//         <option value="high">39°-55°</option>
//       </select>
//     </div>
//     <div className="div-select">
//       <select
//         className="selector"
//         name=""
//         id=""
//         onChange={handleML}
//         defaultValue="ML"
//       >
//         <option value="">ML</option>
//         <option value="all">Todos</option>
//         {/* puede sacarse */}
//         <option value="ml_1">150ml-400ml</option>
//         <option value="ml_2">400ml-750ml</option>
//         <option value="ml_3">750ml-950ml</option>
//         <option value="ml_4">950ml-1500ml</option>
//       </select>
//     </div>
//     <div className="div-select">
//       <select
//         className="selector"
//         name=""
//         id=""
//         onChange={handlePrice}
//         defaultValue="Price"
//       >
//         <option value="">Precio</option>
//         <option value="all">Todos</option>
//         {/* puede sacarse */}
//         <option value="price_1">-$500</option>
//         <option value="price_2">$500-$2000</option>
//         <option value="price_3">$2000-$5000</option>
//         <option value="price_4">$5000-$10000</option>
//         <option value="price_5">$10000-$20000</option>
//         <option value="price_6">$20000-$35000</option>
//         <option value="price_7">+$35000</option>
//       </select>
//     </div>
//     <div className="div-select">
//       <select
//         className="selector"
//         name=""
//         id=""
//         onChange={handleAZ}
//         defaultValue="ABC"
//       >
//         <option value="all">ABC</option>
//         <option value="az">A-Z</option>
//         <option value="za">Z-A</option>
//       </select>
//     </div>
//   </div>
// );

////////////////////////card///////////////////////

{/* <div className="card-main">
      {" "}
      <div className="card">
        {" "}
        <img
          className="card-imagen"
          src={imagen}
          alt="img not found"
          width="30%"
        />{" "}
        <div className="card-content">
          <h2 className="card-title"> {nombre} </h2>
          <p className="card-price">Precio: ${precio} </p>
        </div>
        <div>
          <div>
            <button onClick={handleAddCarrito} className="button-shop">
              Añadir al carrito
            </button>

            {!isLoged ? (
              <button
                className="button-fav"
                value={fav.id}
                onClick={handleAlertFav}
              >
                ❤ {/* el corazon de toni (es chiquito) */}
    //           </button>
    //         ) : (
    //           <button onClick={handleAddFavorito} className="button-fav">
    //             ❤
    //           </button>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div> */}



<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody class="table-group-divider">
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
  </tbody>
</table>;

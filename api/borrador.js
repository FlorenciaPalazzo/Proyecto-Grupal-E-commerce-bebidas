// router.use(bodyParser.urlencoded({ extended: false }));

// // SDK de Mercado Pago
// const mercadopago = require("mercadopago");
// // Agrega credenciales
// mercadopago.configure({
//   access_token:
//     "APP_USR-3516754288034643-052717-a71610e2187c78804eaefb28cae58b1e-182593787",
// });


// // router.use('./bebidas' , bebidas)

// ///////////////////////////////////////////////////////////////////////////////////

// //--------------------BEBIDAS-------------------------

// const getDataBase = async () => {
//   return await Producto.findAll();
// };
// router.get("/bebidasApi", async (req, res, next) => {
//   try {
//     const bebidasInfo = await axios.get(
//       `https://bebidas-efc61-default-rtdb.firebaseio.com/results.json`
//     );
//     const allBebidas = await bebidasInfo.data.map((e) => {
//       return e;
//     });
//     const allBebidasDb = await allBebidas.map((e) => {
//       Producto.create(e);
//     });

//     res.json(allBebidas);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/bebidas", async (req, res, next) => {
//   try {
//     const { nombre } = req.query;
//     const dataInfo = await getDataBase();
//     if (nombre) {
//       const dataName = await dataInfo.filter((e) =>
//         e.nombre.toLowerCase().includes(nombre.toLowerCase())
//       );
//       if (!dataName.length) {
//         let error = [];
//         return res.json(error);
//       }
//       res.json(dataName);
//     } else {
//       res.json(dataInfo);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// //--------------------BEBIDA-------------------------

// router.post("/bebida", async (req, res) => {
//   let = { nombre, imagen, marca, ml, graduacion, descripcion, precio, stock } =
//     req.body;

//   let [bebidaCreada, created] = await Producto.findOrCreate({
//     where: {
//       nombre: nombre,
//       imagen: imagen,
//       marca: marca,
//       descripcion: descripcion,
//       ml: ml,
//       graduacion: graduacion,
//       precio: precio,
//       stock: stock,
//     },
//   });
//   res.json(bebidaCreada);
// });

// router.get("/bebida/:id", async (req, res) => {
//   let { id } = req.params;

//   try {
//     let bebida = await Producto.findByPk(id);
//     res.status(200).json(bebida);
//   } catch (err) {
//     res.status(404);
//   }
// });

// router.put("/bebida", async (req, res) => {
//   let { nombre, imagen, marca, ml, graduacion, descripcion, precio, stock } =
//     req.body;
//   let { id } = req.body;

//   try {
//     const bebidaPut = await Producto.findOne({ where: { id: id } });

//     await bebidaPut.update({
//       id: id,
//       nombre: nombre,
//       imagen: imagen,
//       marca: marca,
//       descripcion: descripcion,
//       ml: ml,
//       graduacion: graduacion,
//       precio: precio,
//       stock: stock,
//     });
//     res.json(bebidaPut);
//   } catch (err) {
//     console.log("error del glorioso catch. Amen");
//   }
// });

// router.delete("/bebida/:id", async (req, res) => {
//   const { id } = req.params;

//   const del = await Producto.destroy({
//     where: {
//       id: id,
//     },
//   });
//   return res.status(200).send("AL LOBBY");
// });

//-------------------BEBIDA FAVORITO------------------//

// "id_prod":"eb9d3249-9eb9-4cc7-b562-8ced0d91e026",
// "id_user": "S0aGACK7d3NCvnYNNdu9GSzTgrw2"
// router.post("/producto", async (req, res) => {
//   let { id_prod, id_user } = req.body;

//   try {
//     let usuarioFavorito = await Usuario.findByPk(id_user, {});

//     let productoFavorito = await Producto.findByPk(id_prod, {});

//     // console.log(usuarioFavorito)
//     // console.log(productoFavorito)

  
//     usuarioFavorito.addUsuario(productoFavorito);
//     res.json(usuarioFavorito);

//   } catch (err) {
//     console.log(err.message);
//   }
// });

// router.get("/producto/favoritos", async (req, res) => {
//   let user = await Usuario.findOne({
//     include: {
//       model: Producto,
//       attributes: ["id", "nombre"],
//     },
//   });
//   console.log(user.productos, "ACA ESTOYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
//   res.json(user);
// });

// router.delete("/producto/favoritos", async (req, res) => {
//   let { id_prod, id_user } = req.body;

//   let favBorrado = await Favorito.destroy({
//     where: {
//       usuarioId: id_user,
//       productoId: id_prod,
//     },
//   });

//   res.json(Favorito);
// });

// //////AQUI YACEN LOS RESTOS DE AUTENTICACION----RIP-AUTENTICACION----GRACIAS JONA </3----//////
// //#region

// //   router.post('/usuario/login',  async (req, res) => {
// //       const user ={
// //           id,nombre,email
// //       }=req.body

// //       jwt.sign({user},'secretkey',(err,token)=>{
// //           res.json({token})
// //       })

// //   })

// //   router.post('/usuario/posts', verifyToken, async (req, res) => {

// //    jwt.verify(req.token, 'secretkey',(error,authData) =>{
// //        if(error){
// //            res.sendStatus(403)
// //        }else{
// //            res.json({
// //                mensaje:"Post fue creado",
// //                authData
// //            })
// //        }

// //    })

// //   })

// // //Authorization: Bearer <token>
// //   function verifyToken(req, res, next){
// //       const bearerHeader = req.headers['authorization']

// //       if(typeof bearerHeader !== 'undefined'){
// //           const bearerToken = bearerHeader.split(" ")[1];
// //           req.token =bearerToken;
// //           next();
// //       }else{
// //           res.sendStatus(403)
// //       }
// //   }

// //#endregion  //////////////////////////////////////////////////////////////////////

// //--------------------USUARIO-------------------------

// router.get("/usuario/:id", async (req, res) => {
//   let { id } = req.params;

//   try {
//     let usuario = await Usuario.findByPk(id);
//     res.status(200).json(usuario);
//   } catch (e) {
//     res.status(400);
//   }
// });

// router.get("/usuario", async (req, res) => {
//   try {
//     let usuarios = await Usuario.findAll();
//     res.status(200).json(usuarios);
//   } catch (e) {
//     res.status(404).send(e.message);
//   }
// });

// router.post("/usuario", async (req, res) => {
//   let = { id, nombre, email, nacimiento, direccion, telefono, isAdmin } =
//     req.body;
//   console.log("ruta", { id, nombre, email, nacimiento, direccion, telefono });
//   try {
//     let [usuarioCreado, created] = await Usuario.findOrCreate({
//       where: {
//         id: id,
//         nombre: nombre,
//         email: email,
//         nacimiento: nacimiento ? nacimiento : null,
//         direccion: direccion ? direccion : null,
//         telefono: telefono ? telefono : null,
//         isAdmin: isAdmin,
//       },
//     });
//     console.log("bien");
//     return res.json(usuarioCreado);
//   } catch (error) {
//     console.log("mal", error);
//     return res.status(400);
//   }
// });

// router.delete("/usuario/:id", async (req, res) => {
//   const { id } = req.params;

//   const del = await Usuario.destroy({
//     where: {
//       id: id,
//     },
//   });
//   return res.status(200).send("AL LOBBY");
// });

// router.put("/usuario", async (req, res) => {
//   let { nombre, email, contraseña, nacimiento, direccion, telefono } = req.body;
//   let { id } = req.body;

//   try {
//     const usuarioPut = await Usuario.findOne({ where: { id: id } });

//     await usuarioPut.update({
//       id: id,
//       nombre: nombre,
//       email: email,
//       contraseña: contraseña,
//       nacimiento: nacimiento,
//       direccion: direccion,
//       telefono: telefono,
//     });
//     res.json(usuarioPut);
//   } catch (err) {
//     console.log("error usuarios");
//   }
// });

// //------Mercado Pago-----

// router.post("/checkout", async (req, res) => {

//   let productos = await Carrito.findAll();

//   console.log( productos, "================ SOY LO QUE BUSCABAS   BY TONI =============== ");


//   let itemsMapeo = productos.map(e => {
//     return {
//       title : e.nombre ,
//       unit_price : parseInt(e.precio),
//       quantity : parseInt(e.quantity)
//     }
//   } )
  
//   console.log(itemsMapeo, " HOLAALALALLALALALALALALALALALA ")
  
//   let preference = {
//     items: [...itemsMapeo],
//     // back_urls: {
//       //   success: "http://localhost:3000/feedback",
//       //   failure: "http://localhost:3000/feedback",
//       //   pending: "http://localhost:3000/feedback",
//       // },
//       // auto_return: "approved",
//     };

//   console.log(preference.items, "Soy el preference items mapeo y estoy cool")
    

//   console.log(preference, "preferenciaaaaaaaAAAAAAAAAAA");

//   mercadopago.preferences
//     .create(preference)
//     .then(function (hola) {
//       console.log(hola.body, "BODYYYYYYYYYYYYYYYYYYYYYYYYYY");
//       // console.log(hola.body.sandbox_init_point, "Soy el supuesto y famoso url");
//       res.json(hola.body);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });

// // app.get("/feedback", async (req, res) => {
// //   const payment = await mercadopago.payment.findById(req.query.payment_id);
// //   const merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id);
// //   const preferenceId = merchantOrder.body.preference_id;
// //   const status = payment.body.status;
// //   await repository.updateOrderByPreferenceId(preferenceId, status);

// //   res.sendFile(require.resolve("./fe/index.html"));
// // });
// router.post("/carrito", async (req, res) => {
//   try {
//     let array  = req.body; // aca viene el carrito entero

//     console.log("array", array);


//     let promesa = await new Promise( (resolve,reject) => {

//       let result =    array.map(  (e) => { 
//         return   Carrito.findOrCreate({
//           where: {
//             nombre: e.nombre,
//             id: e.id,
//             imagen: e.imagen,
//             quantity: e.quantity,
//             precio: e.precio,
//             ml: e.ml,
//           },
//         })
//       })

//       resolve(result)
//     })// cierre de promise 
//     .then( (e) => Promise.all( e ))

//         // let todomorocho = Promise.all(result).then( e =>  e)
//     // let cosas = await Carrito.findAll()
//     console.log(promesa, "Muchas cosas wooooooooooo")
    
//     return res.status(200).json(promesa[0]);

//   } catch (err) {
//     console.log(err);
//   }
// });

//------Mercado Pago-----
  
// router.post("/checkout", async (req, res) => {
  
//     let productos = await Carrito.findAll();
  
//     console.log( productos, "================ SOY LO QUE BUSCABAS   BY TONI =============== ");
  
  
//     let itemsMapeo = productos.map(e => {
//       return {
//         title : e.nombre ,
//         unit_price : parseInt(e.precio),
//         quantity : parseInt(e.quantity)
//       }
//     } )
    
//     console.log(itemsMapeo, " HOLAALALALLALALALALALALALALALA ")
    
//     let preference = {
//       items: [...itemsMapeo],
//       // back_urls: {
//         //   success: "http://localhost:3000/feedback",
//         //   failure: "http://localhost:3000/feedback",
//         //   pending: "http://localhost:3000/feedback",
//         // },
//         // auto_return: "approved",
//       };
  
//     console.log(preference.items, "Soy el preference items mapeo y estoy cool")
      
  
//     console.log(preference, "preferenciaaaaaaaAAAAAAAAAAA");
  
//     mercadopago.preferences
//       .create(preference)
//       .then(function (hola) {
//         console.log(hola.body, "BODYYYYYYYYYYYYYYYYYYYYYYYYYY");
//         // console.log(hola.body.sandbox_init_point, "Soy el supuesto y famoso url");
//         res.json(hola.body);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   });
  
//   // app.get("/feedback", async (req, res) => {
//   //   const payment = await mercadopago.payment.findById(req.query.payment_id);
//   //   const merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id);
//   //   const preferenceId = merchantOrder.body.preference_id;
//   //   const status = payment.body.status;
//   //   await repository.updateOrderByPreferenceId(preferenceId, status);
  
//   //   res.sendFile(require.resolve("./fe/index.html"));
//   // });
//   router.post("/carrito", async (req, res) => {
//     try {
//       let array  = req.body; // aca viene el carrito entero
  
//       console.log("array", array);
  
  
//       let promesa = await new Promise( (resolve,reject) => {
  
//         let result =    array.map(  (e) => { 
//           return   Carrito.findOrCreate({
//             where: {
//               nombre: e.nombre,
//               id: e.id,
//               imagen: e.imagen,
//               quantity: e.quantity,
//               precio: e.precio,
//               ml: e.ml,
//             },
//           })
//         })
  
//         resolve(result)
//       })// cierre de promise 
//       .then( (e) => Promise.all( e ))
  
//           // let todomorocho = Promise.all(result).then( e =>  e)
//       // let cosas = await Carrito.findAll()
//       console.log(promesa, "Muchas cosas wooooooooooo")
      
//       return res.status(200).json(promesa[0]);
  
//     } catch (err) {
//       console.log(err);
//     }
//   });
  
// ---------------- admin review -------------------

// import { signOut } from "firebase/auth";
// import React, { useEffect, useState } from "react";
// import ReactStars from "react-rating-stars-component";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { auth } from "../../fb";
// import {
//   getAllReviews,
//   getProducts,
//   getReviewPage,
//   getUsersLoged,
//   filterUserReview,
//   resetUser
// } from "../../redux/actions";
// import { ReviewCar } from "../Review/ReviewCar";

// export const AdminReview = () => {
//   const dispatch = useDispatch(); /////////////////////////////////
//   const navigate = useNavigate();

//   let revsPage = useSelector((state) => state.reviewPage);
//   let revs = useSelector((state) => state.allReviews);
//   const usersLoged = useSelector((state) => state.usersLoged);
//   const [filterReviews, setfilterReviews] = useState([]);
//   const products = useSelector((state) => state.products);
//   console.log("products", products);

//   /* if (products.length) {
//     let filterProdId = products.map((e) => e.id);
//     console.log("filterProdId", filterProdId);
//     let searchId;
//     let coso = revs.map((e) => {
//       console.log("entra");
//       filterProdId.forEach((f) => {
//         console.log("entra al otro");
//         if (e.productoId === f) {
//           searchId.push(e);
//         }
//       });
//     });
//     console.log("searchId", searchId);
//   } */

//   //tiene el id del usuario
//   let array = [];
//   revs.forEach((e) => {
//     usersLoged.forEach((r) => {
//       if (r.id === e.usuarioId) {
//         array.push(r);
//       }
//     });
//   });
//   let pagePuntaje = [];
//   revsPage.forEach((e) => {
//     pagePuntaje.push(e.puntaje);
//   });
//   let accio = 0;
//   let larguen = pagePuntaje.length;
//   let sumaPage = pagePuntaje.forEach((e) => (accio += e));
//   let promPage = accio / larguen;
//   let prom = 0;
//   prom = Math.round(promPage);

//   // const handleSelector = (e) => {
//   //   e.preventDefault();
//   //   console.log(e.target.value);
//   //   if (e.target.value === "pagina") {
//   //     setfilterReviews([...revsPage]);
//   //   } else if (e.target.value === "productos") {
//   //     let arr = [];
//   //     revs.forEach((e) => {
//   //       if (e.productoId !== null) {
//   //         arr.push(e);
//   //       }
//   //     });
//   //     setfilterReviews([...arr]);
//   //   } else if(e.target.value === "all") {
//   //     setfilterReviews([...revs]);
//   //   } else {
//   //     setfilterReviews([...revs]);
//   //   }
//   // };
//   // useEffect(() => {
//   //   setfilterReviews([...revs]);
//   // }, []);

//   function out() {
//     signOut(auth)
//       .then(() => {
//         console.log("logout");
//         //dispatch(setLoading(true))
//         dispatch(resetUser());
//         //dispatch(setLoading(false))
//         navigate("/");
//       })
//       .catch((error) => {
//         // An error happened.
//         console.log(error);
//       });
//   }

//   const handleSelector = (e) => { 
//     e.preventDefault()
//     dispatch(filterUserReview(e.target.value))

//   }

//   useEffect(() => {
//     dispatch(getProducts());
//     dispatch(getAllReviews());
//     dispatch(getUsersLoged());
//     dispatch(getReviewPage());
//     setfilterReviews([...revs]);
//   }, [dispatch]);
//   return (
//     <div class="container">
//       <div>
//       <nav class="navbar bg-light fixed-top">
//         <div class="container-fluid">
//           <a class="navbar-brand" href="#">
//             <h1>Hola, este es el panel de administrador</h1>
//           </a>

//           <button
//             class="navbar-toggler"
//             type="button"
//             data-bs-toggle="offcanvas"
//             data-bs-target="#offcanvasNavbar"
//             aria-controls="offcanvasNavbar"
//           >
//             <span class="navbar-toggler-icon"></span>
//           </button>
//           <div
//             class="offcanvas offcanvas-end"
//             tabindex="-1"
//             id="offcanvasNavbar"
//             aria-labelledby="offcanvasNavbarLabel"
//           >
//             <div class="offcanvas-header">
//               <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
//                 Panel Administrador
//               </h5>
//               <button
//                 type="button"
//                 class="btn-close"
//                 data-bs-dismiss="offcanvas"
//                 aria-label="Close"
//               ></button>
//             </div>

//             <form class="d-flex" role="search">
//               <input
//                 class="form-control me-2"
//                 type="search"
//                 placeholder="Search"
//                 aria-label="Search"
//               />
//               <button class="btn btn-outline-success" type="submit">
//                 Search
//               </button>
//             </form>
//             <div class="offcanvas-body">
//               <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
//                 <li class="nav-item">
//                   <Link
//                     to="/admin"
//                     class="nav-link active"
//                     aria-current="page"
//                     href="#"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="25"
//                       height="25"
//                       fill="currentColor"
//                       class="bi bi-house-fill"
//                       viewBox="0 0 16 16"
//                     >
//                       <path
//                         fill-rule="evenodd"
//                         d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
//                       />
//                       <path
//                         fill-rule="evenodd"
//                         d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
//                       />
//                     </svg>{" "}
//                     Home
//                   </Link>
//                 </li>

//                 <li class="nav-item">
//                   <Link to="/adminreview" class="nav-link" href="#">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="25"
//                       height="25"
//                       fill="currentColor"
//                       class="bi bi-people-fill"
//                       viewBox="0 0 16 16"
//                     >
//                       <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
//                       <path
//                         fill-rule="evenodd"
//                         d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
//                       />
//                       <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
//                     </svg>{" "}
//                     Reviews Usuarios
//                   </Link>
//                 </li>

//                 <li class="nav-item">
//                   <Link to="/admin/products" class="nav-link" href="#">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="25"
//                       height="25"
//                       fill="currentColor"
//                       class="bi bi-people-fill"
//                       viewBox="0 0 16 16"
//                     >
//                       <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
//                       <path
//                         fill-rule="evenodd"
//                         d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
//                       />
//                       <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
//                     </svg>{" "}
//                     Productos
//                   </Link>
//                 </li>

//                 <li class="nav-item">
//                   <a class="nav-link" onClick={out} href="#">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="25"
//                       height="25"
//                       fill="currentColor"
//                       class="bi bi-box-arrow-right"
//                       viewBox="0 0 16 16"
//                     >
//                       <path
//                         fill-rule="evenodd"
//                         d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
//                       />
//                       <path
//                         fill-rule="evenodd"
//                         d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
//                       />
//                     </svg>{" "}
//                     Salir
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </nav>
//       </div>
//       <div>
//               <h2>Promedio de la página:</h2>
//               {prom ? (
//                 <ReactStars
//                   count={prom}
//                   size={35}
//                   isHalf={true}
//                   emptyIcon={<i className="far fa-star"></i>}
//                   halfIcon={<i className="fa fa-star-half-alt"></i>}
//                   fullIcon={<i className="fa fa-star"></i>}
//                   edit={false}
//                   color="#ffd700"
//                 />
//               ) : null}
//             </div>
//             <h1>Reviews</h1>
//               <select name="" id="" onChange={handleSelector}>
//                 <option disabled>Filtrar reviews</option>
//                 <option value="all">Todas</option>
//                 <option value="pagina">Página</option>
//                 <option value="productos">Productos</option>
//               </select>
//         <div class="col-lg-12 col-md-12 col-sm-12">
//           <h3 class="box-title mt-5">Tabla de Reviews: </h3>
//           <div class="table-responsive">
//             <table class="table table-striped ">
//             <thead class="thead-dark">
//               <tr>
//                 <th width="300">IMAGEN: </th>
//                 <th width="300">NOMBRE: </th>
//                 <th width="100">TITULO: </th>
//                 <th>COMENTARIO: </th>
//                 <th>PUNTAJE: </th>
//                 <th>USUARIO: </th>
//                 <th>FECHA: </th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody></tbody>
            
//                 {revs
//                 ? revs.map((r) => {
//                   let otroArray;
//                   array.find((e) => {
//                     if (e.id === r.usuarioId) {
//                       otroArray = e.email;
//                       console.log("otroArray", otroArray);
//                     }
//                   });
//                   return (
//                     <div key={r.id} value={r.id}>
//                       {r.productoId ? (
//                         <Link to={`/adminreview/${r.productoId}`}>
//                           Ver todas las reviews de este producto
//                         </Link>
//                       ) : null}
//                     <tr>
//                       <ReviewCar
//                         titulo={r.titulo}
//                         comentario={r.comentario}
//                         puntaje={r.puntaje}
//                         producto={r.productoId}
//                         fecha={r.createdAt}
//                         emailUsuario={otroArray}
//                         usuarioId={r.usuarioId}
//                         id = {r.id}
//                       />
//                       </tr>
//                     </div>
//                   );
//                 })
//                 : null}
//           </table>
//        </div> 
//        </div> 
//       <div>
//         <Link to={`/admin`}>
//           <button>Volver al panel del admin</button>
//         </Link>
//       </div>
  
// {/* 
//      <div>
//         <Link to="/adminreview">
//           <button>Ver las reviews de los usuarios</button>
//         </Link>
//       </div> 
//        */}
//   </div>
// )};
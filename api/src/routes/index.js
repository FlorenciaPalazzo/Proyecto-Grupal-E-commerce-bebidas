const { Router } = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const { Producto, Usuario, Favorito, Carrito } = require("../db");

const bodyParser = require("body-parser");

const router = Router();


const {db} = require('../firebase')

const admin = require('firebase-admin')
const serviceAccount = require('../../firebase.json')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(morgan("dev"))


router.get("/usuarioFire", async (req, res) => {
  try {
    const querySnapshot =  db.collection("fb-auth-bebidas");
      // admin.initializeApp({
      //   credential : admin.credential(serviceAccount),
      //   databaseURL : ""
      // })

    console.log("SOY ALGO NUEVO Y NO SENSACIONAL ", auth)
    // const users = querySnapshot.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));

    //  users.forEach( async (u) => {
    //   console.log("data", u.nombre, u.id, u.email , "=======", u, "USUARIOWEY")
    //   await Usuario.findOrCreate({
    //     where : {
    //       id : u.id,
    //       nombre : u.nombre ,
    //       email : u.email
           
    //     }
    //   })
    // })

    // let usersDB = await Usuario.findAll()


   return res.status(200).send('hola');
  } catch (error) {
    console.error(error);
  }
});




// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token:
    "APP_USR-3516754288034643-052717-a71610e2187c78804eaefb28cae58b1e-182593787",
});


// router.use('./bebidas' , bebidas)

///////////////////////////////////////////////////////////////////////////////////

//--------------------BEBIDAS-------------------------

const getDataBase = async () => {
  return await Producto.findAll();
};
router.get("/bebidasApi", async (req, res, next) => {
  try {
    const bebidasInfo = await axios.get(
      `https://bebidas-efc61-default-rtdb.firebaseio.com/results.json`
    );
    const allBebidas = await bebidasInfo.data.map((e) => {
      return e;
    });
    const allBebidasDb = await allBebidas.map((e) => {
      Producto.create(e);
    });

    res.json(allBebidas);
  } catch (error) {
    next(error);
  }
});

router.get("/bebidas", async (req, res, next) => {
  try {
    const { nombre } = req.query;
    const dataInfo = await getDataBase();
    if (nombre) {
      const dataName = await dataInfo.filter((e) =>
        e.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
      if (!dataName.length) {
        let error = [];
        return res.json(error);
      }
      res.json(dataName);
    } else {
      res.json(dataInfo);
    }
  } catch (error) {
    next(error);
  }
});

//--------------------BEBIDA-------------------------

router.post("/bebida", async (req, res) => {
  let = { nombre, imagen, marca, ml, graduacion, descripcion, precio, stock } =
    req.body;

  let [bebidaCreada, created] = await Producto.findOrCreate({
    where: {
      nombre: nombre,
      imagen: imagen,
      marca: marca,
      descripcion: descripcion,
      ml: ml,
      graduacion: graduacion,
      precio: precio,
      stock: stock,
    },
  });
  res.json(bebidaCreada);
});

router.get("/bebida/:id", async (req, res) => {
  let { id } = req.params;

  try {
    let bebida = await Producto.findByPk(id);
    res.status(200).json(bebida);
  } catch (err) {
    res.status(404);
  }
});

router.put("/bebida", async (req, res) => {
  let { nombre, imagen, marca, ml, graduacion, descripcion, precio, stock } =
    req.body;
  let { id } = req.body;

  try {
    const bebidaPut = await Producto.findOne({ where: { id: id } });

    await bebidaPut.update({
      id: id,
      nombre: nombre,
      imagen: imagen,
      marca: marca,
      descripcion: descripcion,
      ml: ml,
      graduacion: graduacion,
      precio: precio,
      stock: stock,
    });
    res.json(bebidaPut);
  } catch (err) {
    console.log("error del glorioso catch. Amen");
  }
});

router.delete("/bebida/:id", async (req, res) => {
  const { id } = req.params;

  const del = await Producto.destroy({
    where: {
      id: id,
    },
  });
  return res.status(200).send("AL LOBBY");
});

//-------------------BEBIDA FAVORITO------------------//

// "id_prod":"eb9d3249-9eb9-4cc7-b562-8ced0d91e026",
// "id_user": "S0aGACK7d3NCvnYNNdu9GSzTgrw2"
router.post("/producto", async (req, res) => {
  let { id_prod, id_user } = req.body;

  try {
    let usuarioFavorito = await Usuario.findByPk(id_user, {});

    let productoFavorito = await Producto.findByPk(id_prod, {});

    // console.log(usuarioFavorito)
    // console.log(productoFavorito)

  
    usuarioFavorito.addProducto(productoFavorito);
    res.json(usuarioFavorito);

  } catch (err) {
    console.log(err.message);
  }
});

router.get("/producto/favoritos", async (req, res) => {
  let {id_user} = req.body
  try {
    
    let favs = await Favorito.findAll(
      {where : { usuarioId: id_user }});
      
      // console.log(user.productos, "ACA ESTOYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
      res.status(200).json(favs);
    } catch (error) {
     console.log(error) 
    }
});

router.delete("/producto/favoritos", async (req, res) => {
  let { id_prod, id_user } = req.body;

  let favBorrado = await Favorito.destroy({
    where: {
      usuarioId: id_user,
      productoId: id_prod,
    },
  });

  res.json(Favorito);
});

//////AQUI YACEN LOS RESTOS DE AUTENTICACION----RIP-AUTENTICACION----GRACIAS JONA </3----//////
//#region

//   router.post('/usuario/login',  async (req, res) => {
//       const user ={
//           id,nombre,email
//       }=req.body

//       jwt.sign({user},'secretkey',(err,token)=>{
//           res.json({token})
//       })

//   })

//   router.post('/usuario/posts', verifyToken, async (req, res) => {

//    jwt.verify(req.token, 'secretkey',(error,authData) =>{
//        if(error){
//            res.sendStatus(403)
//        }else{
//            res.json({
//                mensaje:"Post fue creado",
//                authData
//            })
//        }

//    })

//   })

// //Authorization: Bearer <token>
//   function verifyToken(req, res, next){
//       const bearerHeader = req.headers['authorization']

//       if(typeof bearerHeader !== 'undefined'){
//           const bearerToken = bearerHeader.split(" ")[1];
//           req.token =bearerToken;
//           next();
//       }else{
//           res.sendStatus(403)
//       }
//   }

//#endregion  //////////////////////////////////////////////////////////////////////

//--------------------USUARIO-------------------------

router.get("/usuario/:id", async (req, res) => {
  let { id } = req.params;

  try {
    let usuario = await Usuario.findByPk(id);
    res.status(200).json(usuario);
  } catch (e) {
    res.status(400);
  }
});

router.get("/usuario", async (req, res) => {
  try {
    let usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.post("/usuario", async (req, res) => {
  let = { id, nombre, email, nacimiento, direccion, telefono, isAdmin } =
    req.body;
  console.log("ruta", { id, nombre, email, nacimiento, direccion, telefono });
  try {
    let [usuarioCreado, created] = await Usuario.findOrCreate({
      where: {
        id: id,
        nombre: nombre,
        email: email,
        nacimiento: nacimiento ? nacimiento : null,
        direccion: direccion ? direccion : null,
        telefono: telefono ? telefono : null,
        isAdmin: isAdmin,
      },
    });
    console.log("bien");
    return res.json(usuarioCreado);
  } catch (error) {
    console.log("mal", error);
    return res.status(400);
  }
});

router.delete("/usuario/:id", async (req, res) => {
  const { id } = req.params;

  const del = await Usuario.destroy({
    where: {
      id: id,
    },
  });
  return res.status(200).send("AL LOBBY");
});

router.put("/usuario", async (req, res) => {
  let { nombre, email, contraseña, nacimiento, direccion, telefono } = req.body;
  let { id } = req.body;

  try {
    const usuarioPut = await Usuario.findOne({ where: { id: id } });

    await usuarioPut.update({
      id: id,
      nombre: nombre,
      email: email,
      contraseña: contraseña,
      nacimiento: nacimiento,
      direccion: direccion,
      telefono: telefono,
    });
    res.json(usuarioPut);
  } catch (err) {
    console.log("error usuarios");
  }
});

//------Mercado Pago-----

router.post("/checkout", async (req, res) => {

  let productos = await Carrito.findAll();

  console.log( productos, "================ SOY LO QUE BUSCABAS   BY TONI =============== ");


  let itemsMapeo = productos.map(e => {
    return {
      title : e.nombre ,
      unit_price : parseInt(e.precio),
      quantity : parseInt(e.quantity)
    }
  } )
  
  console.log(itemsMapeo, " HOLAALALALLALALALALALALALALALA ")
  
  let preference = {
    items: [...itemsMapeo],
    // back_urls: {
      //   success: "http://localhost:3000/feedback",
      //   failure: "http://localhost:3000/feedback",
      //   pending: "http://localhost:3000/feedback",
      // },
      // auto_return: "approved",
    };

  console.log(preference.items, "Soy el preference items mapeo y estoy cool")
    

  console.log(preference, "preferenciaaaaaaaAAAAAAAAAAA");

  mercadopago.preferences
    .create(preference)
    .then(function (hola) {
      console.log(hola.body, "BODYYYYYYYYYYYYYYYYYYYYYYYYYY");
      // console.log(hola.body.sandbox_init_point, "Soy el supuesto y famoso url");
      res.json(hola.body);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// app.get("/feedback", async (req, res) => {
//   const payment = await mercadopago.payment.findById(req.query.payment_id);
//   const merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id);
//   const preferenceId = merchantOrder.body.preference_id;
//   const status = payment.body.status;
//   await repository.updateOrderByPreferenceId(preferenceId, status);

//   res.sendFile(require.resolve("./fe/index.html"));
// });
router.post("/carrito", async (req, res) => {
  try {
    let array  = req.body; // aca viene el carrito entero

    console.log("array", array);


    let promesa = await new Promise( (resolve,reject) => {

      let result =    array.map(  (e) => { 
        return   Carrito.findOrCreate({
          where: {
            nombre: e.nombre,
            id: e.id,
            imagen: e.imagen,
            quantity: e.quantity,
            precio: e.precio,
            ml: e.ml,
          },
        })
      })

      resolve(result)
    })// cierre de promise 
    .then( (e) => Promise.all( e ))

        // let todomorocho = Promise.all(result).then( e =>  e)
    // let cosas = await Carrito.findAll()
    console.log(promesa, "Muchas cosas wooooooooooo")
    
    return res.status(200).json(promesa[0]);

  } catch (err) {
    console.log(err);
  }
});





module.exports = router;

const { Router } = require("express");
const axios = require("axios");


const { Usuario, Carrito } = require("../../db");

const bodyParser = require("body-parser");

const router = Router();

router.use(bodyParser.urlencoded({ extended: false }));

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token:
    "APP_USR-3516754288034643-052717-a71610e2187c78804eaefb28cae58b1e-182593787",
});


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
          // isAdmin: isAdmin,
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
const { Router } = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const { Producto, Usuario, Carrito, Favorito } = require("../db");

const bodyParser = require("body-parser");

const router = Router();

router.use(bodyParser.urlencoded({ extended: false }));

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token:
    "APP_USR-6623451607855904-111502-1f258ab308efb0fb26345a2912a3cfa5-672708410",
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

router.post("/producto", async (req, res) => {
  let { id_prod, id_user } = req.body;

  try {
    let usuarioFavorito = await Usuario.findByPk(id_user, {});

    let productoFavorito = await Producto.findByPk(id_prod, {});

    /**
     * 
    favorito.findOrCreate({
      id_user: id_user,
      id_prod: id_prod
    })

     */

    usuarioFavorito.addProducto(productoFavorito);
    res.json(usuarioFavorito);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/producto/favoritos", async (req, res) => {
  let user = await { Usuario }.findOne({
    include: {
      model: Producto,
      attributes: ["id", "nombre"],
    },
  });
  console.log(user.productos, "ACA ESTOYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
  res.json(user);
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
  // Crea un objeto de preferencia
  // let {preference} = req.query
  let { id } = req.body;

  let pBuscado = await Producto.findOne({
    where: { id: id },
  });

  console.log(
    pBuscado,
    "================ SOY LO QUE BUSCABAS =============== "
  );

  let preference = {
    items: [
      {
        title: "valenvino",
        unit_price: 898989,
        quantity: 1,
      },
      {
        title: pBuscado.nombre,
        unit_price: parseInt(pBuscado.precio),
        quantity: 1,
      },
    ],

    // back_urls: {
    //   success: "http://localhost:3000/feedback",
    //   failure: "http://localhost:3000/feedback",
    //   pending: "http://localhost:3000/feedback",
    // },
    // auto_return: "approved",
  };

  console.log(preference, "preferenciaaaaaaaAAAAAAAAAAA");

  mercadopago.preferences
    .create(preference)
    .then(function (hola) {
      console.log(hola.body, "BODYYYYYYYYYYYYYYYYYYYYYYYYYY");
      console.log(hola.body.sandbox_init_point, "Soy el supuesto y famoso url");
      res.send("el checkout");
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
    let array = req.body; // aca viene el carrito entero
    console.log("estoy adentro");
    console.log("array", array);
    let carrito;
    let result = array.map(async (e) => {
      console.log(e);
      carrito = await Carrito.create({
        where: {
          nombre: e.nombre,
          id: e.id,
          imagen: e.imagen,
          quantity: e.quantity,
          precio: e.precio,
          ml: e.ml,
        },
      }); //e = producto entero, {e.nombre}
    });
    //let coso = await Promise.all(result);

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

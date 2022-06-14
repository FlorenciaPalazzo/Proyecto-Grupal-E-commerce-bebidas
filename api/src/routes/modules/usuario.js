const { Router } = require("express");
const axios = require("axios");

const {
  Usuario,
  Carrito,
  Direcciones,
  Comprado,
  Review,
  Producto,
} = require("../../db");

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

router.get("/:id", async (req, res) => {
  let { id } = req.params;

  try {
    let usuario = await Usuario.findOne({
      where: { id },
      include: { model: Direcciones },
    });
    res.status(200).json(usuario);
  } catch (e) {
    res.status(400);
  }
});

router.get("/", async (req, res) => {
  try {
    let usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.post("/", async (req, res) => {
  let = {
    id,
    nombre,
    email,
    nacimiento,
    direccion,
    telefono,
    isAdmin,
    apellido,
    image,
  } = req.body;
  console.log("ruta", {
    id,
    nombre,
    email,
    nacimiento,
    direccion,
    telefono,
    image,
    apellido,
    isAdmin,
  });
  try {
    let [usuarioCreado, created] = await Usuario.findOrCreate({
      where: {
        id: id,
        nombre: nombre,
        apellido: apellido,
        email: email,
        nacimiento: nacimiento ? nacimiento : null,
        direccion: direccion ? direccion : null,
        telefono: telefono ? telefono : null,
        isAdmin: isAdmin,
        image: image,
      },
    });
    console.log("bien");
    return res.json(usuarioCreado);
  } catch (error) {
    console.log("mal", error);
    return res.status(400);
  }
});
router.put("/", async (req, res) => {
  let {
    id,
    nombre,
    email,
    contraseña,
    nacimiento,
    direccion,
    telefono,
    image,
    isVerified
  } = req.body.user;
  console.log("BODY DE UPDATE DEL USUARIOOOOOOOOOOOOOOOOOOO",req.body.user);
  try {
    const usuarioPut = await Usuario.findOne({ where: { id: id } });
    
    console.log("usuarioPut busqueda", usuarioPut);
    let updated = await usuarioPut.update({
      id: id || usuarioPut.id,
      nombre: nombre || usuarioPut.nombre,
      email: email || usuarioPut.email,
      contraseña: contraseña || usuarioPut.contraseña,
      nacimiento: nacimiento || usuarioPut.nacimiento,
      direccion: direccion || usuarioPut.direccion,
      telefono: telefono || usuarioPut.telefono,
      image: image || usuarioPut.image,
      isVerified: isVerified || usuarioPut.isVerified,
      
    });
    res.json(updated);
  } catch (err) {
    console.log(err);
  }
});

//------Mercado Pago-----

router.post("/checkout", async (req, res) => {
  let productos = await Carrito.findAll();
  console.log("productos", productos);
  let itemsMapeo = productos.map((e) => {
    return {
      title: e.nombre,
      unit_price: parseInt(e.precio),
      quantity: parseInt(e.quantity),
    };
  });
  console.log("itemsMapeo", itemsMapeo);
  let preference = {
    items: [...itemsMapeo],
    back_urls: {
      success: "http://localhost:3000/feedback",
      failure: "http://localhost:3000/feedback",
      pending: "http://localhost:3000/feedback",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (mp) {
      console.log("Body de mercado pago", mp.body);
      res.json(mp.body);
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.post("/carrito", async (req, res) => {
  try {
    let localStorage = req.body; // aca viene el carrito entero

    console.log("localStorage", localStorage);

    let promesa = await new Promise((resolve, reject) => {
      let result = localStorage.map((e) => {
        return Carrito.findOrCreate({
          where: {
            nombre: e.nombre,
            id: e.id,
            imagen: e.imagen,
            quantity: e.quantity,
            precio: e.precio,
            ml: e.ml,
            subtotal: e.subtotal,
          },
        });
      });
      resolve(result);
    }) // cierre de promise
      .then((e) => Promise.all(e));
    console.log("promesa", promesa);
    return res.status(200).json(promesa[0]);
  } catch (err) {
    console.log(err);
  }
});
router.delete("/checkout", async (req, res) => {
  try {
    let productos = await Carrito.findAll();
    console.log("productos", productos);
    await Carrito.destroy({ where: {} });
    res.status(200).json(productos);
  } catch (err) {
    console.log("Error en el catch del delete", err);
  }
});
router.get("/feedback", async (req, res) => {
  const payment = await mercadopago.payment.findById(req.query.payment_id);
  console.log("payment", payment);
  const merchantOrder = await mercadopago.merchant_orders.findById(
    payment.body.order.id
  );
  console.log("merchantOrder", merchantOrder);
  const preferenceId = merchantOrder.body.preference_id;
  console.log("preferenceId", preferenceId);

  const status = payment.body.status;
  console.log("status", status);

  await repository.updateOrderByPreferenceId(preferenceId, status);

  res.sendFile(require.resolve("./fe/index.html"));
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const del = await Usuario.destroy({
    where: {
      id: id,
    },
  });
  return res.status(200).send("AL LOBBY");
});
//_____________direcciones_______________

router.post("/direcciones", async (req, res) => {
  try {
    let = {
      id_user,
      delivery_type,
      calle_numero,
      localidad,
      codigo_postal,
      provincia,
    } = req.body;
    //const usuario = await Usuario.findOne({where:{id:id_user}})
    // console.log('---------------------------',usuario);
    let direcciones = await Direcciones.findOrCreate({
      where: {
        usuarioId: id_user,
        delivery_type: delivery_type,
        calle_numero: calle_numero,
        localidad: localidad,
        codigo_postal: codigo_postal,
        provincia: provincia,
      },
    });

    res.json(direcciones);
  } catch (error) {
    console.log(error);
  }
});
router.get("/direcciones/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let direcciones = await Direcciones.findAll({ where: { usuarioId: id } });
    res.status(200).json(direcciones);
  } catch (err) {
    res.status(404);
  }
});

router.delete("/direcciones/:id", async (req, res) => {
  let { id } = req.params;

  try {
    // let findIdDir = await Direcciones.findOne({where : {id_direcciones: id}})

    // let usuarioId = findIdDir.usuarioId

    let deleteDire = await Direcciones.destroy({
      where: { id_direcciones: id },
    });

    // let direccion = await Direcciones.findAll({where:{usuarioId : usuarioId}})

    res.status(200).json(deleteDire);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/admin/stats", async (req, res) => {
  try {
    let resp = {};
    console.log(Comprado, "holas");

    let compras = await Comprado.findAll();
    resp.ventas = compras.length;
    resp.productos = await Producto.count();
    //resp.usuarios = await Usuario.count()
    let usuariosArr = await Usuario.findAll();
    //resp.totalReviews = await Review.count()
    let reviewsArr = await Review.findAll();
    resp.totalReviews = reviewsArr.length;
    resp.usuarios = usuariosArr.length; // cantidad de usuarios

    let verifiedUser = [];
    let noVerifiedUser = [];
    usuariosArr.map((e) => {
      if (e.isVerified) {
        verifiedUser.push(e);
      } else noVerifiedUser.push(e);
    });

    resp.verifiedUser = verifiedUser.length;
    resp.noVerifiedUser = noVerifiedUser.length;
    let revsProm = 0;
    let pageReviews = [];
    let userReviews = [];
    reviewsArr.map((e) => {
      revsProm += e.puntaje;
      if (e.productoId) {
        userReviews.push(e);
      } else pageReviews.push(e);
    });
    resp.pageProm = revsProm / reviewsArr.length;
    resp.userReviews = userReviews.length;
    resp.pageReviews = pageReviews.length;
    let comprasCount = {};
    compras.map((e) => {
      if (comprasCount[e.productoId]) {
        comprasCount[e.productoId] += e.quantity;
      } else comprasCount[e.productoId] = e.quantity;
    });
    resp.comprasCount = comprasCount;
    //console.log("resp", resp);

    res.status(200).json(resp);
  } catch (error) {
    console.log(error);
  }
});

router.post("/admin/stats/products", async (req, res) => {
  let { top } = req.body;
  try {
    let products = await Producto.findAll();
    let resp = [];
    products.map((e) => {
      top &&
        top.map((t) => {
          //console.log(t, e.id ,t.includes(e.id) );
          if (t.includes(e.id)) {
            resp.push({ ...e.dataValues, buyQuantity: t[1] });
          }
        });
    });
    //console.log("resp",resp);

    resp = resp.sort((a, b) => {
      if (a.buyQuantity < b.buyQuantity) {
        return 1;
      }
      if (a.buyQuantity > b.buyQuantity) {
        return -1;
      }
      return 0;
    });

    res.status(200).json(resp);
  } catch (error) {
    console.log(error);
  }
});


router.put("/auth/verified", async (req, res)=>{
  const { uid } = req.body
  try {
    let usuario = await Usuario.findOne({
      where: { id: uid }
    });

    console.log(usuario);
  } catch (e) {
    res.status(400);
  }

})

module.exports = router;

/**
 * 
{
  "ventas": #,
  "productos": #,
  "ventaPorProd": #, // 
  "usuarios": #,
  "usuariosVerificados": #, // isVerified
  "totalReviews": #,
  "userReviews": #,
  "pageReviews": #
}
 *
 */

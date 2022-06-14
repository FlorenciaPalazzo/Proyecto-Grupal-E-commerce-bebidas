const { Router } = require("express");
const axios = require("axios");

const { Producto, Usuario, Favorito, Comprado } = require("../../db");

const bodyParser = require("body-parser");

const router = Router();

router.use(bodyParser.urlencoded({ extended: false }));

//--------------------BEBIDAS-------------------------

/*router.get("/bebidasApi", async (req, res, next) => {
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
  }); */
const getDataBase = async () => {
  return await Producto.findAll();
};
const getBebidasApi = async () => {
  try {
    const bebidasInfo = await axios.get(`
      https://bebidas-efc61-default-rtdb.firebaseio.com/results.json`);
    const allBebidas = await bebidasInfo.data.map((e) => {
      return e;
    });
    const allBebidasDb = await allBebidas.map((e) => {
      Producto.create(e);
    });

    return allBebidas;
  } catch (error) {
    next(error);
  }
};

router.get("/bebidas", async (req, res, next) => {

  try {
    let dataInfo = await getDataBase();
    if (dataInfo.length === 0) {
      console.log("entro al if de la api");
      dataInfo = await getBebidasApi();
    }
    /* console.log(dataInfo); */
    const { nombre } = req.query;
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
  let { nombre, imagen, marca, ml, graduacion, descripcion, precio, stock, tipo } =
    req.body;
  let { id } = req.body;
  console.log(req.body)
  try {
    const bebidaPut = await Producto.findOne({ where: { id: id } });

    await bebidaPut.update({
      id: id,
      nombre: nombre,
      imagen: imagen,
      marca: marca,
      descripcion: descripcion,
      ml: ml,
      tipo: tipo,
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

router.post("/", async (req, res) => {
  let { id_prod, id_user } = req.body;

  try {
    let usuarioFavorito = await Usuario.findByPk(id_user, {});
    let productoFavorito = await Producto.findByPk(id_prod, {});
    usuarioFavorito.addProducto(productoFavorito);
    console.log("usuarioFavorito", usuarioFavorito);
    res.json(usuarioFavorito);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/favoritos/:id_user", async (req, res) => {
  let { id_user } = req.params;
  try {
    let favs = await Favorito.findAll({ where: { usuarioId: id_user } });
    console.log("favs", favs);
    res.status(200).json(favs);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/favoritos", async (req, res) => {
  let { id_user, id_prod } = req.query;
  try {
    let favBorrado = await Favorito.destroy({
      where: {
        usuarioId: id_user,
        productoId: id_prod,
      },
    });
    let favs2 = Favorito.findAll({ where: { usuarioId: id_user } });

    res.json(favs2);
  } catch (err) {
    console.log(err.message);
  }
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

//=============== Historial  ========================//

router.get("/historial/:id", async (req, res) => {
  let { id } = req.params;

  try {
    let user = await Usuario.findByPk(id);
    console.log(user, "Usuario encontrado");
    let comprado = await Comprado.findAll({ where: { usuarioId: id } });

    res.status(200).json(comprado);
  } catch (e) {
    console.log(e);
  }
});

router.post("/historial", async (req, res) => {
  let { id_user, id_prods } = req.body;
  try {
    let user = await Usuario.findByPk(id_user);
    console.log(user, "Soy el usuario");
    // console.log(id_prods, "Soy el producto")
    id_prods.forEach(async (e) => {
      console.log(e, "Soy un solo ID");
      await Comprado.create({
        //where: { productoId: e.id, usuarioId: id_user, quantity: e.quantity },
         productoId: e.id, usuarioId: id_user, quantity: e.quantity ,
      });
    });
    // let product = await Producto.findByPk(id_prods)
    res.status(200).json("Llegue hasta el final sin romperme");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

/**
 * Cantidas total de usuarios+
cant Usuarios verificados +
cant Usuarios no verificados +
cantidad de ventas +
(hay que chequear si se puede filtrar por completada, pendiente, incompleta )
cantidad de productos+
productos mas vendidos 
cantidad de reviews totales+
cantidad de reviews de usuarios+
cantidad de reviews de la pagina +









user1
[{id:prod 1, q: 2}, prod2, prod3 ]
[q1, q2, q3]

products = {
  8bac5254-6bc6-4cbb-9e40-2720c6f6e8a2: 3
  6d46215d-4f89-4fa0-882b-01e44b302277: 5
}

products[prodId]
 */

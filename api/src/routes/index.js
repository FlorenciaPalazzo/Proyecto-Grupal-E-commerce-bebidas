const { Router } = require('express');

// const { Producto,  } = require("../db");
const productoModules = require('./modules/producto.js');
const usuarioModules = require('./modules/usuario.js');
const reviewModules = require('./modules/review.js');



const router = Router();
router.use('/producto', productoModules);
router.use('/usuario', usuarioModules);
router.use('/review', reviewModules);

module.exports = router;
const { Router } = require("express");
const axios = require("axios");

const { Producto, Usuario, Review } = require("../../db");

const router = Router();
router.get("/all", async (req, res) => {
  try {
    let get = await Review.findAll();
    console.log("get", get);
    res.status(200).json(get);
  } catch (e) {
    console.log(e);
  }
});
//reviews de la pagina general
router.get("/", async (req, res) => {
  try {
    let get = await Review.findAll();
    let filt = [];
    get.forEach((e) => {
      console.log(e);
      if (!e.productoId) {
        filt.push(e);
      }
    });
    console.log(filt);
    res.status(200).json(filt);
  } catch (e) {
    console.log(e);
  }
});

// reviews por productos
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const get = await Review.findAll({ where: { productoId: id } });
    res.status(200).json(get);
  } catch (e) {
    console.log(e);
  }
});

router.post("/", async (req, res) => {
  const { titulo, comentario, puntaje, usuarioId, productoId } = req.body;
  try {
    // const existe = await Review.findOne({ where: id, usuarioId });
    // if(existe) return res.status(400).send('Solo puedes añadir un comentario por producto');
    let rev = await Review.findOrCreate({
      where: {
        titulo: titulo,
        comentario: comentario,
        puntaje: puntaje,
        usuarioId: usuarioId,
        productoId: productoId ? productoId : null,
      },
    });
    res.status(200).json(rev);
  } catch (e) {
    console.log(e);
  }
});

router.put("/", async (req, res) => {
  const { titulo, comentario, puntaje,  id, productoId, usuarioId } = req.body;
  try {
    let mod = await Review.findOne({ where: { id: id } });
console.log(req.body, 'DIRECTO DEL BACK')
    await mod.update({
      id: id,
      titulo: titulo,
      comentario: comentario,
      puntaje: puntaje,
      productoId: productoId,
      usuarioId: usuarioId
    });

    res.status(200).json(mod);
  } catch (e) {
    console.log(e);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const del = await Review.destroy({
      where: { id: id },
    });
    return res.status(200).send("Se elimino su reseña.");
  } catch (e) {
    console.log(e);
  }
});


router.get("/all/:id", async (req,res) => {
  const {id} = req.params
  try {
    const all = await Review.findAll({
      where: { usuarioId  : id}
    })

    res.status(200).json(all)
  } catch (error) {
    console.log(error)
  }
})
router.get("/putreview/:id", async (req,res) => {
  const {id} = req.params
  try {
    const all = await Review.findAll({
      where: { id  : id}
    })

    res.status(200).json(all)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;

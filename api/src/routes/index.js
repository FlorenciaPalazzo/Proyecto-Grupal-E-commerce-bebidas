const { Router } = require('express');

const axios = require ('axios')

const {Producto}= require ('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//cambiominimo

const router = Router();


// router.use('./bebidas' , bebidas)

const getDataBase = async()=>{
    return await Producto.findAll() 
}
router.get('/bebidasApi', async (req, res, next) => {
    
    try { 
     const bebidasInfo = await axios.get(`https://bebidas-efc61-default-rtdb.firebaseio.com/results.json`)   
     const allBebidas = await bebidasInfo.data.map(e => { return e })
     const allBebidasDb = await allBebidas.map(e => {
      Producto.create(e)
      }
      )
   
      res.json(allBebidas)
    } catch (error) {
       next(error)
    } 
  });



  router.get('/bebidas', async (req, res, next) => {
     try {
         
      const {nombre} = req.query
    const dataInfo = await getDataBase()
    if(nombre){
        const dataName = await dataInfo.filter(e=> e.nombre.toLowerCase().includes(nombre.toLowerCase()))
        if(!dataName.length){
            return res.status(400).send('No se encontro ese producto')
        }
        res.json(dataName)
    }else{
        res.json(dataInfo)
    }

      } catch (error) {
         next(error)
     }
  })

  router.get('/bebidas/:id', async (req, res) => {
     let { id } = req.params

     try{
         let bebida = await Producto.findByPk(id)
         res.status(200).json(bebida)
         console.log(bebida)
         
      }catch(err){
         res.status(404)
   }
  })


module.exports = router;


// router.delete('/:id', async(req, res) => {
//   const {id} = req.params;

//   const del = await Videogame.destroy({
//       where:{
//           id: id
//       }
//   })
//   return res.status(200).send('AL LOBBY');
// })
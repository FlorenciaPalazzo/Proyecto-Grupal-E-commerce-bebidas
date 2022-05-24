const { Router } = require('express');

const axios = require ('axios')

const {Bebida}= require ('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//cambiominimo


const router = Router();


// router.use('./bebidas' , bebidas)

const getDataBase = async()=>{
    return await Bebida.findAll() 
}
router.get('/bebidasApi', async (req, res, next) => {
    
    try {
        
        
     const bebidasInfo = await axios.get(`https://bebidas-efc61-default-rtdb.firebaseio.com/results.json`)
       
     const allBebidas = await bebidasInfo.data.map(e => { return e })
     
     const allBebidasDb = await allBebidas.map(e => {
         Bebida.create(e)
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



module.exports = router;
// const { Router } = require('express');
// const axios = require ('axios')
// const router = Router();
// const {Bebida}= require ('../db')


// router.get('/bebidas', async (req, res, next) => {
//     try {
//          const apiURL = (await axios.get(`https://bebidas-efc61-default-rtdb.firebaseio.com/results.json`).data)
//         console.log(apiURL)  
//       const allBebidas = await bebidasInfo.data.map(async(e) => { return e })
     
//       const allBebidasDb = await allBebidas.map(e => {
//          Bebida.findOrCreate({
//              where:{
//                  name: e
//              }
//          })
//       }
//       )
   
//       res.json(allBebidas)
//     } catch (error) {
//        next(error)
//     } 
//   });
//   module.exports = router
const { Router } = require('express');
const axios = require ('axios')
const jwt = require("jsonwebtoken")

const {Producto, Usuario}= require ('../db')
const router = Router();


// router.use('./bebidas' , bebidas)

///////////////////////////////////////////////////////////////////////////////////

//--------------------BEBIDAS-------------------------

const getDataBase = async()=>{
    return await Producto.findAll() 
}
router.get('/bebidasApi', async (req, res, next) => {
    
    try { 
     const bebidasInfo = await axios.get(`https://bebidas-efc61-default-rtdb.firebaseio.com/results.json`)   
     const allBebidas = await bebidasInfo.data.map(e => { return e })
     const allBebidasDb = await allBebidas.map(e => {Producto.create(e)})
   
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


//--------------------BEBIDA-------------------------
  
  router.post('/bebida',  async (req, res) => {
    let  ={ 
        nombre,imagen,marca,ml,graduacion,descripcion,precio,stock
    }= req.body

    let [bebidaCreada, created] = await Producto.findOrCreate({
        where:{ 
            nombre:nombre,
            imagen:imagen,
            marca:marca,
            descripcion:descripcion,
            ml: ml,
            graduacion:graduacion,
            precio: precio,
            stock:stock
        }     
    })
    res.json(bebidaCreada)
  })






  

  router.get('/bebida/:id', async (req, res) => {
    let { id } = req.params

    try{
        let bebida = await Producto.findByPk(id)
        res.status(200).json(bebida)
        
     }catch(err){
        res.status(404)
  }
 })

  router.put('/bebida',  async (req, res) => {
    let {nombre,imagen,marca,ml,graduacion,descripcion,precio,stock}= req.body
    let {id} = req.body


    try{
        const bebidaPut= await Producto.findOne({where:{id:id}})
        
        
         await bebidaPut.update({
                id:id,
                nombre:nombre,
                imagen:imagen,
                marca:marca,
                descripcion:descripcion,
                ml: ml,
                graduacion:graduacion,
                precio: precio,
                stock:stock           
        })
        res.json(bebidaPut)
    }catch(err){
        console.log('error del glorioso catch. Amen')
    }
  })


  
  router.delete('/bebida/:id', async(req, res) => {
    const {id} = req.params;
  
    const del = await Producto.destroy({
        where:{
            id: id
        }
    })
    return res.status(200).send('AL LOBBY');
  })


//-------------------BEBIDA FAVORITO------------------//
  
  router.post('/producto',  async (req, res) => {
    let {id_prod, id_user}= req.body
    
    try{
      let usuarioFavorito = await Usuario.findByPk(id_user,{})
      
      let productoFavorito = await Producto.findByPk(id_prod,{})
      
        
        usuarioFavorito.addProducto(productoFavorito)
      res.json(usuarioFavorito)
    }catch(err){
      console.log(err.message)
    }
  })



  router.get('/producto/favoritos',  async (req, res) => {
    
      let user= await Usuario.findOne({
          include: {
              model: Producto,
              attributes: ['id','nombre'],
          }
      })

      res.json(user.productos)
  })



  
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


router.get('/usuario/:id', async(req, res) => {
  let { id } = req.params

  try{
    let usuario = await Usuario.findByPk(id)
    res.status(200).json(usuario)
  }
  catch(e){
    res.status(400)
  }
})

  router.get('/usuario', async (req,res) => {
      try {
          let usuarios = await Usuario.findAll()
          res.status(200).json(usuarios)
          
      } catch (e) {
          res.status(404).send(e.message)
      }
  })
  
  
  router.post('/usuario',  async (req, res) => {
    let  ={ 
       id, nombre,email,contraseña,nacimiento,direccion,telefono
    }= req.body


    let [usuarioCreado, created] = await Usuario.findOrCreate({
        where:{ 
            id:id,
            nombre:nombre,
            email:email,
            contraseña: contraseña,
            nacimiento:nacimiento,
            direccion: direccion,
            telefono :telefono,
        }    
       
    })
    return res.json(usuarioCreado)
  })

  

  router.delete('/usuario/:id', async(req, res) => {
    const {id} = req.params;
  
    const del = await Usuario.destroy({
        where:{
            id: id
        }
    })
    return res.status(200).send('AL LOBBY');
  })



  router.put('/usuario', async (req, res) => {

    let { nombre, email, contraseña , nacimiento , direccion , telefono } = req.body
    let { id } = req.body


      try {
          const usuarioPut = await Usuario.findOne({ where: { id: id } })


          await usuarioPut.update({
              id: id,
              nombre: nombre,
              email: email,
              contraseña: contraseña ,
              nacimiento: nacimiento,
              direccion: direccion,
              telefono: telefono
          })
          res.json(usuarioPut)
      } catch (err) {
          console.log('error usuarios')
      }
  })


module.exports = router;


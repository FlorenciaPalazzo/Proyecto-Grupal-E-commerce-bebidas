import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteMercadoPago, getMercadoPago } from "../../redux/actions";

export const Checkout = () => {
  const sandbox = useSelector((state) => state.mpSandBox);
  const products = useSelector((state) => state.productCart);
  const user = useSelector((state) => state.currentUser);
  // let user ={
  //   direccion: "Av siempre viva 123"
  // }
  console.log("soy el user", user);
  let productCart = JSON.parse(window.localStorage.getItem("product"));
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    delivery_type:"",
    calle_numero: null,
    localidad: null,
    codigo_postal: null,
    provincia: null
    
  })

  const[disabled, setDisabled]= useState(true)
 const [direccion, setDireccion]= useState({
  delivery_type: null, calle_numero: null, localidad: null,codigo_postal: null,provincia: null
 })
 console.log("soy input ", input);
 console.log("soy direccion ",direccion);
  /* const handleMercadoPago = (e) => {
    e.preventDefault();
    dispatch(deleteMercadoPago());
  }; */

  useEffect(() => {
    if (!sandbox) dispatch(getMercadoPago());
    /* dispatch(deleteMercadoPago()); */
    console.log("sandbox ------>", sandbox);
  }, [sandbox, dispatch]);

  const handleInputChange = function (e) {

    e.target.value === "sucursal" ?setDisabled(true):setDisabled(false)
      setInput({
      ...input,
      [e.target.name]: e.target.value})
   
   
  };
  const handleAddress = function (e){
    e.preventDefault();
   input.delivery_type === "envio"?
   setDireccion(input): setDireccion ({delivery_type : input.delivery_type})
    
  }
   const handlePagar = function (e){
    e.preventDefault();
 window.location.replace(sandbox)
 
  }   

  return (
    <div>
      <button><Link to="/home">Home</Link></button>
      <h2>Detalle de compra</h2>
      {!sandbox && productCart.length ? (
        <span>Cargando</span>
      ) : sandbox ? (<div>

       <div>
        <ul>
          <li>Producto</li>
          <li>Cantidad</li>
          <li>Precio</li>
        </ul>
        <div>
          {productCart.length ? productCart.map((e) => {
            return (
              <ul key={e.id}>
                <li><img src={e.imagen} alt="img not found" width="100px"/></li>
                <li>{e.nombre}</li>
                <li>{e.precio}</li>
              </ul>
            )
          }) : null
          }
        </div>
        <div>
          <h3>Elegir metodo de entrega</h3>
          <ul>
            <li><input type="radio" name="delivery_type" value="envio" id="delivery_type_envio" onClick={e => { handleInputChange(e) }}/>
            <label >Envio a Domicilio estándar Provincia e Interior</label>
            <span>$749,00</span>
          
            <div>Despechamos tu pedido dentro de las 24 hs. Demora entre 3 a 5 días hábiles.</div>
             { !disabled? user && user.direccion? 
             <div>
               <div>Enviar al domicilio: {user.direccion}</div>
               <div>
                 <h2>Modificar direccion:</h2>
                  </div>
               </div>
            :
            <div   >
              <h2>Ingresar direccion de envio:</h2>
              <label> Calle y número</label>
              <input  disabled={disabled} name="calle_numero" type="text" onChange={e => { handleInputChange(e) }}/>
              <br></br>
              <label> Codigo postal</label>
              <input  disabled={disabled} name="codigo_postal" type="text" onChange={e => { handleInputChange(e) }}/>
              <br></br>
              <label> Provincia</label>
              <input  disabled={disabled} name="provincia" type="text" onChange={e => { handleInputChange(e) }}/>
              <label> Localidad</label>
              <input  disabled={disabled} name="localidad" type="text" onChange={e => { handleInputChange(e) }}/>
              
            
              
           </div>: null
            }
           
             
            </li>
            <li>
              <input type="radio" name="delivery_type" value="sucursal" id="delivery_12" onClick={e => { handleInputChange(e) }}/>
              <label >Retiro por sucursal Pilar</label>
              <span >Gratuito</span>
              <div>
              Retirá tu pedido sin costo de envío en nuestra sucursal de Pilar.
              <br></br>
              <br></br>
              
              Disponible Lunes a Miércoles de 11 a 21 hs | Jueves a  Sábados de 11 a 00 hs.
              <br></br>
              <br></br>
              
              Colectora Este Ramal Pilar 1250, B1669 Del Viso, Provincia de Buenos Aires
              <br></br>
              <br></br>
              
              </div>
            </li>
          </ul>
        </div>

       </div>
       <div>
         <button onClick={handleAddress}>Confirmar direccion</button>
       </div>
        <button><Link to="/cart">Volver al Carrito</Link></button>
        {!direccion.delivery_type?<button disabled >
        PAGAR
        </button>:<button onClick={handlePagar}>
          PAGAR
        </button> }
      </div>
      ) : productCart.length === 0 && !sandbox ? (
        <span>Ya realizaste tu compra</span>
      ) : null}
    </div>
  );
};

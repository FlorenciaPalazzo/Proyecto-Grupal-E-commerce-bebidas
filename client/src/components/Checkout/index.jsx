import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addDirecciones, deleteMercadoPago, getMercadoPago } from "../../redux/actions"
export function validate(input) {
  let errors = {};
  if (!input.calle_numero) {
    errors.calle_numero = 'Calle y numero son obligatorios';
  } else if (!/^[A-Za-z0-9//\s]*$/.test(input.calle_numero)) {
    errors.calle_numero = 'Calle y numero: Solo se admiten letras , numeros y /';
  }
  if (!input.codigo_postal) {
    errors.codigo_postal = 'Es obligatorio ingresar un Codigo  postal ';
  } if (!/^\d{4}?$/.test(input.codigo_postal)) {
    errors.codigo_postal = ' Codigo postal: deben ser 4 digitos';
  } if (!input.localidad) {
    errors.localidad = 'Es obligatorio ingresar una Localidad ';
  }
  if (!input.provincia) {
    errors.provincia = 'Es obligatorio ingresar una Provincia ';
  }
  if (!/^[A-Za-z0-9_-\s]{3,40}$/.test(input.localidad)) {
    errors.localidad = 'Localidad: Solo se admiten letras , numeros y entre 3-40 caracteres';
  }
 
  return errors;
}



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
    delivery_type: "",
    calle_numero: null,
    localidad: null,
    codigo_postal: 0,
    provincia: null,
    id_user: user.uid

  })
  const [errors, setErrors] = useState({})
  const [disabled, setDisabled] = useState(true)
  const [direccion, setDireccion] = useState({
    // delivery_type: null, calle_numero: null, localidad: null, codigo_postal: null, provincia: null
  })
  console.log("soy input ", input);
  console.log("soy direccion ", direccion);
  console.log("soy errors ", errors);
  /* const handleMercadoPago = (e) => {
    e.preventDefault();
    dispatch(deleteMercadoPago());
  }; */

  useEffect(() => {
    if (!sandbox) dispatch(getMercadoPago());
    /* dispatch(deleteMercadoPago()); */
    console.log("sandbox ------>", sandbox);
  }, [sandbox, dispatch]);
  
  const handleInputChangeDelivery = function (e) {
     e.target.value === "sucursal" ? setDisabled(true) : setDisabled(false)
    setInput({
     [e.target.name]: e.target.value
    })
  };
   const direccionSucursal = {
    delivery_type: "sucursal", calle_numero: "Colectora Este Ramal Pilar 1250", localidad: "Pilar", codigo_postal: 1629, provincia: "BUENOS AIRES"
   }
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }
  const handleAddress = function (e) {
    e.preventDefault();
    input.delivery_type === "envio" ?
      setDireccion(input) : setDireccion(direccionSucursal)

  }
  const handlesubmitDireccion= function(e){
    e.preventDefault();
    !user? alert("Inicia secion para poder comprar"):
   Object.keys(errors).length === 0 ?
   dispatch(addDirecciones(input)): alert('Revisa los campos ingresados. ')
  }
  const handlePagar = function (e) {
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
                  <li><img src={e.imagen} alt="img not found" width="100px" /></li>
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
              <li><input type="radio" name="delivery_type" value="envio" id="delivery_type_envio" onClick={e => { handleInputChangeDelivery(e) }} />
                <label >Envio a Domicilio estándar Provincia e Interior</label>
                <span>$749,00</span>

                <div>Despechamos tu pedido dentro de las 24 hs. Demora entre 3 a 5 días hábiles.</div>
                {!disabled && user && direccion ?
                  
                  
                  <div   >
                    <div>Enviar al domicilio: {direccion}</div>

                    <h2>Ingresar direccion de envio:</h2>
                    <label> Calle y número</label>
                    <input disabled={disabled} name="calle_numero" type="text" onChange={e => { handleInputChange(e) }} />
                    {errors.calle_numero && <span>{errors.calle_numero}</span>}
                    <br></br>
                    <label> Codigo postal</label>
                    <input disabled={disabled} name="codigo_postal" type="number" onChange={e => { handleInputChange(e) }} />
                    {errors.codigo_postal && <span>{errors.codigo_postal}</span>}
                    <br></br>
                    <label> Provincia</label>
                    <select name="provincia" onChange={e => { handleInputChange(e) }} id="provincia">
                      <option  defaultValue value="">Seleccionar una Provincia</option>
                      <option value="BUENOS AIRES" id="1">BUENOS AIRES</option>
                      <option value="CATAMARCA" id="2">CATAMARCA</option>
                      <option value="CHACO" id="5">CHACO</option>
                      <option value="CHUBUT" id="6">CHUBUT</option>
                      <option value="CIUDAD AUTONOMA DE Bs As" id="50">CIUDAD AUTONOMA DE Bs As</option>
                      <option value="CORDOBA" id="3">CORDOBA</option>
                      <option value="CORRIENTES" id="4">CORRIENTES</option>
                      <option value="ENTRE RIOS" id="7">ENTRE RIOS</option>
                      <option value="FORMOSA" id="8">FORMOSA</option>
                      <option value="JUJUY" id="9">JUJUY</option>
                      <option value="LA PAMPA" id="10">LA PAMPA</option>
                      <option value="LA RIOJA" id="11">LA RIOJA</option>
                      <option value="MENDOZA" id="12">MENDOZA</option>
                      <option value="MISIONES" id="13">MISIONES</option>
                      <option value="NEUQUEN" id="14">NEUQUEN</option>
                      <option value="RIO NEGRO" id="15">RIO NEGRO</option>
                      <option value="SALTA" id="16">SALTA</option>
                      <option value="SAN LUIS" id="17">SAN LUIS</option>
                      <option value="SANTA CRUZ" id="19">SANTA CRUZ</option>
                      <option value="SANTA FE" id="20">SANTA FE</option>
                      <option value="ANTIAGO DEL ESTERO" id="21">SANTIAGO DEL ESTERO</option>
                      <option value="TIERRA DEL FUEGO" id="22">TIERRA DEL FUEGO</option>

                    </select>
                    
                    <label> Localidad</label>
                    <input disabled={disabled} name="localidad" type="text" onChange={e => { handleInputChange(e) }} />
                     {errors.localidad && <span>{errors.localidad}</span>} 
                     <button onClick={handlesubmitDireccion}>Agregar direccion</button>


                  </div> : null
                }


              </li>
              <li>
                <input type="radio" name="delivery_type" value="sucursal" id="delivery_12" onClick={e => { handleInputChangeDelivery(e) }} />
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
        {!direccion.delivery_type ? <button disabled >
          PAGAR
        </button> : <button onClick={handlePagar}>
          PAGAR
        </button>}
      </div>
      ) : productCart.length === 0 && !sandbox ? (
        <span>Ya realizaste tu compra</span>
      ) : null}
    </div>
  );
};

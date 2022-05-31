import React, { useEffect, useState } from "react";
//<<<<<<< HEAD
// import ScriptTag from 'react-script-tag';
import { useParams } from "react-router-dom";
import useScript from "./useScript";
import axios from 'axios';

const FORM_ID = 'payment-form';



//=======
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//<<<<<<< HEAD
import { addCart, cleanCart, deleteOne,getMercadoPago } from "../../redux/actions";
//>>>>>>> 5123e0c6a15e9be4689f4a7efdd39d3afd8bb968
//=======
import { addCart, cleanCart, deleteOne,getMercadoPago, orderMercadoPago } from "../../redux/actions";
//>>>>>>> 24ba4cfdb9e84de44538634be407e2a16d4a8dc6

const ShoppingCart = ({id}) => {

  let navigate = useNavigate()
  const dispatch = useDispatch();

  const verified = useSelector((state) => state.currentUser); //isEmail
  console.log("verified", verified);
  const productReducer = useSelector((state) => state.productCart);
  let productCart = JSON.parse(window.localStorage.getItem("product"));
  const localValue = () => {
    return JSON.parse(window.localStorage.getItem("product"));
  };

  
  useEffect(() => {
    localValue();
  }, [dispatch, productReducer]);

  let productArray = [];
  let subtotal = productCart?.map(
    (element) => element.precio * element.quantity
  );
  let total = 0;
  subtotal?.forEach((e) => (total += e));
  console.log("total-----", total);
  const addProduct = (e) => {
    e.preventDefault();
    let productObject = productArray.find((el) => el.id === e.target.value);
    dispatch(addCart(productObject));
  };
  const deleteProduct = (e) => {
    e.preventDefault();
    dispatch(deleteOne(e.target.value));
  };
  const cleanAllCart = (e) => {
    e.preventDefault();
    dispatch(cleanCart());
  };


  let postCarrito =(e) =>{
    e.preventDefault()
    console.log('soy el dispatch de postCarrito')
    dispatch(orderMercadoPago(productCart))
    navigate('/checkout')
  }

  //----- implementacion mercado pago-----
  const { id } = useParams(); // id de producto
  const [preferenceId, setPreferenceId] = useState(null);
  const { MercadoPago } = useScript(
    "https://sdk.mercadopago.com/js/v2",
    "MercadoPago"
);
 
  useEffect(async() => {
    // luego de montarse el componente, le pedimos al backend el preferenceId
    await axios.post("/checkout", { productId: id }).then((order) => {
      setPreferenceId(order.preferenceId);
    });
  }, [id]);
    
  useEffect(() => {
    if (preferenceId) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
        'https://www.mercadopago.cl/integrations/v1/web-payment-checkout.js';
      script.setAttribute('data-preference-id', preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
    }
  }, [preferenceId]);
  
{/* <script>
  // Agrega credenciales de SDK
  const mp = new MercadoPago("PUBLIC_KEY", {
    locale: "es-AR",
  });

  // Inicializa el checkout
  mp.checkout({
    preference: {
      id: "YOUR_PREFERENCE_ID",
    },
    render: {
      container: ".cho-container", // Indica el nombre de la clase donde se mostrará el botón de pago
      label: "Pagar", // Cambia el texto del botón de pago (opcional)
    },
  });
</script> */}





  return (
    <div>
      <h1>Shopping Cart</h1>
      <h3>Products: </h3>
      <h3>Precio: ${total}</h3>
      {productCart &&
        productCart.map((element) => {
          productArray.push(element);
          console.log("subtotal-----", subtotal);

          return (
            <div>
              <div key={element.id}>
                <h3>{`${element.nombre}`}</h3>
                <img src={element.imagen} alt="img not found" width="20%" />
                <span>
                  <button onClick={deleteProduct} value={element.id}>
                    -
                  </button>
                  ${element.precio} x {element.quantity} = $
                  {element.precio * element.quantity}
                  <button onClick={addProduct} value={element.id}>
                    +
                  </button>
                </span>
              </div>
            </div>
          );
        })}

      <span>
        {verified && verified.email ? (
          <button onClick={postCarrito}>PAGAR</button>
          
          ) : (
            <h3>No podrás comprar hasta estar registrado</h3>
            )}

        <button onClick={cleanAllCart}>Clean Cart</button>

      </span>
    </div>
  );
};

export default ShoppingCart;

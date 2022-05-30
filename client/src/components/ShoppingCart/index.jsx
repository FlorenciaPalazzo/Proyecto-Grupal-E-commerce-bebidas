import React, { useEffect, useState } from "react";
// import ScriptTag from 'react-script-tag';
import { useParams } from "react-router-dom";
import useScript from "./useScript";
import axios from 'axios';

const FORM_ID = 'payment-form';




const ShoppingCart = () => {
  let productCart = JSON.parse(window.localStorage.getItem("product"));
  const localValue = () => {
    return JSON.parse(window.localStorage.getItem("product")); //creo
  };

  console.log(localValue());

  useEffect(() => {
    localValue();
  }, []);

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
      <h1>Carrito de compras</h1>
      <h3>Productos: </h3>
      {productCart &&
        productCart.map((e) => {
          return (
            <div key={e.id}>
              <span>{`${e.nombre} $${e.precio}  ${e.ml}`}</span>
              <img src={e.imagen} alt="img not found" width="20%" />
              {/* <ScriptTag src =  "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"/>;
              <ScriptTag type = "text/javascript"/>
              <ScriptTag.dataset.preferenceId = {preference.preferenceId} />;
              <ScriptTag setAttribute ("data-button-label", "Pagar con Mercado Pago") />;
              <ScriptTag document.getElementById("order-actions").innerHTML = "" />;
              <ScriptTag document.querySelector("#order-actions").appendChild(script) />; */}
            </div>
          );
        })}
        <form id={FORM_ID} method="GET" />
    </div>
  );
};

export default ShoppingCart;


// import React, { useEffect, useState } from 'react';
// import { useParams } from "react-router-dom";

// const FORM_ID = 'payment-form';

// export default function Product() {
//   const { id } = useParams(); // id de producto
//   const [preferenceId, setPreferenceId] = useState(null);



//   return (
//     
//   );
// }



/* 
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ShoppingCart = () => {
  //let productCart = useSelector((state) => state.productCart);
  let products;
  const localValue = () => {
    products = JSON.parse(window.localStorage.getItem("product")); //creo
  };
  let [carrito] = useState(JSON.parse(window.localStorage.getItem("product")));
  useEffect(() => {
    console.log("entro al useEffect de ShoppingCart");
    localValue();
  }, [carrito]);
  console.log("carrito ------>", carrito);
  return (
    <div>
      <h1>Carrito de compras</h1>
      <h3>Productos: </h3>
      {carrito &&
        carrito.map((e) => {
          return (
            <div key={e.id}>
              <span>{`${e.nombre} $${e.precio}  ${e.ml}`}</span>
              <img src={e.imagen} alt="img not found" width="20%" />
            </div>
          );
        })}
    </div>
  );
};

*/

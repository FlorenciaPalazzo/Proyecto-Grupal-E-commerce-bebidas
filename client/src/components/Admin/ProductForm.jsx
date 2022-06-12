import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearState, getProductById, getProducts, updateProduct } from "../../redux/actions";
import validate from "./adminResources";
import FileBase64 from "react-file-base64";

function ProductForm() {
  /** 
    createdAt: "2022-06-08T15:54:46.320Z"
    descripcion: "Andes Origen rescata el placer del momento. Una cerveza pensada para aquellas personas que valoran su tiempo libre, para quienes disfrutan de los pequeños momentos de la vida. La opción ideal para quienes quieren mimarse. La Andes Origen Roja a es una cerveza que posee un final seco y una leve acidez que la hacen muy versátil. Es una cerveza estilo Vienna Lager, su aroma a suave caramelo y leve lúpulo logran un balance perfecto. La Andes origen Roja, color ámbar cobrizo, es una cerveza de deleite. Ideal para acompañar pescados o carnes rojas, elaborados con verduras frescas o grilladas. Pastas, ya sean con o sin relleno, con salsas suaves de tomate o con un toque de crema. Crumble de manzana o de pera."
    graduacion: 5
    id: "011ec29c-8591-4514-a06f-8852ae0fe6eb"
    imagen: "http://www.puroescabio.com.ar/web/image/product.product/43443/image_1024/%5B108%5D%20ANDES%20ORIGEN%20ROJA%20473ml?unique=ee423e9"
    marca: "Andes"
    ml: 473
    nombre: "ANDES ORIGEN ROJA 473ml"
    precio: 180
    stock: 100
    tipo: "cerveza"
    updatedAt: "2022-06-08T15:54:46.320Z"
  */
  const { id } = useParams();
  const prod = useSelector((state) => state.editProduct);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    nombre: "",
    marca: "",
    precio: "", // ## , ##.##
    graduacion: null, // ##%
    ml: null, 
    stock: 0,
    tipo: null,
    descripcion: "",
    imagen: "",
    stock: null
  });

  const [nombreError, setNombreError] = useState(null);
  const [marcaError, setMarcaError] = useState(null);
  const [precioError, setPrecioError] = useState(null);
  const [mlError, setMlError] = useState(null);
  const [graduacionError, setGraduacionError] = useState(null);
  const [tipoError, setTipoError] = useState(null);
  const [descripcionError, setDescripcionError] = useState(null);
  const [stockError, setStockError] = useState(null);

  console.log("prod", prod);
  console.log("input", input);

  function handleChange(e) {
    
    setInput({ ...input, [e.target.name]: e.target.value });
    validate(
      e.target.value,
      e.target.name,
      setNombreError,
      setMarcaError,
      setPrecioError,
      setGraduacionError,
      setTipoError,
      setDescripcionError,
      setMlError,
      setStockError
    );
  }

  function handleSubmit(e){
      e.preventDefault()
      dispatch(updateProduct({id: id, ...input}))
      dispatch(getProducts())
  }

  useEffect(() => {
    if (!prod) {
      dispatch(getProductById(id));
    } else {
      setInput({
        nombre: prod.nombre,
        marca: prod.marca,
        precio: prod.precio,
        graduacion: prod.graduacion,
        ml: prod.ml,
        tipo: prod.tipo,
        descripcion: prod.descripcion,
        stock: prod.stock,
        imagen: prod.imagen
      });
      return () => {
          dispatch(clearState())
      }
    }
  }, [prod]);
  prod && console.log(input.tipo)
  console.log({
    nombreError,
    marcaError,
    precioError,
    mlError,
    graduacionError,
    tipoError,
    descripcionError,
    stockError
  });
  return (
    <div>
      <h1>ProductForm</h1>
      <form>
        {nombreError && (
          <div>
            <span>{nombreError}</span>
          </div>
        )}
        <label htmlFor="nombre">Nombre: </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={input.nombre}
          onChange={handleChange}
        />
        <br />
        {marcaError && (
          <div>
            <span>{marcaError}</span>
          </div>
        )}
        <label htmlFor="marca">Marca: </label>
        <input
          type="text"
          id="marca"
          name="marca"
          value={input.marca}
          onChange={handleChange}
        />
        <br />
        {precioError && (
          <div>
            <span>{precioError}</span>
          </div>
        )}
        <label htmlFor="precio">Precio: $</label>
        <input
          type="float"
          id="precio"
          name="precio"
          value={input.precio}
          onChange={handleChange}
        />
        <br />
        {stockError && (
          <div>
            <span>{stockError}</span>
          </div>
        )}
        <label htmlFor="stock">Stock: </label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={input.stock}
          onChange={handleChange}
        />
        <br />
        {graduacionError && (
          <div>
            <span>{graduacionError}</span>
          </div>
        )}
        <label htmlFor="graduacion">Graduacion en %: </label>
        <input
          type="float"
          id="graduacion"
          name="graduacion"
          value={input.graduacion}
          onChange={handleChange}
        />
        <br />
        {mlError && (
          <div>
            <span>{mlError}</span>
          </div>
        )}
        <label htmlFor="ml">Capacidad en ml. : </label>
        <input
          type="number"
          id="ml"
          name="ml"
          value={input.ml}
          onChange={handleChange}
        />
        <br />
        {tipoError && (
          <div>
            <span>{tipoError}</span>
          </div>
        )}

        <h3>Categoria de producto: </h3>
        {prod && input.tipo ?
        
        <select name="tipo" id="tipo" defaultValue={`${input.tipo}`}>
            <option value="cerveza" >Cerveza</option>
            <option value="vino">Vino</option>
            <option value="espumante" >Espumante</option>
            <option value="destilado">Destilado</option>
        </select>
        :
        <span>Cargando...</span>
        }
        <br />
        <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) => setInput({...input ,imagen: base64 })}
          />
        {/*<select className="selector" name="tipo" onChange={handleChange} defaultValue="tipos" type="radio">
          <option value="cerveza">Cerveza</option>
          <option value="vino">Vino</option>
          <option value="espumante">Espumante</option>
          <option value="destilado">Destilado</option>
        </select>*/}
        <br />
        {descripcionError && (
          <div>
            <span>{descripcionError}</span>
          </div>
        )}
        <label htmlFor="descripcion">Descripcion: </label>
        <textarea
          name="descripcion"
          id="descripcion"
          cols="30"
          rows="10"
          value={input.descripcion}
          onChange={handleChange}
        />
        <br />
        <div>
            {
                prod && <img src={input.imagen} alt="" />
            }
        </div>

        {nombreError ||
        marcaError ||
        precioError ||
        mlError ||
        graduacionError ||
        tipoError ||
        stockError ||
        descripcionError ? (
          <button type="button">Confirmar</button>
        ) : (
          <button type="submit" onClick={handleSubmit}>Confirmar</button>
        )}
      </form>
    </div>
  );
}

export default ProductForm;

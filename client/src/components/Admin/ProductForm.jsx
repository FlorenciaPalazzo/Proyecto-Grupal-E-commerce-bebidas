import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductForm.css";
import swal from "sweetalert";
import {
  clearState,
  getProductById,
  getProducts,
  updateProduct,
} from "../../redux/actions";
import validate from "./adminResources";
import FileBase64 from "react-file-base64";
import AdminPanel from "../AdminPanel";

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
  const navigate = useNavigate()
  console.log("ID", id);
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
    stock: null,
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

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateProduct({ id: id, ...input }));
    dispatch(getProducts());
    navigate("/admin")
  }

  const handleAlertConfirm = (e) =>{
    e.preventDefault();
    swal({
      title: "Favor de completar todos los campos correctamente ",
      icon: "warning",
    })
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
        imagen: prod.imagen,
      });
      return () => {
        dispatch(clearState());
      };
    }
  }, [prod]);
  prod && console.log(input.tipo);
  console.log({
    nombreError,
    marcaError,
    precioError,
    mlError,
    graduacionError,
    tipoError,
    descripcionError,
    stockError,
  });
  return (
    <div className="productform-body">
      <AdminPanel />

      <h1>ProductForm</h1>
      <div className="productform-base">
        <form className="productform-form1">
          <label htmlFor="nombre" className="productform-items">
            Nombre:{" "}
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={input.nombre}
            onChange={handleChange}
            className="productform-items"
          />

          <label htmlFor="marca" className="productform-items">
            Marca:{" "}
          </label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={input.marca}
            onChange={handleChange}
            className="productform-items"
          />

          <label htmlFor="precio" className="productform-items">
            Precio: $
          </label>
          <input
            type="float"
            id="precio"
            name="precio"
            value={input.precio}
            onChange={handleChange}
            className="productform-items"
          />

          <label htmlFor="stock" className="productform-items">
            Stock:{" "}
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={input.stock}
            onChange={handleChange}
            className="productform-items"
          />

          <label htmlFor="graduacion" className="productform-items">
            Graduacion en %:{" "}
          </label>
          <input
            type="float"
            id="graduacion"
            name="graduacion"
            value={input.graduacion}
            onChange={handleChange}
            className="productform-items"
          />

          <label htmlFor="ml" className="productform-items">
            Capacidad en ml. :{" "}
          </label>
          <input
            type="number"
            id="ml"
            name="ml"
            value={input.ml}
            onChange={handleChange}
            className="productform-items"
          />
        </form>

        <div className="productform-error">
          {nombreError && (
            <div>
              <span>{nombreError}</span>
            </div>
          )}
          {marcaError && (
            <div>
              <span>{marcaError}</span>
            </div>
          )}
          {precioError && (
            <div>
              <span>{precioError}</span>
            </div>
          )}
          {stockError && (
            <div>
              <span>{stockError}</span>
            </div>
          )}
          {graduacionError && (
            <div>
              <span>{graduacionError}</span>
            </div>
          )}
          {mlError && (
            <div>
              <span>{mlError}</span>
            </div>
          )}
          {tipoError && (
            <div>
              <span>{tipoError}</span>
            </div>
          )}
        </div>
        <form className="productform-form2">
          <p>Categoria de producto: </p>
          {prod && input.tipo ? (
            <div className="productform-cat">
              <select name="tipo" id="tipo" defaultValue={`${input.tipo}`}>
                <option value="cerveza">Cerveza</option>
                <option value="vino">Vino</option>
                <option value="espumante">Espumante</option>
                <option value="destilado">Destilado</option>
              </select>
            </div>
          ) : (
            <span>Cargando...</span>
          )}
          <br />
          <div className="productform-cat">
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) => setInput({ ...input, imagen: base64 })}
            />
          </div>
          {/*<select className="selector" name="tipo" onChange={handleChange} defaultValue="tipos" type="radio">
          <option value="cerveza">Cerveza</option>
          <option value="vino">Vino</option>
          <option value="espumante">Espumante</option>
          <option value="destilado">Destilado</option>
        </select>*/}

          {descripcionError && (
            <div>
              <span>{descripcionError}</span>
            </div>
          )}
          <div className="productform-cat">
            <label htmlFor="descripcion">Descripcion: </label>
            <textarea
              name="descripcion"
              id="descripcion"
              cols="30"
              rows="10"
              value={input.descripcion}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="productform-cat">
            {prod && <img src={input.imagen} alt="" width="30%" />}
          </div>

          {nombreError ||
          marcaError ||
          precioError ||
          mlError ||
          graduacionError ||
          tipoError ||
          stockError ||
          descripcionError ? (
            <button onClick={handleAlertConfirm} type="button" className="productform-btn">
              Confirmar
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="productform-btn"
            >
              Confirmar
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProductForm;

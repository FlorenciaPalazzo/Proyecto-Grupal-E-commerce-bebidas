import React, { /* useEffect,  */ useState } from "react";
import { useDispatch /*  useSelector */ } from "react-redux";
import { useNavigate /* useParams */ } from "react-router-dom";
import {
  /* clearState, */
  createProduct,
  /* getProductById,
  getProducts,
  updateProduct, */
} from "../../redux/actions";
import validate from "./adminResources";
import FileBase64 from "react-file-base64";

//---------------------------------------------------------- //
//NOTA!!!! : Varias de las cosas comentadas fueron porque en //
//la consola del explorador aparecian en amarrillo           //
//si algo anda mal, revisar. Romper con cuidado.             //
//----------------------------------------------------------

function CreateProducts() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    nombre: "",
    marca: "",
    precio: "", // ## , ##.##
    graduacion: null, // ##%
    ml: null,
    stock: 0, // hay dos stock preguntar cual queda
    tipo: "cerveza",
    descripcion: "",
    imagen: "",
    stock: null, // hay dos stock preguntar cual queda
  });

  const [nombreError, setNombreError] = useState(null);
  const [marcaError, setMarcaError] = useState(null);
  const [precioError, setPrecioError] = useState(null);
  const [mlError, setMlError] = useState(null);
  const [graduacionError, setGraduacionError] = useState(null);
  const [tipoError, setTipoError] = useState(null);
  const [descripcionError, setDescripcionError] = useState(null);
  const [stockError, setStockError] = useState(null);
  const [bool, setBool] = useState(false);
  const navigate = useNavigate();
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
    setBool(true);
  }
  function postHandle() {
    console.log("posthandle");
    dispatch(createProduct(input));
    navigate("/admin/products");
    window.location.reload();
  }
  function handleSubmit(e) {
    e.preventDefault();
    let arr = Object.entries(input);
    arr.map((e) =>
      validate(
        e[1],
        e[0],
        setNombreError,
        setMarcaError,
        setPrecioError,
        setGraduacionError,
        setTipoError,
        setDescripcionError,
        setMlError,
        setStockError
      )
    );

    postHandle();
  }

  console.log(input);
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
    <div>
      <h1>Create Form</h1>
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

        <select
          name="tipo"
          id="tipo"
          defaultValue={`cerveza`}
          onChange={handleChange}
        >
          <option value="cerveza">Cerveza</option>
          <option value="vino">Vino</option>
          <option value="espumante">Espumante</option>
          <option value="destilado">Destilado</option>
        </select>

        <br />
        <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => setInput({ ...input, imagen: base64 })}
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

        {nombreError ||
        marcaError ||
        precioError ||
        mlError ||
        graduacionError ||
        tipoError ||
        stockError ||
        descripcionError ||
        !input.descripcion ||
        !input.graduacion ||
        !input.imagen ||
        !input.marca ||
        !input.ml ||
        !input.nombre ||
        !input.precio ||
        !input.stock ||
        !bool ? (
          <button
            type="button"
            onClick={() => alert("Complete todos los campos weon")}
          >
            Crear
          </button>
        ) : (
          <button type="submit" onClick={handleSubmit}>
            Crear
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateProducts;

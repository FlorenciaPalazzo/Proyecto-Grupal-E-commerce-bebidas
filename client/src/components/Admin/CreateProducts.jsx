import React, { /* useEffect,  */ useEffect, useState } from "react";
import { useDispatch /*  useSelector */, useSelector } from "react-redux";
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
import "./CreateProducts.css";
import AdminPanel from "../AdminPanel";
import Loading from "../Loading";
import swal from "sweetalert";

//---------------------------------------------------------- //
//NOTA!!!! : Varias de las cosas comentadas fueron porque en //
//la consola del explorador aparecian en amarrillo           //
//si algo anda mal, revisar. Romper con cuidado.             //
//----------------------------------------------------------

function CreateProducts() {
  const user = useSelector((state) => state.currentUser);
  const isAdmin = useSelector((state) => state.isAdmin);
  const isLoading = useSelector((state) => state.isLoading);
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
    swal({
      title: "Producto creado",
      icon: "success",
      buttons: false,
      timer: 1200,
    }).then(() => postHandle())

    
  }
  useEffect(() => {
    if (!isLoading) {
      if (user && isAdmin) {
        let a;
      } else {
        navigate("/*");
      }
    }
  }, [isLoading]);

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
  console.log("is loading create form",isLoading);
  return (
    <div>
      {isLoading   /*|| !user || !isAdmin revisen esto!! */ ? (
        <Loading />
      ) : (
        <div className="c-body">
          <AdminPanel />
          <div className="c-base">
            <h1>Create Form</h1>
            <form className="c-form1">
              {nombreError && (
                <div>
                  <span>{nombreError}</span>
                </div>
              )}
              <label htmlFor="nombre" className="c-items">
                Nombre:{" "}
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={input.nombre}
                onChange={handleChange}
                className="c-items"
              />

              {marcaError && (
                <div>
                  <span>{marcaError}</span>
                </div>
              )}
              <label className="c-items" htmlFor="marca">
                Marca:{" "}
              </label>
              <input
                type="text"
                id="marca"
                name="marca"
                value={input.marca}
                onChange={handleChange}
                className="c-items"
              />

              {precioError && (
                <div>
                  <span>{precioError}</span>
                </div>
              )}
              <label htmlFor="precio" className="c-items">
                Precio: $
              </label>
              <input
                type="float"
                id="precio"
                name="precio"
                value={input.precio}
                onChange={handleChange}
                className="c-items"
              />

              {stockError && (
                <div>
                  <span>{stockError}</span>
                </div>
              )}
              <label htmlFor="stock" className="c-items">
                Stock:{" "}
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={input.stock}
                onChange={handleChange}
                className="c-items"
              />

              {graduacionError && (
                <div>
                  <span>{graduacionError}</span>
                </div>
              )}
              <label htmlFor="graduacion" className="c-items">
                Graduacion en %:{" "}
              </label>
              <input
                type="float"
                id="graduacion"
                name="graduacion"
                value={input.graduacion}
                onChange={handleChange}
                className="c-items"
              />

              {mlError && (
                <div>
                  <span>{mlError}</span>
                </div>
              )}
              <label htmlFor="ml" className="c-items">
                Capacidad en ml. :{" "}
              </label>
              <input
                type="number"
                id="ml"
                name="ml"
                value={input.ml}
                onChange={handleChange}
                className="c-items"
              />

              {tipoError && (
                <div>
                  <span>{tipoError}</span>
                </div>
              )}

              <h3>Categoria de producto: </h3>

              <select
                className="c-items"
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
              <label htmlFor="descripcion" className="c-items">
                Descripcion:{" "}
              </label>
              <textarea
                name="descripcion"
                id="descripcion"
                cols="30"
                rows="10"
                value={input.descripcion}
                onChange={handleChange}
                className="c-items"
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
                  className="c-btn"
                  type="button"
                  onClick={() =>
                    swal({
                      title: "Complete todos los campos por favor ",
                      icon: "info",
                      buttons: false,
                      timer: 2000,
                    })
                  }
                >
                  Crear
                </button>
              ) : (
                <button type="submit" className="c-btn" onClick={handleSubmit}>
                  Crear
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateProducts;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import {
  addDirecciones,
  deleteDirecciones,
  deleteMercadoPago,
  getDirecciones,
  getMercadoPago,
} from "../../redux/actions";
import Footer from "../Footer";
import Loading from "../Loading";
import Nav from "../Nav";
import NavBarSec from "../NavBarSec";
import "./CheckoutStyles.css";

export function validate(input) {
  let errors = {};
  if (!input.calle_numero) {
    errors.calle_numero = "Calle y numero son obligatorios";
  } else if (!/^[A-Za-z0-9//\s]*$/.test(input.calle_numero)) {
    errors.calle_numero =
      "Calle y numero: Solo se admiten letras , numeros y /";
  }
  if (!input.codigo_postal) {
    errors.codigo_postal = "Es obligatorio ingresar un Codigo  postal ";
  }
  if (!/^\d{4}?$/.test(input.codigo_postal)) {
    errors.codigo_postal = " Codigo postal: deben ser 4 digitos";
  }
  if (!input.localidad) {
    errors.localidad = "Es obligatorio ingresar una Localidad ";
  }
  if (!input.provincia) {
    errors.provincia = "Es obligatorio ingresar una Provincia ";
  }
  if (!/^[A-Za-z0-9_-\s]{3,40}$/.test(input.localidad)) {
    errors.localidad =
      "Localidad: Solo se admiten letras , numeros y entre 3-40 caracteres";
  }

  return errors;
}

export const Checkout = () => {
  const sandbox = useSelector((state) => state.mpSandBox);
  const loading = useSelector((state) => state.isLoading);
  const user = useSelector((state) => state.currentUser);
  const { id } = useParams();

  const [boleano, setBoleano] = useState(false);
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
    id_user: id,
  });
  const direcciones = useSelector((state) => state.direcciones);
  console.log("soy direcciones", direcciones);
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [direccion, setDireccion] = useState({
    delivery_type: null,
    calle_numero: null,
    localidad: null,
    codigo_postal: null,
    provincia: null,
  });
  console.log("soy input ", input);
  console.log("soy direccion ", direccion);
  console.log("soy errors ", errors);

  useEffect(() => {
    if (!sandbox) dispatch(getMercadoPago());
    dispatch(getDirecciones(id));
    console.log("sandbox ------>", sandbox);
  }, [sandbox, dispatch, user, boleano]);

  const direccionSucursal = {
    delivery_type: "sucursal",
    calle_numero: "Colectora Este Ramal Pilar 1250",
    localidad: "Pilar",
    provincia: "BUENOS AIRES",
  };
  const handleInputChange = function (e) {
    if (e.target.value === "sucursal") {
      setDisabled(true);
      setInput({
        [e.target.name]: e.target.value,
        id_user: id,
      });
      setDireccion(direccionSucursal);
    }
    if (e.target.value === "envio") {
      setDisabled(false);
    }

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleDireccion = function (e) {
    e.preventDefault();

    let preventAddress = direcciones.find(
      (el) => el.id_direcciones === e.target.value
    );
    setInput(preventAddress);
    input.delivery_type === "sucursal"
      ? setDireccion(direccionSucursal)
      : setDireccion(preventAddress);
    setBoleano(!boleano);
  };

  const handleDelDir = (e) => {
    e.preventDefault();
    let id = e.target.value;
    dispatch(deleteDirecciones(id));
    swal({
      title: "Dirección borrada con éxito ",
      type: "warning",
      icon: "warning",
      buttons: false,
      timer: 800,
    });
    setBoleano(!boleano);
  };

  const handleAlertPagar = (e) => {
    e.preventDefault();
    swal({
      title: "Favor de confirmar dirección ",
      type: "warning",
      icon: "warning",
      buttons: false,
      timer: 800,
    });
  };

  const handlesubmitDireccion = function (e) {
    e.preventDefault();
    if (
      Object.keys(errors).length === 0 &&
      input.calle_numero &&
      input.codigo_postal &&
      input.localidad &&
      input.provincia
    ) {
      dispatch(addDirecciones(input));

      setDireccion(input);

      setInput({
        delivery_type: "",
        calle_numero: null,
        localidad: null,
        codigo_postal: 0,
        provincia: null,
        id_user: id,
      });
      swal({
        title: "Dirección agregada ",
        type: "success",
        icon: "success",
        buttons: false,
        timer: 900,
      });

      setBoleano(!boleano);
    } else
      swal({
        title: "Revisa los campos ingresados",
        type: "warning",
        icon: "warning",
      });
  };
  const handlePagar = function (e) {
    e.preventDefault();
    window.location.replace(sandbox);
    setBoleano(!boleano);
  };
  let subtotal = productCart?.map(
    (element) => element.precio * element.quantity
  );

  let total = 0;
  subtotal?.forEach((e) => (total += e));
  return (
    <div className="checkout-div-main">
      <NavBarSec />

      {loading /* revisen esto!! */ ? (
        <Loading />
      ) : (
        <div className="checkout-div-render">
          <div className="checkout-div-info">
            <div className="checkout-product-delivery">
              <div className="checkout-product">
                <h2>Detalle de compra</h2>
                {productCart.length
                  ? productCart.map((e) => {
                      return (
                        <div className="checkout-product-detail">
                          <ul className="checkout-ul" key={e.id}>
                            <img
                              src={e.imagen}
                              alt="img not found"
                              width="70%"
                            />
                            <li>{e.nombre}</li>
                            <li>{e.quantity} unid.</li>
                            <li>${e.precio},00</li>
                          </ul>
                        </div>
                      );
                    })
                  : null}
                <div className="checkout-delivery-info">
                  {direccion.delivery_type === "envio" ? (
                    <div className="form-direccion ">
                      <h2>Costo de envio : $749,00</h2>
                      <h2>Total: $ {total + 749},00 </h2>
                    </div>
                  ) : (
                    <div className="form-direccion ">
                      <h2>Total : $ {total},00</h2>
                    </div>
                  )}
                </div>
                <div>
                  {direccion.provincia &&
                  direccion.localidad &&
                  direccion.calle_numero ? (
                    <div>
                      <div className="form-direccion">
                        <h2>
                          Envio a:{" "}
                          {`${direccion.provincia} , ${direccion.localidad}, ${direccion.calle_numero}, CP ${direccion.codigo_postal} `}
                        </h2>
                      </div>

                      <div className="envio-dir">
                        <button
                          className="btn bg-success"
                          onClick={handlePagar}
                        >
                          PAGAR{" "}
                        </button>
                      </div>
                    </div>
                  ) : (
                    //
                    <div className="envio-dir">
                      <button
                        className="btn bg-success"
                        onClick={handleAlertPagar}
                      >
                        {" "}
                        PAGAR{" "}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="checkout-delivery">
                <h3>Elegir metodo de entrega</h3>
                <ul>
                  <li className="user-direccion-ul">
                    <label>
                      {" "}
                      <input
                        type="radio"
                        name="delivery_type"
                        value="envio"
                        id="delivery_type_envio"
                        onClick={(e) => {
                          handleInputChange(e);
                        }}
                      />
                      Envio a Domicilio estándar Provincia e Interior
                    </label>

                    <span>$749,00</span>

                    <div>
                      Despachamos tu pedido dentro de las 24 hs. Demora entre 3
                      a 5 días hábiles.
                    </div>
                  </li>
                  {!disabled ? (
                    <div>
                      <div className="user-direccion">
                        <h2>Enviar al domicilio: </h2>
                        <ul>
                          {direcciones?.map((e) => {
                            return (
                              <li
                                key={e.id_direcciones}
                                className="user-direccion-ul"
                              >
                                <label>
                                  <input
                                    type="radio"
                                    name="direcciones"
                                    id={e.id_direcciones}
                                    value={e.id_direcciones}
                                    onClick={(e) => {
                                      handleDireccion(e);
                                    }}
                                  />
                                  {`  ${e.provincia} , ${e.localidad} , ${e.calle_numero} , CP ${e.codigo_postal} `}

                                  <button
                                    type="button"
                                    class="btn btn-outline-light btn-sm text-danger "
                                    onClick={handleDelDir}
                                    value={e.id_direcciones}
                                  >
                                    Borrar
                                  </button>
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="form-direccion">
                        <h2>Ingresar Nueva direccion de envio:</h2>
                        <label> Calle y número</label>
                        <input
                          disabled={disabled}
                          name="calle_numero"
                          type="text"
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                          placeholder="Ingrese Calle y numero"
                        />
                        {errors.calle_numero && (
                          <span className="form-dir-danger">
                            {errors.calle_numero}
                          </span>
                        )}
                        <br></br>
                        <label> Codigo postal</label>
                        <input
                          disabled={disabled}
                          name="codigo_postal"
                          type="number"
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                          placeholder="Codigo postal (4 digitos)"
                        />
                        {errors.codigo_postal && (
                          <span className="form-dir-danger">
                            {errors.codigo_postal}
                          </span>
                        )}
                        <br></br>
                        <label> Provincia</label>
                        <select
                          name="provincia"
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                          id="provincia"
                          placeholder=" Seleccione una provincia"
                          className="form-dir-select"
                        >
                          <option defaultValue value="">
                            Seleccionar una Provincia
                          </option>
                          <option value="BUENOS AIRES" id="1">
                            BUENOS AIRES
                          </option>
                          <option value="CATAMARCA" id="2">
                            CATAMARCA
                          </option>
                          <option value="CHACO" id="5">
                            CHACO
                          </option>
                          <option value="CHUBUT" id="6">
                            CHUBUT
                          </option>
                          <option value="CIUDAD AUTONOMA DE Bs As" id="50">
                            CIUDAD AUTONOMA DE Bs As
                          </option>
                          <option value="CORDOBA" id="3">
                            CORDOBA
                          </option>
                          <option value="CORRIENTES" id="4">
                            CORRIENTES
                          </option>
                          <option value="ENTRE RIOS" id="7">
                            ENTRE RIOS
                          </option>
                          <option value="FORMOSA" id="8">
                            FORMOSA
                          </option>
                          <option value="JUJUY" id="9">
                            JUJUY
                          </option>
                          <option value="LA PAMPA" id="10">
                            LA PAMPA
                          </option>
                          <option value="LA RIOJA" id="11">
                            LA RIOJA
                          </option>
                          <option value="MENDOZA" id="12">
                            MENDOZA
                          </option>
                          <option value="MISIONES" id="13">
                            MISIONES
                          </option>
                          <option value="NEUQUEN" id="14">
                            NEUQUEN
                          </option>
                          <option value="RIO NEGRO" id="15">
                            RIO NEGRO
                          </option>
                          <option value="SALTA" id="16">
                            SALTA
                          </option>
                          <option value="SAN LUIS" id="17">
                            SAN LUIS
                          </option>
                          <option value="SANTA CRUZ" id="19">
                            SANTA CRUZ
                          </option>
                          <option value="SANTA FE" id="20">
                            SANTA FE
                          </option>
                          <option value="ANTIAGO DEL ESTERO" id="21">
                            SANTIAGO DEL ESTERO
                          </option>
                          <option value="TIERRA DEL FUEGO" id="22">
                            TIERRA DEL FUEGO
                          </option>
                        </select>
                        {errors.provincia && (
                          <span className="form-dir-danger">
                            {errors.provincia}
                          </span>
                        )}

                        <label> Localidad</label>
                        <input
                          disabled={disabled}
                          name="localidad"
                          type="text"
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                          placeholder="Ingrese una localidad"
                        />
                        {errors.localidad && (
                          <span className="form-dir-danger">
                            {errors.localidad}
                          </span>
                        )}
                        <div className="btn-add-direccion">
                          <button
                            type="button"
                            class="btn btn-outline-dark btn-sm text-danger "
                            onClick={handlesubmitDireccion}
                          >
                            Agregar direccion
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <li className="user-direccion-ul">
                    <label>
                      {" "}
                      <input
                        type="radio"
                        name="delivery_type"
                        value="sucursal"
                        id="delivery_12"
                        onClick={(e) => {
                          handleInputChange(e);
                        }}
                      />
                      Retiro por sucursal Pilar
                    </label>
                    <span>Gratuito</span>
                    <div>
                      Retirá tu pedido sin costo de envío en nuestra sucursal de
                      Pilar.
                      <br></br>
                      <br></br>
                      Disponible Lunes a Miércoles de 11 a 21 hs | Jueves a
                      Sábados de 11 a 00 hs.
                      <br></br>
                      <br></br>
                      Colectora Este Ramal Pilar 1250, B1669 Del Viso, Provincia
                      de Buenos Aires
                      <br></br>
                      <br></br>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="btn-back-cart">
            <button>
              <svg
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 1024 1024"
              >
                <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
              </svg>
              <span>
                <Link to="/cart">Carrito</Link>
              </span>
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

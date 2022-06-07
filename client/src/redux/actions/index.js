import {
  ADMIN_HANDLER,
  GET_PRODUCT_NAME,
  FILTER_BY_BRAND,
  FILTER_BY_TYPE,
  FILTER_BY_GRADUATION,
  FILTER_BY_ML,
  FILTER_BY_PRICE,
  FILTER_BY_AZ,
  FILTER_BY_ZA,
  SET_USER,
  UPDATE_USER,
  SET_LOADING,
  GET_PRODUCT_ID,
  GET_BRANDS,
  GET_PRODUCTS,
  ADD_CARRITO,
  RESET_USER,
  SET_FAV,
  GET_FAV,
  DEL_FAV,
  CREATE_USER,
  GET_USERS_LOGED,
  DELETE_ONE_PRODUCT,
  REMOVE_ALL_CARRITO,
  ADD_IN_CART,
  GET_MERCADO_PAGO,
  ORDER_MERCADO_PAGO,
  DELETE_MERCADO_PAGO,
  FEEDBACK_MERCADO_PAGO,
  GET_USER_DB,
  POST_REVIEW,
  GET_REVIEW,
  PUT_REVIEW,
  DELETE_REVIEW,
  GET_REVPAGE,
  GET_ALL_REVIEWS,
  RESET_USER_DB,
  ADD_HIST,
  GET_HIST
} from "./actionsTypes";
import axios from "axios";
import { auth } from "../../fb";

import firebase from "firebase/app";
import "firebase/database";

//-------------------------------AUTH-------------------------------//
export function isAdmin(email) {
  return async (dispatch) => {
    return dispatch({ type: ADMIN_HANDLER, payload: email });
  };
}

export function setUser(user) {
  return async (dispatch) => {
    return dispatch({ type: SET_USER, payload: user });
  };
}

export function createUser(user) {
  // { id, nombre, email, nacimiento, direccion, telefono }
  console.log("user", user);
  axios
    .post("http://localhost:3001/usuario", {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      nacimiento: user.nacimiento,
      direccion: user.direccion,
      telefono: user.telefono,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      image: user.image
    })
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e));
}

export function updateUser(user) {
  // { id, nombre, email, nacimiento, direccion, telefono }
  console.log("user", user);
  let updated = axios
    .put("http://localhost:3001/usuario", {
      user,
      // id: user.id,
      // nombre: user.nombre,
      // apellido: user.apellido,
      // email: user.email,
      // nacimiento: user.nacimiento,
      // direccion: user.direccion,
      // telefono: user.telefono,
      // isAdmin: user.isAdmin,
      // isVerified: user.isVerified
    })
    .then((res) => res.data)
    .catch((e) => console.log(e));
  console.log("updated", updated);
  return async (dispatch) => {
    return dispatch({ type: UPDATE_USER, dispatch: updated });
  };
}

export function resetUser() {
  return async (dispatch) => {
    return dispatch({ type: RESET_USER });
  };
}

export function getUsersLoged() {
  return async (dispatch) => {
    try {
      let usersFound = await axios
        .get("http://localhost:3001/usuario")
        .then((users) => users.data);
      return dispatch({ type: GET_USERS_LOGED, payload: usersFound });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUserDb(id) {
  return async (dispatch) => {
    try {
      let userFound = await axios
        .get("http://localhost:3001/usuario/" + id)
        .then((users) => users.data);
      return dispatch({ type: GET_USER_DB, payload: userFound });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setLoading(bool) {
  return async (dispatch) => {
    return dispatch({ type: SET_LOADING, payload: bool });
  };
}
export function resetUserDb() {
  return async (dispatch) => {
    return dispatch({ type: RESET_USER_DB });
  };
}

//------------------------------------------------------------------//

//trae todos los productos
export const getProducts = () => {
  return async function (dispatch) {
    try {
      let result = await axios.get(`http://localhost:3001/producto/bebidas`);
      return dispatch({
        type: GET_PRODUCTS,
        payload: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

//busqueda por nombre
export const getProductByName = (name) => {
  return async function (dispatch) {
    try {
      let result = await axios.get(
        `http://localhost:3001/producto/bebidas?nombre=${name}`
      );
      return dispatch({
        type: GET_PRODUCT_NAME,
        payload: result.data,
      });
    } catch (err) {
      console.log(err);
      /* alert(`No hay productos con el nombre ${name}`); */
    }
  };
};

//busqueda por id
export const getProductById = (id) => {
  return async function (dispatch) {
    try {
      let result = await axios.get(
        "http://localhost:3001/producto/bebida/" + id
      );
      return dispatch({
        type: GET_PRODUCT_ID,
        payload: result.data,
      });
    } catch (err) {
      console.log("Error desde el catch de getProductById", err);
    }
  };
};
//trae las marcas
export const getBrands = () => {
  return async function (dispatch) {
    try {
      return dispatch({
        type: GET_BRANDS,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
//filtra por marca
export const filterByBrand = (filter) => {
  return async function (dispatch) {
    try {
      return dispatch({
        type: FILTER_BY_BRAND,
        payload: filter,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
//filtra por tipo
export const filterByType = (filter) => {
  return async function (dispatch) {
    try {
      console.log("ACTION DISPARADA");
      return dispatch({
        type: FILTER_BY_TYPE,
        payload: filter,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
//filtra por graduacion
export const filterByGraduation = (filter) => {
  return async function (dispatch) {
    try {
      return dispatch({
        type: FILTER_BY_GRADUATION,
        payload: filter,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
//filtra por milipilis
export const filterByML = (filter) => {
  return async function (dispatch) {
    try {
      return dispatch({
        type: FILTER_BY_ML,
        payload: filter,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
//filtra por precio
export const filterByPrice = (filter) => {
  return async function (dispatch) {
    try {
      return dispatch({
        type: FILTER_BY_PRICE,
        payload: filter,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
//filtra por orden alfabetico asc y desc
export const filterByAZ = (filter) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: FILTER_BY_AZ,
        payload: filter,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const addCart = (product) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: ADD_CARRITO,
        payload: product,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteOne = (product) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: DELETE_ONE_PRODUCT,
        payload: product,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const cleanCart = () => {
  return async function (dispatch) {
    try {
      dispatch({
        type: REMOVE_ALL_CARRITO,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const buyCart = () => {
  return async function (dispatch) {
    try {
      console.log("esperando ruta");
    } catch (err) {
      console.log(err);
    }
  };
};

//ESTO ESTA ANDANDO LISTO...
export const orderMercadoPago = (localStorage) => {
  return async function (dispatch) {
    try {
      let result = await axios.post(
        "http://localhost:3001/usuario/carrito",
        localStorage
      );

      console.log(result);
      return dispatch({
        type: ORDER_MERCADO_PAGO,
      });
    } catch (err) {
      console.log("Error desde el catch de orderMercadoPago", err);
    }
  };
};

export const getMercadoPago = () => {
  return async function (dispatch) {
    try {
      let result = await axios.post("http://localhost:3001/usuario/checkout");
      console.log(result.data);
      console.log("entro a getMercadoPago");
      return dispatch({
        type: GET_MERCADO_PAGO,
        payload: result.data.sandbox_init_point,
      });
    } catch (err) {
      console.log("Error desde el catch de getMercadoPago", err);
    }
  };
};

export const deleteMercadoPago = () => {
  return async function (dispatch) {
    try {
      let result = await axios.delete("http://localhost:3001/usuario/checkout");
      console.log("entro a borrar");
      return dispatch({
        type: DELETE_MERCADO_PAGO,
      });
    } catch (err) {
      console.log("Error desde el catch deleteMercadoPago", err);
    }
  };
};

export const feedBack = () => {
  return async function (dispatch) {
    try {
      let result = await axios.get("http://localhost:3001/usuario/feedback");
      console.log("result.data ------->FEEDBACK", result.data);
      return dispatch({
        type: FEEDBACK_MERCADO_PAGO,
        payload: result.data,
      });
    } catch (err) {
      console.log("Error feedback catch", err);
    }
  };
};

// -------- review --------

export const postReview = (payload) => {
  return async function (dispatch) {
    try {
      let result = await axios.post("http://localhost:3001/review/", payload);
      return dispatch({
        type: POST_REVIEW,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
export const getAllReviews = () => {
  return async function (dispatch) {
    try {
      let result = await axios.get("http://localhost:3001/review/all");
      console.log("result.date", result.data);
      return dispatch({
        type: GET_ALL_REVIEWS,
        payload: result.data,
      });
    } catch (err) {
      console.log("error desde el catch getAllReviews", err);
    }
  };
};

export const getReview = (id) => {
  return async function (dispatch) {
    try {
      let result = await axios.get("http://localhost:3001/review/" + id);
      return dispatch({
        type: GET_REVIEW,
        payload: result.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getReviewPage = () => {
  return async function (dispatch) {
    try {
      let result = await axios.get("http://localhost:3001/review");
      console.log(result.data, "ACTION");
      return dispatch({
        type: GET_REVPAGE,
        payload: result.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const putReview = (id) => {
  return async function (dispatch) {
    try {
      let result = await axios.get("http://localhost:3001/review/" + id);
      return dispatch({
        type: PUT_REVIEW,
        payload: result.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
export const deleteReview = (id) => {
  return async function (dispatch) {
    try {
      let result = await axios.delete("http://localhost:3001/review/" + id);
      return dispatch({
        type: DELETE_REVIEW,
      });
    } catch (e) {
      console.log("Error del action del deleteReview", e);
    }
  };
};

export const setFavorito = (payload) => {
  return async function (dispatch) {
    try {
      let result = await axios.post("http://localhost:3001/producto", payload);
      return dispatch({
        type: SET_FAV,
        payload: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getFavorito = (id) => {
  return async function (dispatch) {
    try {
      let result = await axios.get(
        `http://localhost:3001/producto/favoritos/${id}`
      );
      return dispatch({
        type: GET_FAV,
        payload: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteFavorito = ({ id_user, id_prod }) => {
  return async function (dispatch) {
    try {
      console.log("SOY EL PAYLOAD DE LA ACTION");
      let result = await axios.delete(
        `http://localhost:3001/producto/favoritos?id_prod=${id_prod}&&id_user=${id_user}`
      );

      return dispatch({
        type: DEL_FAV,
        payload: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

    //====================================== HISTORIAL ========================//


export const addHist = (payload) => {
  return async function (dispatch) {
    let historial = await axios.post('http://localhost:3001/producto/historial', payload)
    console.log( payload , "<=================== Soy el payload de lo que debería estar recibiendo la funcion")
    return dispatch({
      type : ADD_HIST
    })
  }
}

export const getHist = (id) => {
  return async function (dispatch) {
   try{ 

    let historial = await axios.get(`http://localhost:3001/producto/historial/${id}`)

    // console.log(historial.data, "El historial esta llegando correctamente a la funcion")
    return dispatch({
      type : GET_HIST,
      payload : historial.data
    })
  } catch(err){
    console.log(err)
  }} 
}

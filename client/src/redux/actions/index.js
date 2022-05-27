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
  SET_LOADING,
  GET_PRODUCT_ID,
  GET_BRANDS,
  GET_PRODUCTS,
  ADD_CARRITO,
  RESET_USER,
} from "./actionsTypes";
import axios from "axios";

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

export function resetUser() {
  return async (dispatch) => {
    return dispatch({ type: RESET_USER });
  };
}

export function setLoading(bool) {
  return async (dispatch) => {
    return dispatch({ type: SET_LOADING, payload: bool });
  };
}
//------------------------------------------------------------------//

//trae todos los productos
export const getProducts = () => {
  return async function (dispatch) {
    try {
      let result = await axios.get(`http://localhost:3001/bebidas`);
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
        `http://localhost:3001/bebidas?nombre=${name}`
      );
      //.
      return dispatch({
        type: GET_PRODUCT_NAME,
        payload: result.data,
      });
    } catch (err) {
      console.log("Error desde el catch de getProductByName", err);
    }
  };
};

//busqueda por id
export const getProductById = (id) => {
  return async function (dispatch) {
    try {
      let result = await axios.get("http://localhost:3001/bebida/" + id);
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

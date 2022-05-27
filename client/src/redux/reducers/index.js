/* import { onAuthStateChanged } from "firebase/auth";
import { auth, currentUser } from "../../fb"; */
import {
  ADMIN_HANDLER,
  SET_USER,
  RESET_USER,
  SET_LOADING,
  FILTER_BY_AZ,
  FILTER_BY_BRAND,
  FILTER_BY_GRADUATION,
  FILTER_BY_ML,
  FILTER_BY_PRICE,
  FILTER_BY_TYPE,
  GET_BRANDS,
  GET_PRODUCT_ID,
  GET_PRODUCT_NAME,
  GET_PRODUCTS,
  ADD_CARRITO, //---------> prueba!!!
} from "../actions/actionsTypes";

const initialState = {
  currentUser: null,
  isAdmin: null,
  isLoged: false,
  isLoading: true,
  brands: [],
  products: [],
  productsSort: [],
  detail: [],
  productCart: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        productsSort: payload,
      };
    case SET_USER:
      return { ...state, currentUser: payload, isLoged: true };
    case RESET_USER:
      return { ...state, currentUser: {}, isLoged: false };
    case SET_LOADING:
      return { ...state, isLoading: payload };
    case ADMIN_HANDLER: {
      console.log(process.env.REACT_APP_ADMIN_EMAIL, payload);
      if (process.env.REACT_APP_ADMIN_EMAIL === payload) {
        return { ...state, isAdmin: true };
      } else return { ...state, isAdmin: false };
    }

    case SET_LOADING:
      return { ...state, isLoading: payload };
    case ADMIN_HANDLER: {
      console.log(process.env.REACT_APP_ADMIN_EMAIL, payload);
      if (process.env.REACT_APP_ADMIN_EMAIL === payload) {
        return { ...state, isAdmin: true };
      } else return { ...state, isAdmin: false };
    }
    case GET_PRODUCT_NAME:
      return { ...state, products: payload };

    case GET_PRODUCT_ID:
      return { ...state, detail: payload };

    case GET_BRANDS:
      let brandFilter = [];
      state.productsSort.filter((e) => {
        if (!brandFilter.includes(e.marca)) {
          brandFilter.push(e.marca);
        }
      });
      return {
        ...state,
        brands: brandFilter,
      };
    case FILTER_BY_BRAND:
      if (payload === "all") {
        return { ...state, products: state.productsSort };
      } else {
        return {
          ...state,
          products: state.productsSort.filter((e) => e.marca.includes(payload)),
        };
      }
    case FILTER_BY_TYPE:
      if (payload === "all") {
        return { ...state, products: state.products };
      }
      console.log("LLEGA A REDUCER");
      console.log(payload);
      let typeFilter = [];
      state.productsSort.forEach((e) => {
        if (e.tipo === payload) {
          typeFilter.push(e);
        }
      });
      console.log("TYPEFILTER ", typeFilter);
      return {
        ...state,
        products: typeFilter,
      };

    case FILTER_BY_GRADUATION:
      if (payload === "all") {
        return {
          ...state,
          products: state.productsSort,
        };
      }
      if (payload === "low") {
        return {
          ...state,
          products: state.productsSort.filter((e) => e.graduacion < 20),
        };
      }
      if (payload === "medium") {
        return {
          ...state,
          products: state.productsSort.filter(
            (e) => e.graduacion > 20 && e.graduacion < 38
          ),
        };
      }
      if (payload === "high") {
        return {
          ...state,
          products: state.productsSort.filter((e) => e.graduacion > 38),
        };
      }
    case FILTER_BY_ML:
      if (payload === "all") {
        return {
          ...state,
          products: state.productsSort,
        };
      }
      if (payload === "ml_1") {
        return {
          ...state,
          products: state.productsSort.filter((e) => e.ml < 400),
        };
      }
      if (payload === "ml_2") {
        return {
          ...state,
          products: state.productsSort.filter((e) => e.ml > 400 && e.ml <= 749),
        };
      }
      if (payload === "ml_3") {
        return {
          ...state,
          products: state.productsSort.filter(
            (e) => e.ml >= 750 && e.ml <= 949
          ),
        };
      }

      if (payload === "ml_4") {
        return {
          ...state,
          products: state.productsSort.filter(
            (e) => e.ml >= 950 && e.ml < 1500
          ),
        };
      }
    case FILTER_BY_PRICE:
      if (payload === "all") {
        return {
          ...state,
          products: state.productsSort,
        };
      }
      if (payload === "price_1") {
        return {
          ...state,
          products: state.productsSort.filter((e) => e.precio < 500),
        };
      }
      if (payload === "price_2") {
        return {
          ...state,
          products: state.productsSort.filter(
            (e) => e.precio > 500 && e.precio < 2000
          ),
        };
      }
      if (payload === "price_3") {
        return {
          ...state,
          products: state.productsSort.filter(
            (e) => e.precio > 2000 && e.precio < 5000
          ),
        };
      }
      if (payload === "price_4") {
        return {
          ...state,
          products: state.productsSort.filter(
            (e) => e.precio > 5000 && e.precio < 10000
          ),
        };
      }
      if (payload === "price_5") {
        return {
          ...state,
          products: state.productsSort.filter(
            (e) => e.precio > 10000 && e.precio < 20000
          ),
        };
      }
      if (payload === "price_6") {
        return {
          ...state,
          products: state.productsSort.filter(
            (e) => e.precio > 20000 && e.precio < 35000
          ),
        };
      }
      if (payload === "price_7") {
        return {
          ...state,
          products: state.productsSort.filter((e) => e.precio > 35000),
        };
      }
    case FILTER_BY_AZ:
      if (payload === "all") {
        return {
          ...state,
          products: state.productsSort,
        };
      }
      if (payload === "az") {
        return {
          ...state,
          products: [...state.productsSort].sort((prev, next) => {
            if (prev.nombre > next.nombre) return 1;
            if (prev.nombre < next.nombre) return -1;
            return 0;
          }),
        };
      }
      if (payload === "za") {
        return {
          ...state,
          products: [...state.productsSort].sort((prev, next) => {
            if (prev.nombre > next.nombre) return -1;
            if (prev.nombre > next.nombre) return 1;
            return 0;
          }),
        };
      }
    case ADD_CARRITO:
      return {
        ...state,
        productCart: [...state.productCart, payload],
      };
    default:
      return state;
  }
}

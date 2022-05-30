
/* import { onAuthStateChanged } from "firebase/auth";
import { auth, currentUser } from "../../fb"; */
//import { SET_FAV } from "../actions/actionsTypes";
import {
  ADMIN_HANDLER,
  SET_USER,
  RESET_USER,
  GET_USERS_LOGED,
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
  ADD_CARRITO,
  ADD_IN_CART,
  DELETE_ONE_PRODUCT,
  REMOVE_ALL_CARRITO, //---------> prueba!!!
} from "../actions/actionsTypes";

const initialState = {
  currentUser: null,
  isAdmin: null,
  isLoged: false,
  isLoading: true,
  usersLoged: [],
  brands: [],
  products: [],
  searchProduct: [],
  productsSort: [],
  detail: [],
  favProducts: [],
  productCart: JSON.parse(localStorage.getItem("product"))
    ? JSON.parse(localStorage.getItem("product"))
    : [],

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
      return { ...state, currentUser: {}, isLoged: false , favProducts: []};
    case GET_USERS_LOGED:
      return { ...state, usersLoged: payload};
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

      return { ...state, products: payload, searchProduct: payload };
    
      case SET_FAV:
      return { ...state, favProducts: payload };

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
      let repeated = state.productCart.find((e) => e.id === payload.id); //busca si existe ese id
      const cartProduct = [...state.productCart, payload]; //guarda todo
      // element = payload.id === e.id
      let prodQuantity = state.productCart.map((prod) =>
        prod.id === payload.id ? { ...prod, quantity: prod.quantity + 1 } : prod
      ); //modifica el quantity si el id ya existia

      repeated
        ? localStorage.setItem("product", JSON.stringify(prodQuantity))
        : localStorage.setItem("product", JSON.stringify(cartProduct));

      return repeated
        ? {
            ...state,
            productCart: prodQuantity, //return modificado
          }
        : {
            ...state,
            productCart: [...state.productCart, payload], //return default
          };
    case DELETE_ONE_PRODUCT:
      let filter = state.productCart.find((e) => e.id === payload);
      let quantityLess = state.productCart.map((prod) =>
        prod.id === payload ? { ...prod, quantity: prod.quantity - 1 } : prod
      );
      console.log("filter ---- > ", filter);
      console.log("quantityLess ---- > ", quantityLess);
      console.log("productCart", state.productCart);
      filter.quantity >= 2
        ? localStorage.setItem("product", JSON.stringify(quantityLess))
        : localStorage.setItem(
            "product",
            JSON.stringify(state.productCart.filter((e) => e.id !== payload))
          );
      return filter.quantity >= 2
        ? {
            ...state,
            productCart: quantityLess,
          }
        : {
            ...state,
            productCart: state.productCart.filter((e) => e.id !== payload),
          };

    case REMOVE_ALL_CARRITO:
      let array = [];
      localStorage.setItem("product", JSON.stringify(array));
      return {
        ...state,
        productCart: array,
      };
    default:
      return state;
  }
}

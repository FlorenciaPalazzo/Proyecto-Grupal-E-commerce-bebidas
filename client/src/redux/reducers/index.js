import { onAuthStateChanged } from "firebase/auth";
import { auth, currentUser } from "../../fb";
import {
    ADMIN_HANDLER,
    SET_USER,
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
    GET_PRODUCTS, //---------> prueba!!!
} from "../actions/actionsTypes";

const initialState = {
  currentUser : null,
  isAdmin : null,
  loged: false,
  isLoading: true,
  brands: [],
  products: [],
  productsSort: [],
  detail: [],
  getFav:[],
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
            return {...state, currentUser: payload }

        case SET_LOADING:
            return {...state, isLoading: payload }
        case ADMIN_HANDLER:
            {
                console.log(process.env.REACT_APP_ADMIN_EMAIL, payload);
                if (process.env.REACT_APP_ADMIN_EMAIL === payload) {
                    return {...state, isAdmin: true }
                } else return {...state, isAdmin: false }

            }
        case GET_PRODUCT_NAME:
            return {...state, products: payload };

        case GET_PRODUCT_ID:
            return {...state, detail: payload };

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
                return {...state, products: state.productsSort };
            } else {
                return {
                    ...state,
                    products: state.productsSort.filter((e) => e.marca.includes(payload)),
                };
            }
        case FILTER_BY_TYPE:
            if (payload === "all") {
                return {...state, products: state.products };
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

      case GET_FAV:
        return {
          ...state,
          getFav: state.getFav.find((p) => p.id === payload.id)
            ? [...state.getFav]
            : [...state.getFav, payload],
        };

    default:
      return state;
  }
}

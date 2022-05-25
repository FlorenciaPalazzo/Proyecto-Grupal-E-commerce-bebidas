import {
  ADMIN_HANDLER,
  FILTER_BY_AZ,
  FILTER_BY_GRADUATION,
  FILTER_BY_ML,
  FILTER_BY_PRICE,
  FILTER_BY_TYPE,
  GET_PRODUCT_NAME,
  GET_BRANDS,
} from "../actions/actionsTypes";

const initialState = {
  isAdmin: false,
  brands: [],
  products: [],
  productsSort: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADMIN_HANDLER: {
      console.log(process.env.REACT_APP_ADMIN_EMAIL, payload);
      if (process.env.REACT_APP_ADMIN_EMAIL === payload) {
        return { ...state, isAdmin: true };
      } else return { ...state, isAdmin: false };
    }
    case GET_PRODUCT_NAME: //no va andar hasta que este la ruta de getAll
      return { ...state, products: payload };
    case GET_BRANDS:
      let allBrands = state.products.filter((e) => e.marca);
      let filterBrands = allBrands.forEach((e) => {
        if (!filterBrands.includes(e)) {
          filterBrands.push(e);
        }
      });
      return {
        ...state,
        brands: filterBrands,
      };
    case FILTER_BY_BRAND:
      if (payload === "all") {
        return { ...state };
      } else {
        return {
          ...state,
          products: state.productsSort.filter((e) => e.marca.includes(payload)),
        };
      }

    case FILTER_BY_TYPE:
      if (payload === "all") {
        return { ...state, products: state.productsSort };
      }
      if (payload === "cerveza") {
        return {
          ...state,
          products: state.productsSort.filter((e) => e.tipo === "cerveza"),
        };
      }
      if (payload === "vino") {
        return {
          ...state,
          products: state.productsSort.filter((e) => e.tipo === "vino"),
        };
      }
      if (payload === "espumante") {
        return {
          ...state,
          products: state.productsSort.filter((e) => e.tipo === "espumante"),
        };
      }
      if (payload === "destilados") {
        return {
          ...state,
          products: state.productsSort.filter((e) => e.tipo === "destilados"),
        };
      }
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
          products: state.productsSort.filter((e) => e.ml > 400 && e.ml < 750),
        };
      }
      if (payload === "ml_3") {
        return {
          ...state,
          products: state.productsSort.filter((e) => e.ml > 750 && e.ml < 950),
        };
      }
      if (payload === "ml_3") {
        return {
          ...state,
          products: state.productsSort.filter((e) => e.ml > 950 && e.ml < 1500),
        };
      }
      if (payload === "ml_4") {
        return {
          ...state,
          products: state.productsSort.filter((e) => e.ml > 950 && e.ml < 1500),
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

    default:
      return state;
  }
}

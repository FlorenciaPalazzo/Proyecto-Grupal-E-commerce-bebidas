import {
  ADMIN_HANDLER,
  SET_USER,
  RESET_USER,
  GET_USERS_LOGED,
  GET_USER_DB,
  SET_LOADING,
  FILTER_BY_AZ,
  FILTER_BY_BRAND_CERVEZA,
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
  REMOVE_ALL_CARRITO,
  GET_MERCADO_PAGO,
  ORDER_MERCADO_PAGO,
  SET_FAV,
  GET_FAV,
  DEL_FAV,
  DELETE_MERCADO_PAGO,
  FEEDBACK_MERCADO_PAGO,
  ADD_DIRECCIONES,
  GET_DIRECCIONES,
  UPDATE_USER,
  GET_REVIEW,
  POST_REVIEW,
  PUT_REVIEW,
  DELETE_REVIEW,
  GET_REVPAGE,
  GET_ALL_REVIEWS,
  RESET_USER_DB,
  DELETE_DIRECCIONES,
  ADD_HIST,
  GET_HIST,
  CLEAR_STATE,
  PUT_PRODUCTO,
  GET_REVIEW_BY_USER,
  GET_USER_BY_ID,
  FIND_REVIEW_ID,
  FILTER_USER_REVIEW,
  GET_STATS,
  GET_TOP_PRODS,
  FILTER_BY_BRAND_VINO,
  FILTER_BY_BRAND_ESPUMANTE,
  FILTER_BY_BRAND_DESTILADO,
  ORDER_BY,
  //---------> prueba!!!
} from "../actions/actionsTypes";

const initialState = {
  currentUser: null,
  dbUser: null,
  isAdmin: null,
  isLoged: false,
  isLoading: true,
  usersLoged: [],
  brands: [],
  brandsCopy: [],
  products: [],
  searchProduct: [],
  productsSort: [],
  detail: [],
  userId: {},
  productCart: JSON.parse(localStorage.getItem("product"))
    ? JSON.parse(localStorage.getItem("product"))
    : [],
  mpSandBox: "",
  orderMP: [],
  feedBackMP: [],
  favProducts: [],
  direcciones: [],
  review: [],
  reviewPage: [],
  allReviews: [],
  allReviewsCopy: [],
  userReviews: [],
  findreview: [],
  searchProduct: [],
  favProducts: [],
  historial: [],
  favBoolean: [],
  stats: [],
  topProds: [],
  cervezas: [],
  cervezasCopy: [],
  vinos: [],
  vinosCopy: [],
  espumantes: [],
  espumantesCopy: [],
  destilados: [],
  destiladosCopy: [],
  orderAZ: [],
  sort: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PRODUCTS:
      let cervezasReturn = [];
      payload.forEach((e) => {
        if (e.tipo === "cerveza") {
          cervezasReturn.push(e);
        }
      });
      let vinosReturn = [];
      payload.forEach((e) => {
        if (e.tipo === "vino") {
          vinosReturn.push(e);
        }
      });
      let espumanteReturn = [];
      payload.forEach((e) => {
        if (e.tipo === "espumante") {
          espumanteReturn.push(e);
        }
      });
      let destiladoReturn = [];
      payload.forEach((e) => {
        if (e.tipo === "destilado") {
          destiladoReturn.push(e);
        }
      });

      return {
        ...state,
        products: payload,
        productsSort: payload,
        cervezas: cervezasReturn,
        cervezasCopy: cervezasReturn,
        vinos: vinosReturn,
        espumantes: espumanteReturn,
        espumantesCopy: espumanteReturn,
        destilados: destiladoReturn,
        destiladosCopy: destiladoReturn,
        orderAZ: payload,
      };

    case SET_USER:
      return { ...state, currentUser: payload, isLoged: true };
    case UPDATE_USER:
      return { ...state, dbUser: payload };
    case RESET_USER:
      return {
        ...state,
        currentUser: {},
        isLoged: false,
        favProducts: [],
        isAdmin: false,
      };

    case GET_USERS_LOGED:
      return { ...state, usersLoged: payload };
    case GET_USER_DB:
      return { ...state, dbUser: payload };
    case RESET_USER_DB:
      return { ...state, dbUser: {} };
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

    case GET_PRODUCT_ID:
      return { ...state, detail: payload };

    // case GET_BRANDS:
    //   let brandFilter = [];
    //   state.productsSort.filter((e) => {
    //     if (!brandFilter.includes(e.marca)) {
    //       brandFilter.push(e.marca);
    //     }
    //   });
    //   return {
    //     ...state,
    //     brands: brandFilter,
    //     brandsCopy: brandFilter,
    //   };
    case FILTER_BY_BRAND_CERVEZA:
      if (payload === "all") return { ...state, products: state.cervezas };

      let birrita = [];
      state.cervezas.filter((e) => {
        // console.log()
        if (e.marca === payload) {
          birrita.push(e);
        }
      });
      // console.log("BIRRITA",birrita, 'SOYPAYLOAD',payload)
      return {
        ...state,
        products: birrita,
        orderAZ: birrita,
      };

    case FILTER_BY_BRAND_VINO:
    case FILTER_BY_BRAND_CERVEZA:
      if (payload === "all") return { ...state, products: state.vinos };

      let vinito = [];
      state.vinos.filter((e) => {
        // console.log()
        if (e.marca === payload) {
          vinito.push(e);
        }
      });
      // console.log("BIRRITA",birrita, 'SOYPAYLOAD',payload)
      return {
        ...state,
        products: vinito,
        orderAZ: [...state.products],
      };
    case FILTER_BY_BRAND_ESPUMANTE:
      if (payload === "all") return { ...state, products: state.espumantes };

      let champusiño = [];
      state.espumantes.filter((e) => {
        // console.log()
        if (e.marca === payload) {
          champusiño.push(e);
        }
      });
      // console.log("champusiño",champusiño, 'SOYPAYLOAD',payload)
      return {
        ...state,
        products: champusiño,
        orderAZ: [...state.products],
      };
    case FILTER_BY_BRAND_DESTILADO:
      if (payload === "all") return { ...state, products: state.destilados };

      let puri = [];
      state.destilados.filter((e) => {
        // console.log()
        if (e.marca === payload) {
          puri.push(e);
        }
      });
      // console.log("puri",puri, 'SOYPAYLOAD',payload)
      return {
        ...state,
        products: puri,
        orderAZ: puri,
      };
    case ORDER_BY:
      console.log("SOY PAYLOAD", payload);
      console.log("STATE", state.products);
      let sort =
        payload === "az"
          ? state.products.sort(function (a, b) {
              // console.log(a, b)
              if (a.nombre > b.nombre) {
                return 1;
              }
              if (b.nombre > a.nombre) {
                return -1;
              }
              return 0;
            })
          : payload === "za"
          ? state.products.sort(function (a, b) {
              if (a.nombre > b.nombre) {
                return -1;
              }
              if (b.nombre > a.nombre) {
                return 1;
              }
              return 0;
            })
          : payload === "menorGraduacion"
          ? state.products.sort(function (a, b) {
              if (a.graduacion > b.graduacion) {
                return 1;
              }
              if (b.graduacion > a.graduacion) {
                return -1;
              }
              return 0;
            })
          : payload === "mayorGraduacion"
          ? state.products.sort(function (a, b) {
              if (a.graduacion > b.graduacion) {
                return -1;
              }
              if (b.graduacion > a.graduacion) {
                return 1;
              }
              return 0;
            })
          : payload === "ml_1"
          ? state.products.sort(function (a, b) {
              if (a.ml > b.ml) {
                return 1;
              }
              if (b.ml > a.ml) {
                return -1;
              }
              return 0;
            })
          : payload === "ml_2"
          ? state.products.sort(function (a, b) {
              if (a.ml > b.ml) {
                return -1;
              }
              if (b.ml > a.ml) {
                return 1;
              }
              return 0;
            })
          : payload === "price_1"
          ? state.products.sort(function (a, b) {
              if (a.precio > b.precio) {
                return 1;
              }
              if (b.precio > a.precio) {
                return -1;
              }
              return 0;
            })
          : state.products.sort(function (a, b) {
              if (a.precio > b.precio) {
                return -1;
              }
              if (b.precio > a.precio) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        products: [...sort],
      };
    // : payload === 'mayorGraduacion'?
    // state.orderAZ.sort(function(a, b) {
    //   if (a.graduacion > b.graduacion) {
    //     return 1;
    //   }
    //   if (b.graduacion > a.graduacion) {
    //     return -1;
    //   }
    //   return 0;
    // })
    // : (payload === 'menorGraduacion')?
    // state.orderAZ.sort(function(a, b) {
    //   if (a.graduacion > b.graduacion) {
    //     return 1;
    //   }
    //   if (b.graduacion > a.graduacion) {
    //     return -1;
    //   }
    //   return 0;
    // }) : null

    case ADD_CARRITO:
      let repeated = state.productCart.find((e) => e.id === payload.id); //busca si existe ese id
      const cartProduct = [...state.productCart, payload]; //guarda todo
      let prodQuantity = state.productCart.map((prod) =>
        prod.id === payload.id
          ? {
              ...prod,
              quantity: prod.quantity + 1,
              subtotal: prod.precio * (prod.quantity + 1),
              stock: prod.stock - 1,
            }
          : prod
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
        prod.id === payload
          ? {
              ...prod,
              quantity: prod.quantity - 1,
              subtotal: prod.subtotal - prod.precio,
              stock: prod.stock + 1,
            }
          : prod
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
    case ORDER_MERCADO_PAGO:
      return {
        ...state,
      };
    case GET_MERCADO_PAGO:
      return { ...state, mpSandBox: payload };
    case DELETE_MERCADO_PAGO:
      console.log("entro al reducer DELETE MP");
      let carritoVacio = [];
      localStorage.setItem("product", JSON.stringify(carritoVacio));
      return {
        ...state,
        productCart: carritoVacio,
      };
    case FEEDBACK_MERCADO_PAGO:
      return {
        ...state,
        feedBackMP: payload,
      };
    case POST_REVIEW:
      return {
        ...state,
      };
    case GET_ALL_REVIEWS:
      return {
        ...state,
        allReviews: payload,
        allReviewsCopy: payload,
      };
    case GET_REVIEW: //de los productos
      return {
        ...state,
        review: payload,
      };
    case GET_REVPAGE: // de la pag general
    // console.log(payload , "<======== PAYLOAD DE GET_REVPAGE")
      return {
        ...state,
        reviewPage: payload,
      };
    case PUT_REVIEW:
      return {
        ...state,
      };
    case FIND_REVIEW_ID:
      return {
        ...state,
        findreview: payload,
      };
    case DELETE_REVIEW:
      return {
        ...state,
      };
    case GET_REVIEW_BY_USER:
      return {
        ...state,
        userReviews: payload,
      };

    case SET_FAV:
      return { ...state };

    case GET_FAV:
      let productos = state.products;
      let ids = payload.map((e) => e.productoId);

      let arr = [];

      productos.forEach((e) => {
        //mapea productos pregunta si hay id prod
        console.log(e);
        if (ids.includes(e.id)) {
          console.log("e", e);
          arr.push(e);
        }
      });
      return {
        ...state,
        favProducts: arr,
      };

    case GET_USER_BY_ID:
      return {
        ...state,
        userId: payload,
      };

    case DEL_FAV:
      return { ...state };

    case ADD_DIRECCIONES:
      return {
        ...state,
      };
    case GET_DIRECCIONES:
      return {
        ...state,
        direcciones: payload.direcciones,
      };

    case DELETE_DIRECCIONES:
      return {
        ...state,
      };

    case GET_HIST:
      // console.log(payload, "Soy payloaff")
      let prodHist = state.products;

      // console.log(prodHist, "soy los productos")

      let idHist = payload.map((e) => e.productoId);
      // console.log(idHist, "soy los Los IDS")
      let histArr = [];

      prodHist.map((e) => {
        if (idHist.includes(e.id)) {
          histArr.push(e);
        }
      });
      // console.log(histArr, "Teoricamente esto debería andar bien")
      return {
        ...state,
        historial: histArr,
      };

    case ADD_HIST:
      return { ...state };

    case FILTER_USER_REVIEW:
      let reviews = state.allReviewsCopy;
      let filteredReviews =
        payload === "pagina"
          ? state.reviewPage
          : reviews.filter((r) => r.productoId);

      return {
        ...state,
        allReviews: payload === "all" ? state.allReviewsCopy : filteredReviews,
      };

    case CLEAR_STATE:
      return {
        ...state,
        detail: [],
        editProduct: null,
        review: [],
        userReviews: [],
      };
    case PUT_PRODUCTO:
      return {
        ...state,
      };
    case GET_STATS:
      return {
        ...state, stats: payload
      };
    case GET_TOP_PRODS:
      return {
        ...state, topProds: payload
      };
    default:
      return state;
  }
}

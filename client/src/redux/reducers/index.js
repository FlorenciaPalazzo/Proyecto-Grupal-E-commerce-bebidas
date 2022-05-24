import { ADMIN_HANDLER, GET_PRODUCT_NAME } from "../actions/actionsTypes";

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
    case GET_PRODUCT_NAME:
      return { ...state, products: payload };
    default:
      return state;
  }
}

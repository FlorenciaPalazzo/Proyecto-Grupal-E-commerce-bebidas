import { ADMIN_HANDLER, GET_PRODUCT_ID, GET_PRODUCT_NAME } from "../actions/actionsTypes";

const initialState = {
    isAdmin: false,
    brands: [],
    products: [],
    productsSort: [],
    detail: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADMIN_HANDLER:
            {
                console.log(process.env.REACT_APP_ADMIN_EMAIL, payload);
                if (process.env.REACT_APP_ADMIN_EMAIL === payload) {
                    return {...state, isAdmin: true };
                } else return {...state, isAdmin: false };
            }
        case GET_PRODUCT_NAME:
            return {...state, products: payload };

        case GET_PRODUCT_ID:
            return {...state, detail: payload }

        default:
            return state;

    }

}
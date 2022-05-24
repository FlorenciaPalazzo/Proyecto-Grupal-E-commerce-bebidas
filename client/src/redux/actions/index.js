import { ADMIN_HANDLER } from "./actionsTypes"

export function isAdmin(email){
    return async (dispatch) => {
        return dispatch({ type: ADMIN_HANDLER, payload: email })
    }
}
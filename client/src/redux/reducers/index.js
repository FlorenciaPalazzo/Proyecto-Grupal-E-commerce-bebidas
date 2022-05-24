import { ADMIN_HANDLER } from "../actions/actionsTypes"

const initialState = {
  isAdmin : false
}

export default function rootReducer(state = initialState, {type, payload}){
     switch (type) {
       case ADMIN_HANDLER: {
         console.log(process.env.REACT_APP_ADMIN_EMAIL, payload);
        if(process.env.REACT_APP_ADMIN_EMAIL === payload ){
          return {...state, isAdmin: true}
        } 
        else return {...state, isAdmin: false}
        
        } 
       default: return state
          }
}
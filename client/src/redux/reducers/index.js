import { onAuthStateChanged } from "firebase/auth";
import { auth, currentUser } from "../../fb";
import { ADMIN_HANDLER, SET_USER, SET_MESSAGE, SET_LOADING} from "../actions/actionsTypes"

// function handleUser(){
//   console.log("se ejecuta");
  
//   let user =onAuthStateChanged(auth, (currUser) => {
//     if(currUser){
//       return  {
//         currentUser : currUser,
//         isAdmin : process.env.REACT_APP_ADMIN_EMAIL === currUser.email
//       }}
//     }
//     )
//     console.log("user",user);
//     return user
// }

const initialState = {
  currentUser : null,
  isAdmin : null,
  loged: false,
  isLoading: true
}

export default function rootReducer(state = initialState, {type, payload}){

     switch (type) {
       case SET_USER: return {...state, currentUser : payload}
       case SET_MESSAGE: return {...state, message : true}
       case SET_LOADING: return {...state, isLoading : payload}
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
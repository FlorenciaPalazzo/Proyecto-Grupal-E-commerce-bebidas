import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose

const store = createStore(
  rootReducer,
    composeEnhacers(applyMiddleware(thunk))
  );
  
  export default store;
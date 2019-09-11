import { createStore, applyMiddleware } from "redux";
import rootReducer from "../Reducers";
import loggerMiddleware from "redux-logger";

export default store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware)
);

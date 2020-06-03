import { createStore, applyMiddleware } from "redux";
import rootReducer from "../Reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";

const middleware = applyMiddleware(thunk, logger);

export default store = createStore(rootReducer, middleware);

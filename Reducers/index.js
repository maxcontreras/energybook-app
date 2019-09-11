import { createStore, applyMiddleware, combineReducers } from "redux";
import initialValues from "./InitialValues.js";
import dailyReducer from "./DailyReducer.js";
import weatherReducer from "./WeatherReducer.js";
import costReducer from "./CostsReducer.js";

export default store = combineReducers({
  initialValues,
  dailyReducer,
  weatherReducer,
  costReducer
});

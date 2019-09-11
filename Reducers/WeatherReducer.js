//modifies the state and returns a new state
import { GET_WEATHER } from "../Actions/ActionTypes.js";

const weatherReducer = (state = [], action) => {
  switch (action.type) {
    case GET_WEATHER:
      return [
        ...state,
        {
          datos: action.json[1].results.main,
          lugar: action.json[1].results.name,
          clima: action.json[1].results.weather[0].description,
          icon: action.json[1].results.weather[0].icon
        }
      ];

    default:
      return state;
  }
};

export default weatherReducer;

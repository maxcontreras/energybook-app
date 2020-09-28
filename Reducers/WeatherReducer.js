//modifies the state and returns a new state
import {GET_WEATHER, SET_FT_COORDS} from '../Actions/ActionTypes.js';

const initialState = {
  datos: '',
  temp: '',
  lugar: '',
  clima: '',
  icon: '',
  ftcoords: [],
};

const weatherReducer = (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case GET_WEATHER:
      newState.datos = action.json[1].results.main;
      newState.lugar = action.json[1].results.name;
      newState.clima = action.json[1].results.weather[0].description;
      newState.icon = action.json[1].results.weather[0].icon;
      newState.temp = Math.trunc(action.json[1].results.main.temp);
      break;
    case SET_FT_COORDS:
      newState.ftcoords = [action.lat, action.long];
  }
  return newState;
};

export default weatherReducer;

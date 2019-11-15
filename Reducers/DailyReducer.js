//modifies the state and returns a new state
import { GET_DAILY_READINGS } from "../Actions/ActionTypes.js";

const initialState = {
  dailyReadings: [],
  monthlyReadings: [],
  fp: "",
  maxVal: "",
  minVal: "",
  dp: "",
  meterId: "",
  devices: "",
  numberOfServices: ""
};

const dailyReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case GET_DAILY_READINGS:
      newState.dailyReadings = action.json[1][0].services[0].dailyReadings;
      newState.monthlyReadings = action.json[1][0].services[0].monthlyReadings;
      newState.fp = action.json[1][0].services[0].fp;
      newState.maxVal = action.json[1][0].max_value;
      newState.minVal = action.json[1][0].min_value;
      newState.dp = action.json[1][0].services[0].dp;
      newState.meterId = action.json[1][0].meter_id;
      newState.devices = action.json[1][0].devices;
      newState.numberOfServices = action.json[1][0].services.length;
      break;
  }
  return newState;
};

export default dailyReducer;

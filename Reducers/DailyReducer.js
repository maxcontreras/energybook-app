//modifies the state and returns a new state
import {
  GET_USER_INFO,
  GET_COMPANY_DATA,
  GET_COMPANY_ID,
  GET_DAILY_READINGS,
  GET_PRICES,
  GET_WEATHER,
  GET_FINAL_PRICES,
  GET_ARRAY_DATA,
  GET_DAILY_CONSUMPTION_PRICES,
  GET_MONTLHY_CONSUMPTION_PRICES,
  IS_ASYNC
} from "../Actions/ActionTypes.js";

const dailyReducer = (state = [], action) => {
  switch (action.type) {
    case GET_DAILY_READINGS:
      return [
        ...state,
        {
          dailyR: action.json[1][0].services[0].dailyReadings,
          dailyConsumption:
            action.json[1][0].services[0].dailyReadings.consumption,
          dailyDistribution:
            action.json[1][0].services[0].dailyReadings.distribution,
          dailyCpacity: action.json[1][0].services[0].dailyReadings.capacity,
          monthlyR: action.json[1][0].services[0].monthlyReadings,
          monthlyConsumption:
            action.json[1][0].services[0].monthlyReadings.consumption,
          monthlyDistribution:
            action.json[1][0].services[0].monthlyReadings.distribution,
          monthlyCapacity:
            action.json[1][0].services[0].monthlyReadings.capacity,
          fp: action.json[1][0].services[0].fp,
          maxVal: action.json[1][0].max_value,
          minVal: action.json[1][0].min_value,
          dp: action.json[1][0].services[0].dp,
          meterId: action.json[1][0].meter_id,
          devices: action.json[1][0].devices,
          numberOfServices: action.json[1][0].services.length
        }
      ];

    default:
      return state;
  }
};

export default dailyReducer;

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
  GET_MONTLHY_CONSUMPTION_PRICES
} from "../Actions/ActionTypes.js";

const initialValues = (state = [], action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return [
        ...state,
        {
          accesToken: action.json[1].id,
          userId: action.json[1].userId
        }
      ];

    case GET_COMPANY_DATA:
      return [
        ...state,
        {
          company: action.json[1][0].company_name,
          city: action.json[1][0].city,
          tipoTarifa: action.json[1][0].tariff_type
        }
      ];

    case GET_COMPANY_ID:
      if (!action.json[1][0].companyId) {
        return [...state, { companyId: "5c2e7d9d51e9f51b9e5de809" }];
      } else {
        return [
          ...state,
          {
            companyId: action.json[1][0].company_id
          }
        ];
      }

    default:
      return state;
  }
};

export default initialValues;

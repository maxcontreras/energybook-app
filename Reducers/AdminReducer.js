//modifies the state and returns a new state
import { SET_ADMIN_IDS } from "../Actions/ActionTypes.js";

const initialState = {
  company_id: "",
  meter_id: "",
  city: "",
  company_name: "",
  tipoTarif: ""
};

const adminReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_ADMIN_IDS:
      newState.company_id = action.json[0].company_id;
      newState.meter_id = action.json[0].meter_id
        ? action.json[0].meter_id
        : "";
      newState.city = action.json[0].city ? action.json[0].city : "";
      newState.company_name = action.json[0].company_name;
      newState.tipoTarif = action.json[0].tipoTarif;
      break;
  }
  return newState;
};

export default adminReducer;

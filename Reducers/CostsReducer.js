//modifies the state and returns a new state
import { GET_PRICES, GET_FINAL_PRICES } from "../Actions/ActionTypes.js";

const initialState = {
  GDMTH: [],
  GDMTO: []
};

const costReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_PRICES:
      newState.GDMTH = action.json.GDMTH;
      newState.GDMTO = action.json.GDMTO ? action.json.GDMTO : [];
      break;
  }
  return newState;
};

export default costReducer;

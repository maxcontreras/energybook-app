//modifies the state and returns a new state
import {GET_PRICES} from '../Actions/ActionTypes.js';

const initialState = {
  prices: [],
};

const costReducer = (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case GET_PRICES:
      newState.prices = action.prices;
      break;
  }
  return newState;
};

export default costReducer;

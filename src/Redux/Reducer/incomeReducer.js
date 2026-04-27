import { SET_INCOME } from "../Action/incomeAction";

const initialState = {
  data: [],
};

export const incomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INCOME:
      return { ...state, data: action.payload };

    default:
      return state;
  }
};
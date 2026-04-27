import { SET_EXPENSES } from "../Action/expenseAction";

const initialState = {
  data: [],
};

export const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPENSES:
      return { ...state, data: action.payload };

    default:
      return state;
  }
};
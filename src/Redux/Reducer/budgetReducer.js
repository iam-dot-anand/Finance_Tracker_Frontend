import { SET_BUDGET_STATUS } from "../Action/budgetAction";

const initialState = {
  data: [],
  loading: false,
};

export const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUDGET_STATUS:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

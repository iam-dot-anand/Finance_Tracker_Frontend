import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { signupReducer } from "./signupReducer";
import { expenseReducer } from "./expenseReducer";
import { incomeReducer } from "./incomeReducer";
import { budgetReducer } from "./budgetReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  expense: expenseReducer,
  income: incomeReducer,
  budget: budgetReducer,
});

export default rootReducer;

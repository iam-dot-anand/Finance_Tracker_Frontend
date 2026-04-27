import { all } from "redux-saga/effects";
import loginSaga from "./LoginSaga";
import signupSaga from "./SignupSaga";
import expenseSaga from "./ExpenseSaga";
import incomeSaga from "./IncomeSaga";
import budgetSaga from "./BudgetSaga";

export default function* rootSaga() {
  yield all([
    loginSaga(),
    signupSaga(),
    expenseSaga(),
    incomeSaga(),
    budgetSaga(),
  ]);
}

import { put, call, takeLatest } from "redux-saga/effects";
import {
  FETCH_EXPENSES,
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
  SET_EXPENSES,
} from "../Action/expenseAction";

const API = "https://finance-trackers-he5w.onrender.com/expense";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `${localStorage.getItem("Token")}`,
});
// console.log("TOKEN:", localStorage.getItem("Token"));
// console.log(getHeaders());

function* fetchExpensesSaga() {
  const res = yield call(fetch, API, {
    headers: getHeaders(),
  });

  const data = yield res.json();
  const expensesArray = Array.isArray(data) ? data : data.expenses || [];

  yield put({ type: SET_EXPENSES, payload: expensesArray });
}

function* addExpenseSaga(action) {
  try {
    const res = yield call(fetch, `${API}/add`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(action.payload),
    });

    const data = yield res.json();
    console.log("ADD RESPONSE:", data);

    if (res.status === 201) {
      yield put({ type: FETCH_EXPENSES });
    } else {
      console.error("ADD FAILED:", data);
    }
  } catch (error) {
    console.error("ADD ERROR:", error);
  }
}

function* updateExpenseSaga(action) {
  const { id, data } = action.payload;

  yield call(fetch, `${API}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  yield put({ type: FETCH_EXPENSES });
}

function* deleteExpenseSaga(action) {
  yield call(fetch, `${API}/${action.payload}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  yield put({ type: FETCH_EXPENSES });
}


export default function* expenseSaga() {
  yield takeLatest(FETCH_EXPENSES, fetchExpensesSaga);
  yield takeLatest(ADD_EXPENSE, addExpenseSaga);
  yield takeLatest(UPDATE_EXPENSE, updateExpenseSaga);
  yield takeLatest(DELETE_EXPENSE, deleteExpenseSaga);
}

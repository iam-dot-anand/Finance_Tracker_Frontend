import { call, put, takeLatest } from "redux-saga/effects";

const API = "https://finance-trackers-he5w.onrender.com/budget";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("Token"),
});

function* setBudgetSaga(action) {
  yield call(fetch, `${API}/set`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(action.payload),
  });
}

function* fetchBudgetSaga(action) {
  const { month, year } = action.payload;

  const res = yield call(fetch, `${API}/status?month=${month}&year=${year}`, {
    headers: getHeaders(),
  });

  const data = yield res.json();

  yield put({
    type: "SET_BUDGET_STATUS",
    payload: data,
  });
}

export default function* budgetSaga() {
  yield takeLatest("SET_BUDGET", setBudgetSaga);
  yield takeLatest("FETCH_BUDGET_STATUS", fetchBudgetSaga);
}

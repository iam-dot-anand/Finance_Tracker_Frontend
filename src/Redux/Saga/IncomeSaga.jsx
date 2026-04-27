import { put, call, takeLatest } from "redux-saga/effects";
import {
  FETCH_INCOME,
  ADD_INCOME,
  UPDATE_INCOME,
  DELETE_INCOME,
  SET_INCOME,
} from "../Action/incomeAction";

const API = "http://localhost:8000/income";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("Token"), 
});

function* fetchIncomeSaga() {
  const res = yield call(fetch, API, {
    headers: getHeaders(),
  });

  const data = yield res.json();

  yield put({ type: SET_INCOME, payload: data });
}


function* addIncomeSaga(action) {
  yield call(fetch, `${API}/add`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(action.payload),
  });

  yield put({ type: FETCH_INCOME });
}


function* updateIncomeSaga(action) {
  const { id, data } = action.payload;

  yield call(fetch, `${API}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  yield put({ type: FETCH_INCOME });
}


function* deleteIncomeSaga(action) {
  yield call(fetch, `${API}/${action.payload}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  yield put({ type: FETCH_INCOME });
}


export default function* incomeSaga() {
  yield takeLatest(FETCH_INCOME, fetchIncomeSaga);
  yield takeLatest(ADD_INCOME, addIncomeSaga);
  yield takeLatest(UPDATE_INCOME, updateIncomeSaga);
  yield takeLatest(DELETE_INCOME, deleteIncomeSaga);
}
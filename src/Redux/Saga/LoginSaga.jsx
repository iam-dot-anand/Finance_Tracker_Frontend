import { put, call, takeLatest } from "redux-saga/effects";

function* loginWorkerSaga(action) {
  try {
    const response = yield call(fetch, "https://finance-trackers-he5w.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    });

    const data = yield response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("Token", data.token);

    yield put({
      type: "LOGIN_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error.message);

    yield put({
      type: "LOGIN_FAILURE",
      payload: { message: error?.message || "Something went wrong" },
    });
  }
}

export default function* loginSaga() {
  yield takeLatest("LOGIN_REQUEST", loginWorkerSaga);
}

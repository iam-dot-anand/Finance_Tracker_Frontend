import { put, call, takeLatest } from "redux-saga/effects";

function* signupWorkerSaga(action) {
  try {
    const response = yield call(fetch, "https://finance-trackers-he5w.onrender.com/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    });

    const data = yield response.json();


    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    console.log("SIGNUP SUCCESS:", data);

    yield put({
      type: "SIGNUP_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.log("SIGNUP ERROR:", error.message);

    yield put({
      type: "SIGNUP_FAILURE",
      payload: { message: error.message },
    });
  }
}

export default function* signupSaga() {
  yield takeLatest("SIGNUP_REQUEST", signupWorkerSaga);
}

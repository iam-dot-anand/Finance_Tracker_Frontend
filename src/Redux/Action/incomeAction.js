export const FETCH_INCOME = "FETCH_INCOME";
export const SET_INCOME = "SET_INCOME";
export const ADD_INCOME = "ADD_INCOME";
export const UPDATE_INCOME = "UPDATE_INCOME";
export const DELETE_INCOME = "DELETE_INCOME";

export const fetchIncome = () => ({ type: FETCH_INCOME });

export const addIncome = (data) => ({
  type: ADD_INCOME,
  payload: data,
});

export const updateIncome = (id, data) => ({
  type: UPDATE_INCOME,
  payload: { id, data },
});

export const deleteIncome = (id) => ({
  type: DELETE_INCOME,
  payload: id,
});
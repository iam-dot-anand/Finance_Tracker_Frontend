export const FETCH_EXPENSES = "FETCH_EXPENSES";
export const SET_EXPENSES = "SET_EXPENSES";
export const ADD_EXPENSE = "ADD_EXPENSE";
export const UPDATE_EXPENSE = "UPDATE_EXPENSE";
export const DELETE_EXPENSE = "DELETE_EXPENSE";

export const fetchExpenses = () => ({ 
    type: FETCH_EXPENSES 
});
export const addExpense = (data) => ({ 
    type: ADD_EXPENSE, 
    payload: data 
});
export const updateExpense = (id, data) => ({
  type: UPDATE_EXPENSE,
  payload: { id, data },
});
export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});
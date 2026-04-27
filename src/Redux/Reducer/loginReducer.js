const initialState = {
  msg: "",
  success: false,
  user: null,
  loading: false,
};

export const loginReducer = (state = initialState, action) => {
  console.log(action, state);
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        msg: "Login successful",
        success: true,
        user: action.payload,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        msg: action.payload?.message || "Login failed",
        success: false,
      };
    case "LOGIN_RESET":
      return {
        ...state,
        success: false,
      };

    default:
      return state;
  }
};

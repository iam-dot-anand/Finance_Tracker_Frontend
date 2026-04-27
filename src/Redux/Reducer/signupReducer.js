const initialState = {
  msg: "",
  success: false,
  loading: false,
};

export const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_REQUEST":
      return { ...state, loading: true };

    case "SIGNUP_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        msg: "Signup successful",
      };

    case "SIGNUP_FAILURE":
      return {
        ...state,
        loading: false,
        success: false,
        msg: action.payload.message || "Signup failed",
      };

    default:
      return state;
  }
};

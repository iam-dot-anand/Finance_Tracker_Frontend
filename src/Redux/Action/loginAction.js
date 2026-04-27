export const LOGIN_REQUEST = (data) => {
    console.log(data)
  return {
    type: "LOGIN_REQUEST",
    payload: data,
  };
};

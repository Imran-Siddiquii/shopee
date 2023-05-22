import { createSlice } from "@reduxjs/toolkit";

const Auth = createSlice({
  name: "Auth",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    token:null,
  },
  reducers: {
    Loading: (state, { payload }) => {
      state.isLoading = payload;
    },
    Error: (state, { payload }) => {
      state.isError = payload;
    },
    AuthResponse: (state, { payload }) => {
      state.data = payload.foundUser;
      state.token=payload.encodedToken
    },
    Logout:(state)=>{
      state.data=[]
      state.token=null
    }
  },
});
export const { Error, Loading, AuthResponse,Logout } = Auth.actions;
export default Auth.reducer;

export const LoginAuth = (credentail) => {
  return async function getdate(dispatch) {
    dispatch(Loading(true));
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentail),
      });

      const data = await res.json();
      console.log(data);
      dispatch(Loading(false));
      localStorage.setItem("token", data.encodedToken);
      dispatch(AuthResponse(data));
    } catch (error) {
      dispatch(Loading(false));
      dispatch(Error());
    }
  };
};

import { createSlice } from "@reduxjs/toolkit";

const Auth = createSlice({
  name: "Auth",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    token: null,
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
      state.token = payload.encodedToken;
    },
    Logout: (state) => {
      state.data = [];
      state.token = null;
    },
  },
});
export const { Error, Loading, AuthResponse, Logout } = Auth.actions;
export default Auth.reducer;

export const LoginAuth = (credentail) => {
  return async function getdate(dispatch) {
    dispatch(Loading(true));
    dispatch(Error(false));
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentail),
      });
      dispatch(Loading(false));

      if (!res.ok) {
        dispatch(Error(true));
      } else {
        dispatch(Error(false));
        const data = await res.json();
        localStorage.setItem("token", data.encodedToken);
        dispatch(AuthResponse(data));
      }
    } catch (error) {
      dispatch(Loading(false));
      dispatch(Error(true));
    }
  };
};

export const signInAuth = (credentail) => {
  return async function getdate(dispatch) {
    dispatch(Loading(true));
    dispatch(Error(false));
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(credentail),
      });
      dispatch(Loading(false));
      if (!res.ok) {
        dispatch(Error(true));
      } else {
        dispatch(Error(false));
        const data = await res.json();
        localStorage.setItem("token", data.encodedToken);
        dispatch(AuthResponse(data));
      }
    } catch (error) {
      dispatch(Loading(false));
      dispatch(Error(true));
    }
  };
};

import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "Address",
  initialState: {
    isloading: false,
    place: [],
  },
  reducers: {
    loading: (state) => {
      state.isloading = true;
    },
    userAddress: (state, action) => {
      state.isloading = false;
      state.place = [...state.place, action.payload];
    },
    updateAddress: (state, action) => {},
    deleteAddress: (state, { payload }) => {
      state.place = state.place.filter((ele) => ele.addressId !== payload);
    },
  },
});

export const { loading, userAddress, updateAddress, deleteAddress } =
  addressSlice.actions;
export default addressSlice.reducer;

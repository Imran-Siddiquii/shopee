import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const WishlistSlice = createSlice({
  name: "wishlistItem",
  initialState: {
    loading: false,
    data: [],
    error: false,
  },
  reducers: {
    load: (state, { payload }) => {
      state.loading = payload;
    },
    wishlist: (state, { payload }) => {
        state.data = payload;
      state.loading = false;
    },
    error: (state,{payload}) => {
      state.error = payload;
      state.loading=false
    },
  },
});

export const { load, error, wishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;

export const fetchWishlist = () => {
  return async function getList(dispatch) {
    dispatch(load(true));
    
    try {
      const options = {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      };
      const {data} = await axios.get("/api/user/wishlist",options);
      console.log(data,"wishlist")
      dispatch(wishlist(data.wishlist))
      dispatch(load(false))
    } catch (err) {
      dispatch(load(false));
      dispatch(error(true));
    }
  };
};


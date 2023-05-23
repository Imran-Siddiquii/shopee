import { createSlice } from "@reduxjs/toolkit";

const AddWishlistItemSlice = createSlice({
  name: "addWishlistItem",
  initialState: {
    loading: false,
    data: [],
    error: false,
    isInWishlist: false,
  },
  reducers: {
    load: (state, { payload }) => {
      state.loading = payload;
    },
    wishlistItem: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    },
    error: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    isWishlisted: (state, { payload }) => {
      if (payload === true) {
        state.isInWishlist = payload;
      } else {
        const findArray = state.data.find((ele) => ele.id === payload);
        state.isInWishlist = findArray ? true : false;
      }
    },
  },
});

export const { load, error, wishlistItem, isWishlisted } =
  AddWishlistItemSlice.actions;

export default AddWishlistItemSlice.reducer;

export const AddWishlist = (product) => {
  return async function addItem(dispatch) {
    dispatch(load(true));
    const options = {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },

      body: JSON.stringify({ product }),
    };
    try {
      const res = await fetch("/api/user/wishlist", options);
      const { wishlist } = await res.json();
      dispatch(load(false));
      dispatch(wishlistItem(wishlist));
      dispatch(isWishlisted(true));
    } catch (err) {
      dispatch(load(false));
      console.log(err);
      dispatch(error(true));
    }
  };
};

export const RemoveWishlistItem = (id) => {
  return async function deleteItem(dispatch) {
    const options = {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    try {
      const res = await fetch(`/api/user/wishlist/${id}`, options);
      const {wishlist} = await res.json();
      console.log("deletewishlist", " res", res,wishlist);
      dispatch(wishlistItem(wishlist))
    } catch (error) {
      console.log(error);
    }
  };
};

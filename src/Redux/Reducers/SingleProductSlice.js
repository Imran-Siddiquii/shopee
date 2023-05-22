import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const SingleProductSlice = createSlice({
  name: "Single Product",
  initialState: {
    singleProductsLoading: false,
    singleProducts: [],
    isError: false,
  },
  reducers: {
    singleProductLoading: (state, { payload }) => {
      state.singleProductsLoading = payload;
    },
    singleProductError: (state, action) => {
      state.isError = action.payload;
    },
    singleProduct: (state, { payload }) => {
      state.singleProducts = payload;
    },
  },
});

export const { singleProductLoading, singleProductError, singleProduct } =
  SingleProductSlice.actions;
export default SingleProductSlice.reducer;

// fetching api for  single id
export const fetchSingleProducts = (id) => {
  return async function getProducts(dispatch) {
    dispatch(singleProductLoading(true));
    try {
      const response = await axios.get(`/api/products/${id}`);
      dispatch(singleProduct(response.data.product));
      dispatch(singleProductLoading(false));
    } catch (err) {
      dispatch(singleProductLoading(false));
      dispatch(singleProductError(true));
    }
  };
};

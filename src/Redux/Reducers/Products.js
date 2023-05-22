import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const storeProducts = createSlice({
  name: "All Products",
  initialState: {
    isLoading: false,
    products: [],
    isError: false,
    featuredProduct: [],
  },
  reducers: {
    loading: (state, { payload }) => {
      state.isLoading = payload;
    },
    error: (state, action) => {
      state.isError = action.payload;
    },
    product: (state, { payload }) => {
      state.products = payload.products;
      const featured = state.products.filter(
        (featureElement) => featureElement.featured
      );
      state.featuredProduct = featured;
    },
  },
});

export const { loading, error, product, featured } = storeProducts.actions;
export default storeProducts.reducer;

// fetching all products

export const fetchProducts = () => {
  return async function getProducts(dispatch) {
    dispatch(loading(true));
    try {
      // const response = await axios.get(process.env.REACT_APP_PRODUCT_API);
      const response = await axios.get(
        "/api/products"
      );

      const data = await response.data;
      console.log("check", data);
      dispatch(product(data));
      dispatch(loading(false));
    } catch (err) {
      dispatch(loading(false));
      dispatch(error(true));
    }
  };
};


export const fetchCategory = () => {
  return async function getProducts(dispatch) { 
    try {
      const response = await axios.get(
        "/api/categories"
      );

      const data = await response.data;
      console.log("check", data);
    } catch (err) {
    }
  };
};

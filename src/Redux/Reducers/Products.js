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
    addToCartProducts: (state, { payload }) => {
      const products = state?.products?.map((item) => {
        if (item.id === payload) {
          return { ...item, isCart: true };
        }
        return item;
      });
      state.products = products;
    },
    addToWishlistProducts: (state, { payload }) => {
      const products = state?.products?.map((item) => {
        if (item.id === payload) {
          return { ...item, isWishlist: true };
        }
        return item;
      });
      state.products = products;
    },
    removeToCartProducts: (state, { payload }) => {
      const products = state?.products?.map((item) => {
        if (item.id === payload) {
          return { ...item, isCart: false };
        }
        return item;
      });
      state.products = products;
    },
    removeToWishlistProducts: (state, { payload }) => {
      const products = state?.products?.map((item) => {
        if (item.id === payload) {
          return { ...item, isWishlist: false };
        }
        return item;
      });
      state.products = products;
    },
  },
});

export const {
  loading,
  error,
  product,
  featured,
  addToCartProducts,
  addToWishlistProducts,
  removeToCartProducts,
  removeToWishlistProducts,
} = storeProducts.actions;
export default storeProducts.reducer;

// fetching all products

export const fetchProducts = () => {
  return async function getProducts(dispatch) {
    dispatch(loading(true));
    try {
      const response = await axios.get("/api/products");

      const data = await response.data;
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
      const response = await axios.get("/api/categories");

      const data = await response.data;
      console.log("check", data);
    } catch (err) {}
  };
};

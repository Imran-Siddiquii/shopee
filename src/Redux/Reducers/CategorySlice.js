import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "Category List",
  initialState: {
    isLoading: false,
    categoryData: [],
    isError: false,
  },
  reducers: {
    loading: (state, { payload }) => {
      state.isLoading = payload;
    },
    categoryItem: (state, { payload }) => {
      state.categoryData = payload;
      state.isLoading = false;
    },
    error: (state, { payload }) => {
      state.isError = payload;
      state.isLoading = false;
    },
  },
});
export const { loading, categoryItem, error } = categorySlice.actions;
export default categorySlice.reducer;

export const fetchCategoryList = () => {
  return async function getData(dispatch) {
    dispatch(loading(true));
    try {
      const res = await fetch("api/categories");
      const data = await res.json();
      dispatch(categoryItem(data.categories));
      dispatch(loading(false));
    } catch (err) {
      dispatch(loading(false));
      dispatch(error(true));
    }
  };
};

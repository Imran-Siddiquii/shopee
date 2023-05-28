import { createSlice } from "@reduxjs/toolkit";

const FilterProdutsSlice = createSlice({
  name: "filterProducts",
  initialState: {
    filter_products: [],
    all_products: [],
    grid_view: true,
    searchFilter: {
      text: "",
      category: "All",
      color: "All",
      company: "All",
      maxPrice: 0,
      minPrice: 0,
      price: 0,
    },
  },
  reducers: {
    filterProducts: (state, { payload }) => {
      // price and max price
      let findPrice = payload.map((ele) => ele.price);
      let maxPrice = Math.max(...findPrice);
      let filterArray = state.searchFilter;
      return (state = {
        ...state,
        filter_products: payload,
        all_products: payload,
        searchFilter: { ...filterArray, maxPrice: maxPrice, price: maxPrice },
      });
    },
    Grid_View: (state, payload) => {
      state.grid_view = payload;
    },
    List_View: (state, { payload }) => {
      state.grid_view = false;
    },
    sorting: (state, action) => {
      //sorting array
      //sorting funciton
      const sortingArray = (a, b) =>
        action.payload.value === "lowest"
          ? a.price - b.price
          : action.payload.value === "highest"
          ? b.price - a.price
          : action.payload.value === "a-z"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);

      if (action.payload.value === "default") {
        state.filter_products = state.all_products;
      } else {
        state.filter_products = action.payload.filter_products
          .slice()
          .sort(sortingArray);
      }
    },

    //for filter data search
    search_filter: (state, action) => {
      let filterProductsArray = [...state.all_products];
      let findPrice = filterProductsArray.map((ele) => ele.price);
      let maxPrice = Math.max(...findPrice);
      state.searchFilter = { ...state.searchFilter, maxPrice, price: maxPrice };
      // console.log(maxPrice, "maxprice");
      const { name, value } = action.payload;
      state.searchFilter[name] = value;
      const { text, category, color, company, price } = state.searchFilter;

      if (text) {
        filterProductsArray = filterProductsArray.filter((curElem) =>
          curElem?.name.toLowerCase().includes(text)
        );
      }
      if (category !== "All") {
        filterProductsArray = filterProductsArray.filter((curElem) =>
          curElem?.category.toLowerCase().includes(category)
        );
      }
      if (color !== "All") {
        filterProductsArray = filterProductsArray.filter((curElem) =>
          curElem?.colors.includes(color)
        );
      }
      if (company !== "All") {
        filterProductsArray = filterProductsArray.filter((curElem) =>
          curElem?.company.toLowerCase().includes(company)
        );
      }
      if (price === 0) {
        filterProductsArray = filterProductsArray.filter(
          (curElem) => curElem?.price === price
        );
      } else {
        filterProductsArray = filterProductsArray.filter(
          (curElem) => curElem?.price <= price
        );
      }
      state.filter_products = filterProductsArray;
    },
    clearFilter: (state, action) => {
      let filterProductsArray = [...state.all_products];
      state.searchFilter = {
        text: "",
        color: "All",
        category: "All",
        company: "All",
        minPrice: 0,
        price: state.searchFilter.maxPrice,
        maxPrice: state.searchFilter.maxPrice,
      };
      state.filter_products = filterProductsArray;
    },
  },
});
export const {
  filterProducts,
  Grid_View,
  List_View,
  sorting,
  search_filter,
  clearFilter,
} = FilterProdutsSlice.actions;
export default FilterProdutsSlice.reducer;

export const fetchCategoryById = ({ category, id }) => {
  return async function getData(dispatch) {
    try {
      const res = await fetch(`/api/categories/${category}`);
      const data = await res.json();
      dispatch(search_filter({ name: "category", value: category }));
    } catch (error) {
      console.log(error, "check data ");
    }
  };
};

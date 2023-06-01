import { configureStore } from "@reduxjs/toolkit";
import AddToCartSlice from "../Reducers/AddToCartSlice";
import FilterProductsSlice from "../Reducers/FilterProductsSlice";
import storeProducts from "../Reducers/Products";
import SingleProductSlice from "../Reducers/SingleProductSlice";
import Auth from "../auth";
import WishlistSlice from "../Reducers/Wishlist/WishlistSlice";
import AddWishlistItemSlice from "../Reducers/Wishlist/AddWishlistItemSlice";
import CategorySlice from "../Reducers/CategorySlice";
import AddressSlice from "../Reducers/AddressSlice";
export const store = configureStore({
  reducer: {
    allProducts: storeProducts,
    singleProduct: SingleProductSlice,
    filter_products: FilterProductsSlice,
    CartItems: AddToCartSlice,
    Auth: Auth,
    Wishlist: WishlistSlice,
    WishlistItem: AddWishlistItemSlice,
    categoryList: CategorySlice,
    address: AddressSlice,
  },
});

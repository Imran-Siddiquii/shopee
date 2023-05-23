import { lazy } from "react";

export const WishList = lazy(() => import("./pages/WishList"));
export const Cart = lazy(() => import("./pages/Cart"));
export const Home = lazy(() => import("./pages"));
export const SingleProduct = lazy(() => import("./pages/SingleProduct"));
export const Error = lazy(() => import("./pages/Error"));
export const Products = lazy(() => import("./pages/Products"));

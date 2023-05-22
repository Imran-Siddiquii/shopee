import { lazy } from "react";

export const WishList=lazy(()=>import('./WishList'))
export const Cart=lazy(()=>import('./Cart'))
export const Home=lazy(()=>import('./Home'))
export const SingleProduct=lazy(()=>import('./SingleProduct'))
export const Error=lazy(()=>import('./Error'))
export const Products=lazy(() => import("./Products"))
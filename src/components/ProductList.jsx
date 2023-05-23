import React from "react";
import { useSelector } from "react-redux";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filter_products, grid_view } = useSelector(
    (state) => state.filter_products
  );
  if (grid_view) {
    return <GridView products={filter_products} />;
  }
  if (grid_view === false) {
    return <ListView products={filter_products} />;
  }
};

export default ProductList;

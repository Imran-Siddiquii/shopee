import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../utils/FormatPrice";
import AddToCart from "./AddToCart";

const Product = (curElem, props) => {
  const { id, name, image, price, category } = curElem;
  return (
    <>
      <div className="card">
        <NavLink to={`/single-product/${id}`}>
          <figure>
            <img src={image} alt={name} />
            <figcaption className="caption">{category}</figcaption>
          </figure>
          <div className="card-data">
            <div className="card-data-flex">
              <h3>{name}</h3>
              <p className="card-data--price">
                {<FormatPrice price={price} />}
              </p>
            </div>
          </div>
        </NavLink>
        <AddToCart product={curElem} />
      </div>
    </>
  );
};

export default Product;

import React from "react";
import FormatPrice from "../utils/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import {
  RemoveCartItem,
  removeItem,
  setDecrease,
  setIncrease,
} from "../Redux/Reducers/AddToCartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import { AddWishlist } from "../Redux/Reducers/Wishlist/AddWishlistItemSlice";
import { removeToCartProducts } from "../Redux/Reducers/Products";

const CartItem = ({ id, name, image, price, amount, stock }) => {
  const { products } = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();
  const removeCartItem = (id) => {
    dispatch(RemoveCartItem(id));
    dispatch(removeToCartProducts(id));
  };
  const addToWishlist = (id) => {
    const findItemInProducts = products.find((ele) => ele.id === id);
    dispatch(AddWishlist(findItemInProducts));
    dispatch(RemoveCartItem(id));
  };
  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={id} />
          </figure>
        </div>
        <div>
          <p>{name}</p>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* Quantity  */}
      <CartAmountToggle
        stock={stock}
        amount={amount}
        setDecrease={() => dispatch(setDecrease(id))}
        setIncrease={() => dispatch(setIncrease(id))}
      />

      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * amount} />
        </p>
      </div>

      <div>
        <FaTrash className="remove_icon" onClick={() => removeCartItem(id)} />
      </div>
      <div>
        <AiOutlineHeart
          className="remove_icon"
          onClick={() => addToWishlist(id)}
        />
      </div>
    </div>
  );
};

export default CartItem;

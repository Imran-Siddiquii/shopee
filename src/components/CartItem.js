import React from "react";
import FormatPrice from "../Helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import {
  RemoveCartItem,
  removeItem,
  setDecrease,
  setIncrease,
} from "../Redux/Reducers/AddToCartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ id, name, image, color, price, amount, max }) => {
  const dispatch = useDispatch();
  const removeCartItem=(id)=>{
    dispatch(removeItem(id))
    dispatch(RemoveCartItem(id))
  }
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
          <div className="color-div">
            <p>color:</p>
            <div
              className="color-style"
              style={{ backgroundColor: color, color: color }}
            ></div>
          </div>
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
        stock={max}
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
        <FaTrash
          className="remove_icon"
          onClick={()=>removeCartItem(id)}
        />
      </div>
    </div>
  );
};

export default CartItem;

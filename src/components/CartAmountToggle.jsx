import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartAmountToggle = ({ amount, setDecrease, setIncrease, stock }) => {
  return (
    <div className="cart-button">
      <div className="amount-toggle">
        <button
          disabled={amount === 1 ? true : false}
          onClick={() => setDecrease()}
        >
          <FaMinus />
        </button>
        <div className="amount-style">{amount}</div>
        <button
          disabled={amount === stock ? true : false}
          onClick={() => setIncrease()}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default CartAmountToggle;

import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import CartAmountToggle from "./CartAmountToggle";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../styles/Button";
import { useDispatch } from "react-redux";
import { AddItemInCart, addItem } from "../Redux/Reducers/AddToCartSlice";
import axios from "axios";

const AddToCart = ({ product }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, colors, stock } = product;

  const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };
  const addToCart = () => {
    if (token) {
      dispatch(AddItemInCart(product))
      dispatch(addItem({ id, amount, color, product }));
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  const wishList = async () => {
    const options = {
      method:"POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      
      body:JSON.stringify(product)
    };
    try {
      const res = await fetch("/api/user/wishlist", options);
      console.log(await res.json());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <div className="colors">
        <p>
          Color:
          {colors.map((curColor, index) => {
            return (
              <button
                key={index}
                style={{ backgroundColor: curColor }}
                className={color === curColor ? "btnStyle active" : "btnStyle"}
                onClick={() => setColor(curColor)}
              >
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </p>
      </div>

      {/* add to cart  */}
      <CartAmountToggle
        stock={stock}
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />
      <Button className="btn" onClick={addToCart}>
        Add To Cart
      </Button>
      <Button
        className="btn"
        onClick={() => wishList()}
        // onClick={() => dispatch(addItem({ id, amount, color, product }))}
      >
        Add To Wishlist
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;
export default AddToCart;

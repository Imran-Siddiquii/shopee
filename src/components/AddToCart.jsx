import styled from "styled-components";
import { FaAd, FaCheck, FaSpinner } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../styles/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddItemInCart } from "../Redux/Reducers/AddToCartSlice";
import { AddWishlist } from "../Redux/Reducers/Wishlist/AddWishlistItemSlice";
import {
  addToCartProducts,
  addToWishlistProducts,
} from "../Redux/Reducers/Products";
const AddToCart = ({ product, isCart, isWishlist }) => {
  const { loading } = useSelector((state) => state.WishlistItem);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addToCart = () => {
    if (token) {
      if (product.isCart || isCart) {
        navigate("/cart");
      } else {
        dispatch(AddItemInCart(product));
        dispatch(addToCartProducts(product.id));
      }
    } else {
      navigate("/login");
    }
  };

  const addToWishlist = () => {
    if (token) {
      dispatch(addToWishlistProducts(product.id));
      dispatch(AddWishlist(product));
    } else {
      navigate("/login");
    }
  };

  return (
    <Wrapper>
      {/* add to cart  */}
      <Button className="" onClick={addToCart}>
        {isCart || product?.isCart ? "Go To Cart" : "Add To Cart"}
      </Button>
      <Button
        className=""
        disabled={isWishlist || product?.isWishlist}
        onClick={addToWishlist}
      >
        {isWishlist || product?.isWishlist ? "Wishlisted" : "Add To Wishlist"}
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
    margin-left: 0.5rem;
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

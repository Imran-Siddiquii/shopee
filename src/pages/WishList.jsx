import React, { useEffect } from "react";
import { fetchWishlist } from "../Redux/Reducers/Wishlist/WishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { NavLink } from "react-router-dom";
import FormatPrice from "../utils/FormatPrice";
import { AddItemInCart, addItem } from "../Redux/Reducers/AddToCartSlice";
import { RemoveWishlistItem } from "../Redux/Reducers/Wishlist/AddWishlistItemSlice";
import CartAmountToggle from "../components/CartAmountToggle";
import { FaCheck } from "react-icons/fa";
import { removeToWishlistProducts } from "../Redux/Reducers/Products";

const WishList = () => {
  const { data } = useSelector((state) => state.WishlistItem);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWishlist());
    // eslint-disable-next-line
  }, []);
  const moveToCart = (product) => {
    const { id } = product;
    dispatch(RemoveWishlistItem(id));
    dispatch(AddItemInCart(product));
  };
  const removeItem = (id) => {
    dispatch(RemoveWishlistItem(id));
    dispatch(removeToWishlistProducts(id));
  };

  if (data?.length === 0) {
    return (
      <EmptyDiv>
        <h3>No Items In Wishlist </h3>
        <NavLink to="/products">
          <Button>Add Now</Button>
        </NavLink>
      </EmptyDiv>
    );
  }
  return (
    <Wrapper className="section">
      <div className="container">
        <div className="common-heading">Wishlist Item</div>
        <div className="grid grid-three-column">
          {data.map((curElem) => {
            const { id, name, image, price, category } = curElem;
            return (
              <>
                <div className="card" key={id}>
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
                  {/* <CartAmountToggle
                    stock={stock}
                    amount={amount}
                    setDecrease={setDecrease}
                    setIncrease={setIncrease}
                  /> */}
                  <Button className="" onClick={() => removeItem(id)}>
                    Remove
                  </Button>
                  <Button className="" onClick={() => moveToCart(curElem)}>
                    Move To Cart
                  </Button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default WishList;

const Wrapper = styled.section`
  padding: 9rem 0;
  background-color: ${({ theme }) => theme.colors.bg};

  .container {
    max-width: 120rem;
  }

  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
    }

    .caption {
      position: absolute;
      top: 15%;
      right: 10%;
      text-transform: uppercase;
      background-color: ${({ theme }) => theme.colors.bg};
      color: ${({ theme }) => theme.colors.helper};
      padding: 0.8rem 2rem;
      font-size: 1.2rem;
      border-radius: 2rem;
      font-weight: bolder;
    }
  }

  .card {
    background-color: #fff;
    border-radius: 1rem;

    .card-data {
      padding: 0 2rem;
    }

    .card-data-flex {
      margin: 2rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h3 {
      color: ${({ theme }) => theme.colors.text};
      text-transform: capitalize;
    }

    .card-data--price {
      color: ${({ theme }) => theme.colors.helper};
    }

    .btn {
      margin: 2rem auto;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgb(98 84 243);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(98 84 243);
        font-size: 1.4rem;
      }
    }
  }
`;

const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  height: 50vh;
  h3 {
    font-size: 4.2rem;
    text-transform: capitalize;
    font-weight: 300;
  }
`;

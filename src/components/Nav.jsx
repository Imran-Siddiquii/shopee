import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineAppstoreAdd,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Tooltip } from "@mui/material";
import { Button } from "../styles/Button";
import { Logout } from "../Redux/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.CartItems);
  const { data } = useSelector((state) => state.WishlistItem);
  const [menuIcon, setMenuIcon] = useState();
  const Auth = localStorage.getItem("token");
  const { token } = useSelector((state) => state.Auth);
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]); //eslint-disable-line
  return (
    <Nav>
      <div className={menuIcon ? "navbar active" : "navbar"}>
        <ul className="navbar-lists">
          <li>
            <Tooltip title="Store">
              <NavLink
                to="/products"
                className="navbar-link cart-trolley--link "
                onClick={() => setMenuIcon(false)}
              >
                <AiOutlineAppstoreAdd className="cart-trolley" />
              </NavLink>
            </Tooltip>
          </li>

          <li>
            <Tooltip title="Cart">
              <NavLink to="/cart" className="navbar-link cart-trolley--link">
                <AiOutlineShoppingCart
                  className="cart-trolley"
                  onClick={() => setMenuIcon(false)}
                />
                <span className="cart-total--item">{cart?.length}</span>
              </NavLink>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="Wishlist">
              <NavLink
                to="/wishlist"
                className="navbar-link cart-trolley--link"
              >
                <AiOutlineHeart
                  className="cart-trolley"
                  onClick={() => setMenuIcon(false)}
                />
                <span className="cart-total--item">{data?.length}</span>
              </NavLink>
            </Tooltip>
          </li>
          {token || Auth ? (
            <li>
              <Button
                className="button-style"
                onClick={() => {
                  dispatch(Logout());
                  localStorage.removeItem("token");
                }}
              >
                Log Out
              </Button>
            </li>
          ) : (
            <li>
              <NavLink to="/login">
                <Button
                  className="button-style"
                  // onClick={() => loginWithRedirect()}
                >
                  Log In
                </Button>
              </NavLink>
            </li>
          )}
        </ul>

        {/* // </div> */}
        {/* two button for open and close of menu */}
        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            name="close-outline"
            className="mobile-nav-icon close-outline"
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </Nav>
  );
};
const Nav = styled.nav`
  .navbar-lists {
    display: flex;
    gap: 4.8rem;
    align-items: center;

    .navbar-link {
      &:link,
      &:visited {
        display: inline-block;
        text-decoration: none;
        font-size: 1.8rem;
        font-weight: 500;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.black};
        transition: color 0.3s linear;
      }

      &:hover,
      &:active {
        color: ${({ theme }) => theme.colors.helper};
      }
    }
  }

  .mobile-navbar-btn {
    display: none;
    background-color: transparent;
    cursor: pointer;
    border: none;
  }

  .mobile-nav-icon[name="close-outline"] {
    display: none;
  }

  .close-outline {
    display: none;
  }

  .cart-trolley--link {
    position: relative;

    .cart-trolley {
      position: relative;
      font-size: 3.2rem;
    }

    .cart-total--item {
      width: 2.4rem;
      height: 2.4rem;
      position: absolute;
      background-color: #000;
      color: #000;
      border-radius: 50%;
      display: grid;
      place-items: center;
      top: -20%;
      left: 70%;
      background-color: ${({ theme }) => theme.colors.helper};
    }
  }

  .user-login--name {
    text-transform: capitalize;
  }

  .user-logout,
  .user-login {
    font-size: 1.4rem;
    padding: 0.8rem 1.4rem;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .mobile-navbar-btn {
      display: inline-block;
      z-index: 9999;
      border: ${({ theme }) => theme.colors.black};

      .mobile-nav-icon {
        font-size: 4.2rem;
        color: ${({ theme }) => theme.colors.black};
      }
    }

    .active .mobile-nav-icon {
      display: none;
      font-size: 4.2rem;
      position: absolute;
      top: 30%;
      right: 10%;
      color: ${({ theme }) => theme.colors.black};
      z-index: 9999;
    }

    .active .close-outline {
      display: inline-block;
    }

    .navbar-lists {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      visibility: hidden;
      opacity: 0;
      transform: translateX(100%);
      /* transform-origin: top; */
      transition: all 1s;
    }

    .active .navbar-lists {
      visibility: visible;
      opacity: 1;
      transform: translateX(0);
      z-index: 999;
      transform-origin: right;
      transition: all 1s;

      .navbar-link {
        font-size: 4.2rem;
      }
    }
    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 5.2rem;
      }

      .cart-total--item {
        width: 4.2rem;
        height: 4.2rem;
        font-size: 2rem;
      }
    }

    .user-logout,
    .user-login {
      font-size: 2.2rem;
      padding: 0.8rem 1.4rem;
    }
  }
`;
export default Navbar;

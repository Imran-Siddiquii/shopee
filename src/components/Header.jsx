import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Nav";
import { AiOutlineSearch } from "react-icons/ai";
export const Header = () => {
  const navigate = useNavigate();
  return (
    <MainHeader>
      <NavLink to="/">
        <img
          src="./images/LogoR.png"
          height={70}
          width={90}
          alt="my logo img"
        />
      </NavLink>
      <div id="input_group">
        <label id="label" for="input">
          <AiOutlineSearch
            className="search-icon"
            onClick={() => navigate("/products")}
          />
        </label>
        <input
          id="input"
          type="text"
          className="input-search"
          placeholder="Search Products"
        />
      </div>
      <Navbar />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: "${({ theme }) => theme.colors.bg}";
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  logo {
    height: 5rem;
  }
`;

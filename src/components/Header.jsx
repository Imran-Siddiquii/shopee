import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Nav";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search_filter } from "../Redux/Reducers/FilterProductsSlice";
export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchToggle, setSearchToggle] = useState("");
  const { filter_products } = useSelector((state) => state.filter_products);
  const filterData = (event) => {
    const { name, value } = event.target;
    setSearchToggle(value);
    dispatch(search_filter({ name, value }));
  };
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
        <label id="label" htmlFor="input">
          <AiOutlineSearch className="search-icon" />
        </label>
        <input
          id="input"
          type="text"
          name="text"
          autoComplete="off"
          className="input-search"
          placeholder="Search Products"
          onChange={filterData}
        />
        {searchToggle ? (
          <div className="search-item">
            {filter_products?.length
              ? filter_products.map((ele) => (
                  <NavLink to={`/single-product/${ele.id}`}>
                    <div className="list-item">
                      <div className="d-flex">
                        <img
                          src={ele.image}
                          alt={ele.id}
                          width="90px"
                          height="50px"
                        />
                      </div>
                      <div className="list-item-text">
                        <li>{ele.name}</li>
                      </div>
                    </div>
                  </NavLink>
                ))
              : "no data found"}
          </div>
        ) : null}
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
  box-shadow: 1px 1px 5px 1px rgba(97, 84, 243, 0.263);
  logo {
    height: 5rem;
  }
  .search-item {
    position: absolute;
    width: 32.5vw;
    height: fit-content;
    z-index: 999;
    background-color: white;
    padding: 1rem 2rem;
    box-shadow: 1px 0px 5px 1px rgba(186, 164, 241, 0.759);
  }
  .list-item {
    display: flex;
    margin: 2rem 0rem;
  }
  .list-item-text {
    display: flex;
    font-size: 2rem;
    align-items: center;
    padding: 0rem 3rem;
  }
`;

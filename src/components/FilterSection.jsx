import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import {
  clearFilter,
  search_filter,
} from "../Redux/Reducers/FilterProductsSlice";
import { Button } from "../styles/Button";
import FormatPrice from "../utils/FormatPrice";

const FilterSection = () => {
  const dispatch = useDispatch();
  const {
    all_products,
    searchFilter: { text, category, company, color, minPrice, maxPrice, price },
  } = useSelector((state) => state.filter_products);

  // function to get unique value
  const uniqueValue = (data, property) => {
    let newVal = data.map((curElem) => curElem[property]);
    if (property === "colors") {
      newVal = newVal.flat(); // no need to use set constructor because each element is unique
    }
    newVal = ["All", ...new Set(newVal)]; // this give you array with unique value . for add ALL , we just need to  add ALL before ...new
    return newVal;
  };

  const getUniqueCategory = uniqueValue(all_products, "category");
  const getUniqueCompany = uniqueValue(all_products, "company");

  // dispatching function to filter

  const filterData = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    dispatch(search_filter({ name, value }));
  };

  // console.log(color, getUniqueColor);
  return (
    <Wrapper>
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={text}
            name="text"
            placeholder="Search"
            onChange={filterData}
          />
        </form>
      </div>

      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {getUniqueCategory.map((curElem, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                value={curElem}
                className={curElem === category ? "active" : ""}
                onClick={filterData}
              >
                {curElem}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-company">
        <h3>Company</h3>

        <form action="#">
          <select
            name="company"
            id="company"
            value={company}
            className="filter-company--select"
            onChange={filterData}
          >
            {getUniqueCompany.map((curElem, index) => {
              return (
                <option key={index} value={curElem} name="company">
                  {curElem}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      <div>
        <div className="filter_price">
          <h3>Price</h3>
          <p>
            <FormatPrice price={price} />
          </p>

          <input
            type="range"
            name="price"
            value={price}
            min={minPrice}
            max={maxPrice}
            onChange={filterData}
          />
        </div>
        <div className="filter-clear">
          <Button className="btn" onClick={() => dispatch(clearFilter())}>
            Clear Filters
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  h3 {
    padding: 2rem 0;
    font-size: bold;
  }
  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }
  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;
      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;
        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }
      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }
  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }
  .filter-color-style {
    display: flex;
    justify-content: center;
  }
  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
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
  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }
  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;
export default FilterSection;

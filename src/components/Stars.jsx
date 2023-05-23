import React from "react";
import { BsStarHalf } from "react-icons/bs";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import styled from "styled-components";
const Stars = ({ stars, review }) => {
  const ratingStar = Array.from({ length: 5 }, (curElem, index) => {
    const numbers = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <AiFillStar className="icon" />
        ) : stars >= numbers ? (
          <BsStarHalf className="icon" style={{ fontSize: "1.75em" }} />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });

  return (
    <Wrapper>
      <div className="icon-style">
        {ratingStar}
        <p>({review} customer reviews)</p>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .icon-style {
    display: flex;
    gap: 0.2rem;
    align-items: center;
    justify-content: flex-start;
    .icon {
      font-size: 2rem;
      color: orange;
    }
    .empty-icon {
      font-size: 2.6rem;
    }
    p {
      margin: 0;
      padding-left: 1.2rem;
    }
  }
`;
export default Stars;

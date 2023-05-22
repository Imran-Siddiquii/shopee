import React from "react";
import styled from "styled-components";
import HeroSection from "./components/HeroSection";
const data = { name: "Wish Store" };
const About = () => {
  return (
    <Wrapper>
      <HeroSection myData={data} />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg};
`;
export default About;

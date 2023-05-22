import React, { useEffect } from "react";
import Services from "./components/Services";
import Trusted from "./components/Trusted";
import HeroSection from "./components/HeroSection";
import FeatureProduct from "./components/FeatureProducts";
import { useDispatch } from "react-redux";
import { totalItem } from "./Redux/Reducers/AddToCartSlice";
const data = { name: "Wish Store" };
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(totalItem());

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <HeroSection myData={data} />
      <FeatureProduct />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;

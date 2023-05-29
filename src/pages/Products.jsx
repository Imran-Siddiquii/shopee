import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FilterSection from "../components/FilterSection";
import Loader from "../components/Loader";
import ProductList from "../components/ProductList";
import Sort from "../components/Sort";
import { filterProducts } from "../Redux/Reducers/FilterProductsSlice";
import { Spin } from "antd";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Products = () => {
  const { loading } = useSelector((state) => state.WishlistItem);
  const [isCentered, setIsCentered] = useState(true);

  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.allProducts);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      if (scrollTop > windowHeight / 2) {
        setIsCentered(false);
      } else {
        setIsCentered(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(filterProducts(products));
    // eslint-disable-next-line
  }, [products]);
  if (loading) {
    return (
      <Box
        sx={{ display: "flex", marginTop: "12rem", justifyContent: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="container grid grid-filter-column">
            <div>
              <FilterSection />
            </div>

            <section className="product-view--sort">
              <div className="sort-filter">
                <Sort />
              </div>
              <div className="main-product">
                <ProductList />
              </div>
            </section>
          </div>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default Products;

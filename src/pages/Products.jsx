import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FilterSection from "../components/FilterSection";
import Loader from "../components/Loader";
import ProductList from "../components/ProductList";
import Sort from "../components/Sort";
import { filterProducts } from "../Redux/Reducers/FilterProductsSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(filterProducts(products));
    // eslint-disable-next-line
  }, [products]);

  return (
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

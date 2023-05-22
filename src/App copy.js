import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import { router } from "./Router";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./Redux/Reducers/Products";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
const theme = {
  colors: {
    heading: "rgb(24,24,29",
    text: "rgba(29,29,29,0.8)",
    white: "#ffff",
    black: "#212529",
    helper: "#8490ff",
    bg: "#F6F8FA",
    footer_bg: "#0a1435",
    btn: "rgb(98,84,243)",
    border: "rgb(98,84,243,0.5)",
    hr: "#ffffff",
    gradient:
      "linear-gradient(0deg,rgb(132,144,255) 0% , rgb(98 189 252) 100%)",
    shadow:
      "rgba(0,0,0,0.02) 0px 1px 3px 0px ,rgba(27,31,35,0.15) 0px 0px 0px 1px",
    shadowSupport: "rgba(0,0,0,0.16) 0px 1px 4px",
  },
  media: { mobile: "768px", tab: "998px" },
};
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <ScrollToTop />
          {/* <ScrollRestoration
            getKey={(location) => {
              return location.pathname;
            }}
          /> */}
          <GlobalStyle />
          <Suspense fallback={<Loader />}>
            <Header />
            <Routes>
              {router.map((route, index) => (
                <Route
                  key={index}
                  path={route?.path}
                  exact={route?.exact}
                  element={<route.component />}
                />
              ))}
            </Routes>
            <Footer />
          </Suspense>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;

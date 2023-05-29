import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { LoginAuth } from "../Redux/auth";
import { NavLink } from "react-router-dom";
import Loader from "../components/Loader";

export const Login = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.Auth);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    const { email, password } = formData;
    e.preventDefault();
    dispatch(LoginAuth({ email, password }));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="contact-form">
            <form onSubmit={handleSubmit} className="contact-inputs">
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="off"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="password"
                placeholder="Password"
                autoComplete="off"
                required
                onChange={handleChange}
              />
              <NavLink to="/signin">Create new account?</NavLink>
              <input type="submit" value="Log In" />
            </form>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  padding: 3rem 0 3rem 0;
  text-align: right;
  font-size: 1.5rem;

  .container {
    margin-top: 6rem;

    .contact-form {
      max-width: 50rem;
      margin: auto;

      .contact-inputs {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        input[type="submit"] {
          cursor: pointer;
          transition: all 0.2s;
          padding: 1rem 1.2rem;
          &:hover {
            background-color: ${({ theme }) => theme.colors.white};
            border: 1px solid ${({ theme }) => theme.colors.btn};
            color: ${({ theme }) => theme.colors.btn};
            transform: scale(0.9);
          }
        }
      }
    }
  }
`;

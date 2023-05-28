import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { LoginAuth } from "../Redux/auth";
import { NavLink } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const [dados, setDados] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    const { email, password } = dados;
    e.preventDefault();
    dispatch(LoginAuth({ email, password }));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDados(Object.assign(dados, { [name]: value }));
  };

  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="contact-form">
            <form method="POST" className="contact-inputs">
              <input
                type="email"
                name="Email"
                placeholder="Email"
                autoComplete="off"
                required
              />
              <input
                type="text"
                name="password"
                placeholder="Password"
                autoComplete="off"
                required
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

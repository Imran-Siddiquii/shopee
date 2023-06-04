import React, { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInAuth } from "../Redux/auth";
import { message } from "antd";
import { useEffect } from "react";

export const Signin = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { isError } = useSelector((state) => state.Auth);

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (isError) {
      error();
    }
  }, [isError]);

  const handleSignup = async (e) => {
    e.preventDefault();
    const { firstName, email, lastName, password, confirmPassword } = formData;
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
      dispatch(
        signInAuth({ firstName, lastName, password, email, confirmPassword })
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formData.confirmPassword === formData.password) {
      setPasswordError("");
    }
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "The credentials you entered are invalid",
    });
  };

  return (
    <Wrapper>
      {contextHolder}
      <div className="container">
        <div className="contact-form">
          <form className="contact-inputs" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              required
              autoComplete="off"
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              required
              autoComplete="off"
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              onChange={handleInputChange}
              required
            />
            <div id="groups">
              <label id="label" htmlFor="">
                {!showPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                    className="search-icon"
                    style={{ fontSize: "2rem", color: "rgba(0,0,0,0.7)" }}
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowPassword(!showPassword)}
                    className="search-icon"
                    style={{ fontSize: "2rem", color: "rgba(0,0,0,0.7)" }}
                  />
                )}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="off"
                onChange={handleInputChange}
                required
                style={{ height: "5rem", paddingLeft: "2.5rem" }}
                // className="input-search"
              />
            </div>
            <input
              type="text"
              name="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="off"
              onChange={handleInputChange}
              required
            />
            {passwordError ? (
              <h4 style={{ color: "red" }}>Password should match</h4>
            ) : null}
            <NavLink to="/login">Already have an account?</NavLink>
            <input type="submit" value="Sign In" />
          </form>
        </div>
      </div>
    </Wrapper>
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
        #groups {
          position: relative;
        }
        input {
          text-transform: none;
          width: 100%;
        }
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

import React, { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export const Signin = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("helo");
    const { firstName, email, lastName, password, confirmPassword } = formData;
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({
            firstName,
            lastName,
            password,
            email,
            confirmPassword,
          }),
        });
        const { createdUser, encodedToken } = await res.json();
        localStorage.setItem("token", encodedToken);
        if (encodedToken) {
          navigate("/");
        }
      } catch (error) {}
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="contact-form">
          <form
            method="POST"
            className="contact-inputs"
            onSubmit={handleSignup}
          >
            <input
              type="text"
              placeholder="username"
              name="username"
              required
              autoComplete="off"
              onChange={handleInputChange}
            />

            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              onChange={handleInputChange}
              required
            />
            <div id="input_group">
              <label id="label" htmlFor="">
                {!showPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                    className="search-icon"
                    style={{ fontSize: "2rem" }}
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowPassword(!showPassword)}
                    className="search-icon"
                    style={{ fontSize: "2rem" }}
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
                className="input-search"
              />
            </div>
            <input
              type="text"
              name="comfirm-password"
              placeholder="Confirm Password"
              autoComplete="off"
              onChange={handleInputChange}
              required
            />
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

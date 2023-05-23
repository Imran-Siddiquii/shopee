import React, { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 30px 10px 10px;
  margin-bottom: 10px;
  width: 100%;
  border: none;
  border-bottom: 1px solid gray;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #0077cc;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }
`;

const IconContainer = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 5px;
`;

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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <form onSubmit={handleSignup}>
        <Label>First Name</Label>
        <Input
          type="text"
          placeholder="Enter your first name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <Label>Last Name</Label>
        <Input
          type="text"
          placeholder="Enter your last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <Label>Email</Label>
        <Input
          type="Email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <Label>Password</Label>
        <InputContainer>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <IconContainer onClick={handleTogglePassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </IconContainer>
        </InputContainer>
        <Label>Confirm Password</Label>
        <Input
          type="password"
          placeholder="Confirm your password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        <Button type="submit">Sign Up</Button>
      </form>
    </Container>
  );
};

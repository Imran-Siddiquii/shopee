import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { userAddress } from "../Redux/Reducers/AddressSlice";

export const Address = ({ editItem }) => {
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    pincode: "",
    state: "",
    address: "",
    phoneNumber: "",
  });
  useEffect(() => {
    if (editItem) {
      const { Name, email, pincode, address, phoneNumber, state } = editItem;
      setFormData(() => ({
        ...formData,
        Name,
        email,
        pincode,
        address,
        phoneNumber,
        state,
      }));
    }
  }, [editItem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    setId((pre) => pre + 1);
    e.preventDefault();
    const { Name, email, pincode, address, phoneNumber, state } = formData;

    dispatch(
      userAddress({
        addressId: id,
        Name,
        email,
        pincode,
        address,
        phoneNumber,
        state,
      })
    );
    setFormData({
      Name: "",
      email: "",
      pincode: "",
      state: "",
      address: "",
      phoneNumber: "",
    });
  };
  return (
    <Wrapper>
      <div className="container">
        <div className="contact-form">
          <form className="contact-inputs" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="FULL NAME"
              name="Name"
              value={formData.Name}
              required
              autoComplete="off"
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="EMAIL"
              autoComplete="off"
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              placeholder="+91XXXXXXXXXX"
              name="phoneNumber"
              value={formData.phoneNumber}
              required
              minLength={10}
              autoComplete="off"
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="address"
              placeholder="ADDRESS"
              autoComplete="off"
              value={formData.address}
              onChange={handleInputChange}
              required
              style={{ height: "5rem", paddingLeft: "2.5rem" }}
              //   className="input-search"
            />
            <input
              type="text"
              name="state"
              placeholder="STATE"
              value={formData.state}
              autoComplete="off"
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="pincode"
              value={formData.pincode}
              placeholder="PIN CODE"
              autoComplete="off"
              onChange={handleInputChange}
              required
            />
            <input type="submit" value="Add Address" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 0rem 0 3rem 0;
  text-align: right;
  font-size: 1.5rem;
  .container {
    margin-top: 3rem;

    .contact-form {
      max-width: 50rem;
      margin: auto;

      .contact-inputs {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        input {
          text-transform: none;
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

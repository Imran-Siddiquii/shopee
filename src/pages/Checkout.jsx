import React from "react";
import styled from "styled-components";
import { Address } from "../components/Address";
import FormatPrice from "../utils/FormatPrice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

import { RiPencilFill } from "react-icons/ri";
import { deleteAddress } from "../Redux/Reducers/AddressSlice";
import { useEffect } from "react";
export const Checkout = () => {
  const { total_price, shipping_fee } = useSelector((state) => state.CartItems);
  const dispatch = useDispatch();
  const { place } = useSelector((state) => state.address);
  const [selectedItem, setSelectedItem] = useState(place[0]);
  const [update, setUpdate] = useState([]);

  useEffect(() => {
    if (place.length) {
      setSelectedItem(place[0]);
    }
  }, [place]);
  const handleSelection = (item) => {
    setSelectedItem(item);
  };
  const handleUpdate = (item) => {
    // Handle update functionality for the selected item
    setUpdate([item]);
    dispatch(deleteAddress(item.addressId));

    console.log("Update item:", item);
  };

  const handleDelete = (item) => {
    // Handle delete functionality for the selected item
    dispatch(deleteAddress(item.addressId));
  };
  return (
    <Container>
      <FirstColumn>
        <FirstRow>
          {place?.map((item) => (
            <ListItem key={item.id}>
              <Label>
                <RadioButton
                  type="radio"
                  checked={selectedItem === item}
                  onChange={() => handleSelection(item)}
                />
                <ListName>{item.Name}</ListName>
                <ListEmail>{item.email}</ListEmail>
                <ListPhoneNumber>{item.phoneNumber}</ListPhoneNumber>
                <ListPincode>{item.pincode}</ListPincode>
                <ListState>{item.state}</ListState>
                <ListAddress>{item.address}</ListAddress>
              </Label>
              <UpdateIcon
                onClick={() => handleUpdate(item)}
                role="img"
                aria-label="Update"
              />

              <DeleteIcon
                role="img"
                aria-label="Delete"
                onClick={() => handleDelete(item)}
              >
                <FaTrash className="remove_icon" />
              </DeleteIcon>
            </ListItem>
          ))}
        </FirstRow>
        <SecondRow>
          <Address editItem={update?.length ? update[0] : false} />
        </SecondRow>
      </FirstColumn>
      <SecondColumn>
        <CenteredDiv>
          <div className="order-total--subdata">
            <div>
              <p>subtotal:</p>
              <p>
                <FormatPrice price={total_price} />
              </p>
            </div>
            <div>
              <p>shipping fee:</p>
              <p>
                <FormatPrice price={shipping_fee} />
              </p>
            </div>
            <hr />
            <div>
              <p>order total:</p>
              <p>
                <FormatPrice price={shipping_fee + total_price} />
              </p>
            </div>
            <Button>{place.length ? "Checkout" : "Add Address"}</Button>
          </div>
        </CenteredDiv>
      </SecondColumn>
    </Container>
  );
};

const UpdateIcon = styled(RiPencilFill)`
  margin-right: 5px;
  cursor: pointer;
  color: green;
  font-size: 1.5rem;
`;

const DeleteIcon = styled.span`
  margin-right: 5px;
  font-size:"2rem"
  cursor: pointer;
  color: "red";
`;
const Label = styled.label`
  cursor: pointer;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .remove_icon {
    font-size: 1.5rem;
    color: #e74c3c;
    cursor: pointer;
  }
`;

const RadioButton = styled.input`
  margin-right: 10px;
`;

const ListName = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const ListEmail = styled.span`
  margin-right: 5px;
`;

const ListPhoneNumber = styled.span`
  margin-right: 5px;
`;

const ListPincode = styled.span`
  margin-right: 5px;
`;

const ListState = styled.span`
  margin-right: 5px;
`;

const ListAddress = styled.span`
  margin-right: 5px;
`;
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const FirstColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FirstRow = styled.div`
  flex: 20;
  background-color: #f2f2f2;
`;

const SecondRow = styled.div`
  flex: 80;
  background-color: #d9d9d9;
`;

const SecondColumn = styled.div`
  flex: 0 0 25%;
  background-color: #cccccc;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 30%;
    z-index: 999;
  }
`;

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 90%;
  margin: 0 auto;

  .order-total--subdata {
    border: 0.1rem solid #f0f0f0;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    padding: 3.2rem;
  }
  div {
     display: flex;
    gap: 6rem;
     justify-content: end;
  }

  div:last-child {
    background-color: #fafafa;
  }

  div p:last-child {
    font-weight: bold;
    align-text:end
    color: ${({ theme }) => theme.colors.heading};
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`;

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

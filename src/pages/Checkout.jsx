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
import { Button } from "../styles/Button";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
  const { cart, total_price, shipping_fee } = useSelector(
    (state) => state.CartItems
  );
  const dispatch = useDispatch();
  const { place } = useSelector((state) => state.address);
  const [selectedItem, setSelectedItem] = useState(place[0]);
  const [update, setUpdate] = useState([]);
  const navigate = useNavigate();
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
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const checkOut = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("please api is not giveing response");
      return;
    }
    const options = {
      key: "rzp_test_B2hkpWcDpvmbUL",
      currency: "INR",
      amount: total_price + shipping_fee,
      name: "Wish Store",
      description: "Thank for purchasing",
      handler: (response) => {
        if (response.razorpay_payment_id) {
          openNotificationWithIcon("success", response.razorpay_payment_id);
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, id) => {
    api[type]({
      message: "Order Successful",
      description: `Your Payment Id ${id}, Your order will be deliver with 2 days `,
      duration: 4,
      onClose: () => navigate("/"),
    });
  };
  return (
    <>
      {contextHolder}
      <Container>
        <FirstColumn>
          <FirstRow>
            {place.length ? (
              <>
                <h1>Item will be deliver on Selected address</h1>
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
              </>
            ) : (
              <h1 style={{ color: "red" }}>
                Please add address to deliver items
              </h1>
            )}
            {}
          </FirstRow>
          <SecondRow>
            <Address editItem={update?.length ? update[0] : false} />
          </SecondRow>
        </FirstColumn>
        <SecondColumn>
          <CenteredDiv>
            <div className="order-total--subdata">
              <h1>Total Item </h1>
              <Table>
                <thead>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total Price</TableHead>
                  </TableRow>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const { name, price, amount } = item;
                    let total_amout = price * amount;
                    return (
                      <TableRow>
                        <TableData>{name}</TableData>
                        <TableData>{amount}</TableData>
                        <TableData>
                          <FormatPrice price={total_amout} />
                        </TableData>
                      </TableRow>
                    );
                  })}
                </tbody>
              </Table>
              <div>
                <p>Subtotal</p>
                <p>
                  <FormatPrice price={total_price} />
                </p>
              </div>
              <div>
                <p>Shipping fee</p>
                <p>
                  <FormatPrice price={shipping_fee} />
                </p>
              </div>
              <hr />
              <div>
                <p>Order total</p>
                <p>
                  <FormatPrice price={shipping_fee + total_price} />
                </p>
              </div>
              {place.length ? (
                <Button onClick={checkOut}>Checkout</Button>
              ) : (
                <Button> Select Address</Button>
              )}
            </div>
          </CenteredDiv>
        </SecondColumn>
      </Container>
    </>
  );
};

const UpdateIcon = styled(RiPencilFill)`
  margin-right: 5px;
  cursor: pointer;
  color: green;
  font-size: 2rem;
`;

const DeleteIcon = styled.span`
  margin-right: 0px;
  align-text: right;
  font-size: 2rem;
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
    font-size: 2rem;
    color: #e74c3c;
    cursor: pointer;
  }
`;

const RadioButton = styled.input`
  margin-right: 10px;
  font-size: 1.5rem;
`;

const ListName = styled.span`
  font-weight: bold;
  margin-right: 5px;
  font-size: 1.5rem;
`;

const ListEmail = styled.span`
  margin-right: 5px;
  font-size: 1.5rem;
`;

const ListPhoneNumber = styled.span`
  margin-right: 5px;
  font-size: 1.5rem;
`;

const ListPincode = styled.span`
  margin-right: 5px;
  font-size: 1.5rem;
`;

const ListState = styled.span`
  margin-right: 5px;
  font-size: 1.5rem;
`;

const ListAddress = styled.span`
  margin-right: 5px;
  font-size: 1.5rem;
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
  margin: 1rem 2rem;
  flex: 20;
  h1 {
    margin-bottom: 2rem;
  }
`;

const SecondRow = styled.div`
  flex: 80;
  background-color: #d9d9d9;
`;

const SecondColumn = styled.div`
  flex: 0 0 25%;
  background-color: #f6f8fa;

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
  background-color: ${({ theme }) => theme.colors.bg};

  .order-total--subdata {
    border: 0.1rem solid #f0f0f0;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    padding: 3.2rem;
  }
  div {
     display: flex;
    gap: 15rem;
    padding-left:1rem;
     ${"" /* justify-content: end; */}
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

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHead = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  width: 33.33%; /* Set the width to one-third of the table */
`;

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  width: 33.33%; /* Set the width to one-third of the table */
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:first-child ${TableData} {
    border-top: none;
  }
`;

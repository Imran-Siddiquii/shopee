import { createSlice } from "@reduxjs/toolkit";

// const getLocalStorage = () => {
//   let localProduct = localStorage.getItem("CartData");
//   if (!localProduct) {
//     return [];
//   } else {
//     return JSON?.parse(localProduct);
//   }
// };
const AddToCartSlice = createSlice({
  name: "Add_to_Cart",
  initialState: {
    // cart: getLocalStorage(),

    cart: [],
    total_item: 0,
    total_price: "",
    shipping_fee: 50000,
  },
  reducers: {
    addItem: (state, { payload }) => {
      console.log(payload, "check item in the payload");
      const checkMultiple = payload.reduce((acc, curr) => {
        curr = curr.amount ? null : (curr["amount"] = 1);
        acc.push(curr);
        return acc;
      }, []);
      const cartData = checkMultiple.reduce((acc, item) => {
        const existingItem = acc.find((i) => i.id === item.id);
        if (existingItem) {
          existingItem.amount++;
        } else {
          acc.push(item);
        }
        return acc;
      }, []);

      state.cart = cartData;
    },

    // remove item from array
    removeItem: (state, { payload }) => {
      const checkMultiple = payload.reduce((acc, curr) => {
        curr = curr.amount ? null : (curr["amount"] = 1);
        acc.push(curr);
        return acc;
      }, []);
      state.cart = checkMultiple;
    },
    // clear cart
    clearCart: (state) => {
      state.cart = [];
    },
    setIncrease: (state, { payload }) => {
      // update amount
      let UpdateArray = state.cart.map((ele) => {
        if (ele.id === payload) {
          let maxQunetity = ele.amount + 1;
          if (maxQunetity >= ele.max) {
            maxQunetity = ele.max;
          }
          return { ...ele, amount: maxQunetity };
        } else {
          return ele;
        }
      });
      state.cart = UpdateArray;
    },
    setDecrease: (state, { payload }) => {
      // update amount

      let UpdateArray = state.cart.map((ele) => {
        if (ele.id === payload) {
          let minQunetity = ele.amount - 1;
          if (minQunetity < 2) {
            minQunetity = 1;
          }
          return { ...ele, amount: minQunetity };
        } else {
          return ele;
        }
      });
      state.cart = UpdateArray;
    },
    totalItem: (state) => {
      state.total_item = state?.cart?.reduce(
        (acc, curr) => (acc += curr.amount),
        0
      );
    },
    totalPrice: (state) => {
      state.total_price = state?.cart?.reduce(
        (acc, curr) => (acc += curr.price * curr.amount),
        0
      );
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  setIncrease,
  setDecrease,
  totalItem,
  totalPrice,
} = AddToCartSlice.actions;
export default AddToCartSlice.reducer;

export const GetUserCart = () => {
  return async function getItem(dispatch) {
    const options = {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    try {
      const res = await fetch("/api/user/cart", options);
      const data = await res.json();
      // dispatch(addItem(data?.cart));
      console.log("cartItem", data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const AddItemInCart = (product) => {
  return async function postItem(dispatch) {
    const options = {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ product }),
    };
    try {
      const res = await fetch("/api/user/cart", options);
      const data = await res.json();
      console.log("Add Itemcart", data);
      dispatch(addItem(data.cart));
    } catch (error) {
      console.log(error);
    }
  };
};

export const RemoveCartItem = (id) => {
  return async function deleteItem(dispatch) {
    const options = {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    try {
      const res = await fetch(`/api/user/cart/${id}`, options);
      const data = await res.json();
      dispatch(removeItem(data.cart));
    } catch (error) {
      console.log(error);
    }
  };
};

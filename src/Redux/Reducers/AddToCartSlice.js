import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = () => {
  let localProduct = localStorage.getItem("CartData");
  if (!localProduct) {
    return [];
  } else {
    return JSON?.parse(localProduct);
  }
};
const AddToCartSlice = createSlice({
  name: "Add_to_Cart",
  initialState: {
    cart: getLocalStorage(),
    total_item: 0,
    total_price: "",
    shipping_fee: 50000,
  },
  reducers: {
    addItem: (state, { payload }) => {
      const { id, color, amount, product } = payload;

      // if same item is present in the Cart

      const findItemInCart = state?.cart?.find((ele) => ele.id === id + color);

      if (findItemInCart) {
        const increaseQuentity = state.cart.map((ele) => {
          if (ele.id === id + color) {
            let newAmount = ele.amount + amount;
            // questity should be greater than stock
            if (newAmount >= ele.max) {
              newAmount = ele.max;
            }
            return { ...ele, amount: newAmount };
          } else {
            return ele;
          }
        });
        state.cart = increaseQuentity;
        // console.log(increaseQuentity, "find");
      } else {
        let productsItemToCart = {
          id: id + color,
          name: product.name,
          color,
          amount,
          price: product.price,
          image: product?.image[0]?.url,
          max: product.stock,
        };
        state.cart = [...state.cart, productsItemToCart];
      }
    },
    // remove item from array
    removeItem: (state, { payload }) => {
      let removeProduct = state.cart.filter(
        (curElem) => curElem.id !== payload
      );
      state.cart = removeProduct;
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


export const  AddItemInCart=(product)=>{
  return async function postItem(dispatch){ 
    // console.log(product)
    const options={
      method:"POST",
      headers:{
        authorization: localStorage.getItem('token')
      },
      body:JSON.stringify({product})
    }
    try {
          const res= await fetch("/api/user/cart",options)
          const data = await res.json()
          console.log("Add Itemcart",data)     
    } catch (error) {
        console.log(error)
    }
  } 
}

export const GetUserCart=()=>{
  return async function getItem(dispatch){
    const options={
      method:"GET",
      headers:{
        authorization: localStorage.getItem('token')
      },
    }
    try {
          const res= await fetch("/api/user/cart",options)
          const data = await res.json()
          console.log("cartItem",data)     
    } catch (error) {
        console.log(error)
    }
  } 
  }


  export const RemoveCartItem=(id)=>{
    return async function deleteItem(dispatch){
      const options={
        method:"DELETE",
        headers:{
          authorization: localStorage.getItem('token')
        },
      }
      try{
        const res= await fetch(`/api/user/cart/${id}`,options)
        const data = await res.json()
        console.log("cartdelete",data,res)   
      }catch(error){
        console.log(error)
      }
    }
  } 
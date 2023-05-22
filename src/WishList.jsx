import React, { useEffect } from 'react'
import { fetchWishlist } from './Redux/Reducers/WishlistSlice'
import { useDispatch, useSelector } from 'react-redux'


 const WishList = () => {
  const dispatch=useDispatch()
  // const {data}=useSelector((state)=>state.WishList)
  useEffect(()=>{
   dispatch(fetchWishlist())
  },[])
  // console.log(data,"check data")
  return (
    <div>WishList</div>
  )
}

export default WishList
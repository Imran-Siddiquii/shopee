import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const Auth = localStorage.getItem("token");
  const {token}=useSelector((state)=>state.Auth)
  return !token || !Auth ? children : <Navigate to="/" />;
};

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.Auth);
  const Auth = localStorage.getItem("token");
  let location = useLocation();
  return token || Auth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

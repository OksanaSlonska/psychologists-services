import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <>{children}</> : <Navigate to="/" />;
};

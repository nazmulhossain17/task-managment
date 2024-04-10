import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser, isLoading } = useSelector((state) => state.user);

  console.log("currentUser:", currentUser);
  console.log("isLoading:", isLoading);

  if (isLoading) {
    return <h1 className="text-3xl">Loading...</h1>;
  }

  return currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;

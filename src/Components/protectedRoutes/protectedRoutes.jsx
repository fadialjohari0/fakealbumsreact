import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

import UserContext from "../../Context/UserContext";

const ProtectedRoutes = ({ component: Component }) => {
  const { userData } = useContext(UserContext);

  return userData ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoutes;

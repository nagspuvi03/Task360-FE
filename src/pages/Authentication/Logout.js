import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { logoutUser } from "../../slices/thunks";
import { useSelector, useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();

  const isUserLogout = useSelector((state) => state.Login.isUserLogout);

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  if (isUserLogout) {
    return <Navigate to="/login" />;
  }

  return <></>;
};

export default Logout;
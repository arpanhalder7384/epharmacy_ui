import React, { useEffect } from "react";
import CheckoutStepper from "../Components/CheckoutStepper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const CheckoutPage = () => {
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate(); // Hook for navigatio

  useEffect(() => {
    if (!userData) { // if user not logged in
      navigate("/")
    }
  }, [userData])


  return (
    <div style={{ padding: "20px" }} >

      <CheckoutStepper />
    </div>
  );
};

export default CheckoutPage;

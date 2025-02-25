import React from "react";
import { CircularProgress, Backdrop } from "@mui/material";
import { useSelector } from "react-redux";

const Loader = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);

  return (
    <Backdrop open={isLoading} style={{ zIndex: 1300, color: "#fff" }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Card, CardContent } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="p-6 shadow-lg rounded-lg text-center max-w-md">
        <CardContent>
          <CheckCircleIcon color="success" style={{ fontSize: "80px" }} />
          <Typography variant="h5" className="mt-4 font-bold">
            Order Placed Successfully!
          </Typography>
          <Typography variant="body1" className="mt-2 text-gray-600">
            Thank you for your purchase. Your order will be delivered soon.
          </Typography>
          <div className="mt-6">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
            >
              Go to Home
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              className="ml-4"
              onClick={() => navigate("/orders")}
            >
              View Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;

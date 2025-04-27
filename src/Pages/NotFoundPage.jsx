import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container } from "@mui/material";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="flex flex-col items-center justify-center h-screen text-center">
      <Typography variant="h2" color="error" className="font-bold">
        404
      </Typography>
      <Typography variant="h5" className="text-gray-700 my-4">
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;

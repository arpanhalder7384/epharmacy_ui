import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
} from "@mui/material";

const steps = ["Delivery Address", "Payment Information"];

const CheckoutStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    pincode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate Delivery Address Step
  const validateAddress = () => {
    let tempErrors = {};
    if (!formData.address.trim()) tempErrors.address = "Address is required";
    if (!formData.city.trim()) tempErrors.city = "City is required";
    if (!/^\d{6}$/.test(formData.pincode)) tempErrors.pincode = "Pincode must be 6 digits";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Validate Payment Step
  const validatePayment = () => {
    let tempErrors = {};
    if (!/^\d{16}$/.test(formData.cardNumber)) tempErrors.cardNumber = "Card number must be 16 digits";
    if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) tempErrors.expiryDate = "Use MM/YY format";
    if (!/^\d{3}$/.test(formData.cvv)) tempErrors.cvv = "CVV must be 3 digits";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Move to Next Step with Validation
  const handleNext = () => {
    if (activeStep === 0 && !validateAddress()) return;
    if (activeStep === 1 && !validatePayment()) return;
    setActiveStep((prevStep) => prevStep + 1);
  };

  // Move to Previous Step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Submit Checkout
  const handleSubmit = () => {
    if(!validatePayment()){
      return
    }
    alert("Order Placed Successfully!");
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <div>
            <Typography variant="h6" gutterBottom>
              Delivery Address
            </Typography>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              margin="normal"
            />
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              error={!!errors.pincode}
              helperText={errors.pincode}
              margin="normal"
            />
          </div>
        )}

        {activeStep === 1 && (
          <div>
            <Typography variant="h6" gutterBottom>
              Payment Information
            </Typography>
            <TextField
              fullWidth
              label="Card Number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              error={!!errors.cardNumber}
              helperText={errors.cardNumber}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Expiry Date (MM/YY)"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              error={!!errors.expiryDate}
              helperText={errors.expiryDate}
              margin="normal"
            />
            <TextField
              fullWidth
              label="CVV"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              error={!!errors.cvv}
              helperText={errors.cvv}
              margin="normal"
            />
          </div>
        )}

        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
          {activeStep > 0 && (
            <Button variant="contained" onClick={handleBack}>
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Place Order
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutStepper;

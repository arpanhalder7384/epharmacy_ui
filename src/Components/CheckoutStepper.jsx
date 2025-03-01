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
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const steps = ["Delivery Address", "Payment Information"];

// Dummy saved cards
const savedCards = [
  { id: 1, cardNumber: "**** **** **** 1234", expiry: "12/26" },
  { id: 2, cardNumber: "**** **** **** 5678", expiry: "09/28" },
];

const CheckoutStepper = () => {
  const navigate = useNavigate();
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
  const [selectedCard, setSelectedCard] = useState(null);
  const [useNewCard, setUseNewCard] = useState(false);

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
    if (!validatePayment()) return;
    navigate("/orderSuccess");
  };

  // Handle selecting a saved card
  const handleCardSelect = (card) => {
    if (selectedCard === card.id) {
      setSelectedCard(null);
      setUseNewCard(false);
      setFormData({ ...formData, cardNumber: "", expiryDate: "", cvv: "" });
    } else {
      setSelectedCard(card.id);
      setUseNewCard(false);
      setFormData({ ...formData, cardNumber: card.cardNumber, expiryDate: card.expiry });
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Button variant="contained" color="secondary" onClick={() => navigate("../cart")}>
        ← Back to Cart
      </Button>
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

        {/* Step 1: Delivery Address */}
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

        {/* Step 2: Payment Information */}
        {activeStep === 1 && (
          <div>
            <Typography variant="h6" gutterBottom>
              Payment Information
            </Typography>

            {/* Saved Cards */}
            <Typography variant="subtitle1" gutterBottom>
              Select a saved card:
            </Typography>
            <Grid container spacing={2}>
              {savedCards.map((card) => (
                <Grid item xs={12} sm={6} key={card.id}>
                  <Card
                    sx={{
                      border: selectedCard === card.id ? "2px solid #1976d2" : "1px solid #ccc",
                      boxShadow: selectedCard === card.id ? "0 4px 8px rgba(25, 118, 210, 0.3)" : "none",
                      padding: "10px",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                    onClick={() => handleCardSelect(card)}
                  >
                    <CardContent>
                      <Typography variant="body1">{card.cardNumber}</Typography>
                      <Typography variant="body2">Expiry: {card.expiry}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* New Card Option */}
            <RadioGroup
              value={useNewCard ? "new" : "saved"}
              onChange={() => {
                setUseNewCard(!useNewCard);
                setSelectedCard(null);
                setFormData({ ...formData, cardNumber: "", expiryDate: "", cvv: "" });
              }}
            >
              <FormControlLabel value="new" control={<Radio />} label="Use a new card" />
            </RadioGroup>

            {/* New Card Form */}
            {useNewCard && (
              <>
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
              </>
            )}
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

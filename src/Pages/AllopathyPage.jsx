import React, { useEffect, useState } from "react";
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
import { fetchCards } from "../services/paymentService";
import { placeOrder } from "../services/orderService";
import { useToast } from "./../utils/ToastProvider";

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
  const customerId = localStorage.getItem("customerId")
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
  const customerDetails = JSON.parse(localStorage.getItem("userData"))
  const showToast = useToast();
  const [cvv, setCvv] = useState('');


  const [cards, setCards] = useState([])

  const [errors, setErrors] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [useNewCard, setUseNewCard] = useState(false);

  useEffect(() => {
    fetchCards(customerId).then((res) => {
      console.log(res.data.cards)
      setCards(res.data.cards)
    }).catch((e) => {

    })
  }, [])

  useEffect(() => {
    if (cartItems.length == 0) {
      navigate("/")
    }
  }, [cartItems])

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
    console.log(tempErrors, "tempErrors")
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  function formatCardNumber(cardNumber) {
    // Ensure the card number is a string to safely manipulate it
    const cardNumberStr = cardNumber.toString();

    // Check if the card number is valid (16 digits)
    if (cardNumberStr.length !== 16) {
      return 'Invalid card number';
    }

    // Replace the first 12 digits with asterisks
    const formattedCardNumber = cardNumberStr.replace(/\d(?=\d{4})/g, '*');

    return formattedCardNumber;
  }

  function formatExpiryDate(expiryDate) {
    const date = new Date(expiryDate);

    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year

    // Format month and year as two digits (e.g., 01, 02)
    const formattedDate = `${month.toString().padStart(2, '0')}/${year}`;

    return formattedDate;
  }

  function convertExpireDateToAPIFormat(expiryDate) {
    console.log(expiryDate, "exp")
    const [month, year] = expiryDate.split('/'); // Split MM/YY
    const fullYear = '20' + year; // Prepend '20' to make it a full year like 2025

    // You can choose the first day of the month or the last day of the month
    const dateString = `${fullYear}-${month}-01`;  // First day of the month
    const date = new Date(dateString); // Create a date object

    return date.toISOString(); // Convert the date object to ISO string format for API
  }

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
  const calculateEachPrice = (price, discountPercent) => {
    if (discountPercent === 0) {
      return price;
    }
    let finelPrice = price * ((100 - discountPercent) / 100)
    return finelPrice.toFixed(2)
  }
  // Submit Checkout
  const handleSubmit = () => {
    if (!validatePayment()) {
      console.log(Object.keys(errors).length, "Here")
      if (Object.keys(errors).length > 0) {
        showToast("Please provide valid card details to proceed.", "error")
        return
      }
      showToast("Please add/select card to proceed.", "error")
      return;
    }
    if(!useNewCard){
      console.log(formData.cvv , cvv)
      console.log(cards,formData)
      if(formData.cvv!=cvv){
        showToast("Please put correct cvv.", "error")
        return;
      }
    }
    const orderDetails = cartItems.map(medicine => ({
      medicineId: medicine.medicineId,
      medicineName: medicine.medicineName,
      quantity: medicine.quantity,
      price: calculateEachPrice(medicine.price, medicine.discountPercent)
    }));
    const totalAmount = cartItems.reduce((total, medicine) => {
      // Calculate the price after applying the discount
      const discountAmount = medicine.price * (medicine.discountPercent / 100);
      const discountedPrice = medicine.price - discountAmount;

      // Calculate the total for this medicine and add it to the total
      return total + (discountedPrice * medicine.quantity);
    }, 0);
    const orderData = {
      "customerId": customerId,
      "deliveryAddress": {
        "addressId": formData.address
      },
      "card": {
        "cardId": formData.cardNumber,
        "cvv": formData.cvv,
        "nameOnCard": customerDetails.customerName,
        "cardType": "DEBIT",
        "expiryDate": convertExpireDateToAPIFormat(formData.expiryDate),
        "customerId": customerId
      },
      "orderDetails": orderDetails,
      "orderValue": totalAmount
    }

    placeOrder(orderData).then((res) => {
      console.log(res.data, "res,data")
      showToast("Order placed successfully.", "success")
      navigate("/orderSuccess");
    }).catch((e) => {
      showToast("Please try after sometime.", "error")
    })
    // 
  };

  useEffect(()=>{
    setCvv("")
  },[selectedCard])

  // Handle selecting a saved card
  const handleCardSelect = (card) => {
    console.log("selectedCard", card)
    // if (selectedCard === card.cardId) {
    //   setSelectedCard(null);
    //   setUseNewCard(false);
    //   setFormData({ ...formData, cardNumber: "", expiryDate: "", cvv: "" });
    // } else {
      setSelectedCard(card.cardId);
      setUseNewCard(false);
      setFormData({ ...formData, cardNumber: card.cardId, expiryDate: formatExpiryDate(card.expiryDate), cvv: card.cvv });
    // }
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
              {cards.map((card) => (
                <Grid item xs={12} sm={6} key={card.id}>
                  <Card
                    sx={{
                      border: selectedCard === card.cardId ? "2px solid #1976d2" : "1px solid #ccc",
                      boxShadow: selectedCard === card.cardId ? "0 4px 8px rgba(25, 118, 210, 0.3)" : "none",
                      padding: "10px",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                    onClick={() => handleCardSelect(card)}
                  >
                    <CardContent>
                      <Typography variant="body1">{formatCardNumber(card.cardId)}</Typography>
                      <Typography variant="body2">Expiry: {formatExpiryDate(card.expiryDate)}</Typography>
                    </CardContent>
                    {card.cardId===selectedCard && <TextField
                      label="CVV"
                      variant="outlined"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      inputProps={{ maxLength: 3 }} // CVV is usually 3 digits
                      type="password" // Hide input for security
                      fullWidth
                    />}
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
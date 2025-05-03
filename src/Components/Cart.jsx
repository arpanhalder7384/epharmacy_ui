import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import { Delete, Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const calculateEachPrice = (price, discountPercent) => {
  if (discountPercent === 0) {
    return price;
  }
  let finelPrice = price * ((100 - discountPercent) / 100)
  return finelPrice.toFixed(2)
}

const Cart = ({ cartItems, updateQuantity, removeItem, handleCheckout }) => {
  
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + calculateEachPrice(item.price, item.discountPercent) * item.quantity, 0);
  const navigate = useNavigate(); // Hook for navigation


  return (

    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <Button variant="contained" color="secondary" onClick={() => navigate("/")}>
        ← Back to Home
      </Button>
      <Typography variant="h4" align="center" gutterBottom>
        🛒 Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography align="center" color="textSecondary">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ mb: 2, p: 2 }}>
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="h6">{item.medicineName}</Typography>
                    <Typography color="textSecondary">₹{calculateEachPrice(item.price, item.discountPercent)} per unit</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton onClick={() => updateQuantity(item.medicineId, Math.max(1, item.quantity - 1))}>
                        <Remove />
                      </IconButton>
                      <Typography variant="h6" style={{ margin: "0 10px" }}>
                        {item.quantity}
                      </Typography>
                      <IconButton onClick={() => updateQuantity(item.medicineId, item.quantity + 1)}>
                        <Add />
                      </IconButton>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">₹{calculateEachPrice(item.price, item.discountPercent) * item.quantity}</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton color="error" onClick={() => removeItem(item.medicineId)}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          <Card sx={{ mt: 2, p: 2 }}>
            <CardContent>
              <Grid container justifyContent="space-between">
                <Typography variant="h5">Total:</Typography>
                <Typography variant="h5">₹{totalPrice}</Typography>
              </Grid>
            </CardContent>
          </Card>

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => handleCheckout()}>
            Proceed to Checkout
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
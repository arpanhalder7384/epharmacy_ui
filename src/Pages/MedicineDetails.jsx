import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Button, Grid, Divider, Container, Chip } from "@mui/material";
import { fetchMedicineById } from "../services/medicineService";
import { hideLoader, showLoader } from "../redux/slices/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../utils/ToastProvider";
import { addToCart } from "../services/cartService";
import medicineImage from "../assets/Medicine-1.jpg"
import { updateItemCount } from "../redux/slices/cartSlice";

const MedicineDetails = () => {
  const showToast = useToast();
  const customerId = localStorage.getItem("customerId") || null;
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData)


  useEffect(() => {
    dispatch(showLoader());
    fetchMedicineById(id) // Page 1, Size 10, Sort by Name (A-Z)
      .then((res) => {
        console.log(res.data)
        setMedicine(res.data);
      })
      .catch((error) => console.error("Error fetching medicines:", error))
      .finally(() => {
        dispatch(hideLoader())
      });
  }, [id]);

  const handleAddToCart = (medicineId) => {
    console.log(medicineId)
    if (!userData) {
      console.log("IF Block")
      navigate("/login")
    } else {
      console.log("Else Block")
      console.log(medicineId, customerId)

      dispatch(showLoader());
      addToCart(customerId, medicineId, 1).then((res) => {
        console.log(res.data)
        dispatch(updateItemCount(res.data.cart.items.length))
        console.log("Item Added to cart")
        showToast("Medicine added to cart!", "success")
      }).catch((error) => {
        showToast("Please try after some time", "error")
        console.error("Error fetching medicines:", error)
      }).finally(() => {
        dispatch(hideLoader())
      });
    }
  }

  // If medicine not found
  if (!medicine) {
    return (
      <Container className="mt-10">
        <Typography variant="h4" color="error">Medicine Not Found</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/")}>
          Go Back Home
        </Button>
      </Container>
    );
  }

  // Calculate Discounted Price
  const discountedPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
  }

  return (
    <div className="w-full">
      <Container className="mt-10">
        <Card className="shadow-lg p-6">
          <Grid container spacing={4}>
            {/* Medicine Image */}
            <Grid item xs={10} md={5}>
              <img src={medicineImage} width="320" />
            </Grid>

            {/* Medicine Details */}
            <Grid item xs={12} md={7}>
              <CardContent>
                <Typography variant="h4" className="font-bold">{medicine.medicineName}</Typography>

                {/* Price and Discount */}
                <Grid container alignItems="center" spacing={2} className="mt-2">
                  <Grid item>
                    <Typography variant="h5" color="primary" className="font-semibold">
                      ₹{discountedPrice(medicine.price, medicine.discountPercent)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" className="text-gray-500 line-through">
                      ₹{medicine.price}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Chip label={`${medicine.discountPercent}% Off`} color="success" />
                  </Grid>
                </Grid>

                <Typography variant="body1" className="mt-2 text-gray-600">{medicine.description}</Typography>

                <Divider className="my-4" />

                <Typography variant="h6" className="font-bold">Uses</Typography>
                <Typography variant="body2">{medicine.uses || "As per doctor advice."}</Typography>

                <Typography variant="h6" className="font-bold mt-3">Dosage</Typography>
                <Typography variant="body2">{medicine.dosage || 2}</Typography>

                <Typography variant="h6" className="font-bold mt-3">Side Effects</Typography>
                <Typography variant="body2">{medicine.sideEffects || "No Side Effect"}</Typography>

                <Typography variant="h6" className="font-bold mt-3">Manufacturer</Typography>
                <Typography variant="body2">{medicine.manufacturer}</Typography>

                <Typography variant="h6" className="font-bold mt-3">Availability</Typography>
                <Typography variant="body2" color={medicine.availableUnits > 0 ? "green" : "red"}>
                  {medicine.availableUnits > 0 ? "Available" : "Not Available"}
                </Typography>

                {/* Available Units */}
                <Typography variant="h6" className="font-bold mt-3">Available Units</Typography>
                <Typography variant="body2">{medicine.availableUnits} units</Typography>

                {/* Expiry Date */}
                <Typography variant="h6" className="font-bold mt-3">Expiry Date</Typography>
                <Typography variant="body2">{medicine.expiryDate}</Typography>

                <Divider className="my-4" />

                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={() => handleAddToCart(medicine.medicineId)}>
                      Add to Cart
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
                      Back
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </div>
  );
};

export default MedicineDetails;

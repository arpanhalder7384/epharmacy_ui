import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Button, Grid, Divider, Container, Chip } from "@mui/material";

import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
const defaultMedicineImage = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Medicine_pills.jpg";


// Dummy medicine data
const medicineData = {
  "1": { name: "Paracetamol", price: 100, image: MedicalServicesIcon,
         description: "Used to treat fever and pain.",
         uses: "Headache, Fever, Body Pain",
         dosage: "Take 1-2 tablets every 6 hours as needed.",
         sideEffects: "Nausea, Liver damage (if overdosed)",
         manufacturer: "ABC Pharma", availability: "In Stock",
         availableUnits: 50, expiryDate: "2026-06-30", discount: 10 },

  "2": { name: "Nux Vomica", price: 120, image: "https://via.placeholder.com/300",
         description: "Homeopathic medicine for digestive issues.",
         uses: "Indigestion, Nausea, Constipation",
         dosage: "5 drops in water before meals.",
         sideEffects: "None reported",
         manufacturer: "XYZ Homeopathy", availability: "Limited Stock",
         availableUnits: 20, expiryDate: "2027-02-10", discount: 15 },

  "3": { name: "Ibuprofen", price: 80, image: "https://via.placeholder.com/300",
         description: "An anti-inflammatory pain reliever.",
         uses: "Muscle Pain, Arthritis, Headache",
         dosage: "Take 1 tablet every 8 hours with food.",
         sideEffects: "Stomach upset, Dizziness",
         manufacturer: "MediCare Ltd.", availability: "In Stock",
         availableUnits: 75, expiryDate: "2025-09-20", discount: 5 },
};

const MedicineDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const medicine = medicineData[id];

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(medicine));
  };

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
  const discountedPrice = (medicine.price - (medicine.price * medicine.discount) / 100).toFixed(2);

  return (
    <Container className="mt-10">
      <Card className="shadow-lg p-6">
        <Grid container spacing={4}>
          {/* Medicine Image */}
          <Grid item xs={12} md={5}>
            <CardMedia 
              component="img" 
              height="300" 
              image={ defaultMedicineImage} 
              alt={medicine.name} 
              className="rounded-lg"
            />
          </Grid>

          {/* Medicine Details */}
          <Grid item xs={12} md={7}>
            <CardContent>
              <Typography variant="h4" className="font-bold">{medicine.name}</Typography>

              {/* Price and Discount */}
              <Grid container alignItems="center" spacing={2} className="mt-2">
                <Grid item>
                  <Typography variant="h5" color="primary" className="font-semibold">
                    ₹{discountedPrice}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" className="text-gray-500 line-through">
                    ₹{medicine.price}
                  </Typography>
                </Grid>
                <Grid item>
                  <Chip label={`${medicine.discount}% Off`} color="success" />
                </Grid>
              </Grid>

              <Typography variant="body1" className="mt-2 text-gray-600">{medicine.description}</Typography>

              <Divider className="my-4" />

              <Typography variant="h6" className="font-bold">Uses</Typography>
              <Typography variant="body2">{medicine.uses}</Typography>

              <Typography variant="h6" className="font-bold mt-3">Dosage</Typography>
              <Typography variant="body2">{medicine.dosage}</Typography>

              <Typography variant="h6" className="font-bold mt-3">Side Effects</Typography>
              <Typography variant="body2">{medicine.sideEffects}</Typography>

              <Typography variant="h6" className="font-bold mt-3">Manufacturer</Typography>
              <Typography variant="body2">{medicine.manufacturer}</Typography>

              <Typography variant="h6" className="font-bold mt-3">Availability</Typography>
              <Typography variant="body2" color={medicine.availability === "In Stock" ? "green" : "red"}>
                {medicine.availability}
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
                  <Button variant="contained" color="primary" onClick={() => alert("Added to Cart")}>
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
  );
};

export default MedicineDetails;

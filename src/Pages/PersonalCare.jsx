import React from "react";
import { Container, Typography, Button, Card, CardContent, Box } from "@mui/material";
import ComingSoonImage from "../assets/coming-soon.svg"; // Add a suitable image

const PersonalCareComingSoon = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      <Card elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="center" mb={3}>
            <img src={ComingSoonImage} alt="Coming Soon" width={200} />
          </Box>
          <Typography variant="h4" gutterBottom fontWeight={600}>
            Personal Care - Coming Soon!
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            We are working hard to bring you the best collection of skincare, haircare, and personal care products. Stay tuned!
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
            Notify Me
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PersonalCareComingSoon;

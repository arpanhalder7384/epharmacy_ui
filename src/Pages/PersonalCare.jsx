import React from "react";
import { Container, Typography, Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";


const PersonalCarePage = () => {
    const navigate = useNavigate(); // Hook for navigation
    return (
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 5, mb: 5 }}>
            <section className="flex justify-start mb-6">
                <Button variant="contained" color="secondary" onClick={() => navigate("/")}>
                    ← Back to Home
                </Button>
            </section>
            <Card elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom fontWeight={600}>
                        Personal Care - Coming Soon!
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        We are working hard to bring you the best collection of skincare, haircare, and personal care products. Stay tuned!
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default PersonalCarePage;
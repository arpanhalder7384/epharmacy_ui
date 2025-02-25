import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Typography variant="h4" className="text-center mb-6">
        Choose Medicine Type
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Allopathy Card */}
        <Card className="shadow-lg">
          <CardContent className="text-center">
            <Typography variant="h5" className="mb-2">
              Allopathy Medicine
            </Typography>
            <Typography variant="body2" className="mb-4">
              Explore modern medicine for various treatments.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/allopathy")}
            >
              View Allopathy
            </Button>
          </CardContent>
        </Card>

        {/* Homeopathy Card */}
        <Card className="shadow-lg">
          <CardContent className="text-center">
            <Typography variant="h5" className="mb-2">
              Homeopathy Medicine
            </Typography>
            <Typography variant="body2" className="mb-4">
              Discover natural remedies with homeopathic medicines.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/homeopathy")}
            >
              View Homeopathy
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;

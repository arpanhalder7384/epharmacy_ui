import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const allopathyMedicines = [
  { id: 1, name: "Paracetamol", category: "Pain Relief", price: "₹50", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Amoxicillin", category: "Antibiotics", price: "₹120", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Ibuprofen", category: "Pain Relief", price: "₹80", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Ciprofloxacin", category: "Antibiotic", price: "₹150", image: "https://via.placeholder.com/150" },
  { id: 5, name: "Metformin", category: "Diabetes", price: "₹90", image: "https://via.placeholder.com/150" },
  { id: 6, name: "Cetirizine", category: "Allergy", price: "₹60", image: "https://via.placeholder.com/150" },
];

const ITEMS_PER_PAGE = 4;

const AllopathyPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate(); // Hook for navigation

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = allopathyMedicines.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(allopathyMedicines.length / ITEMS_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Button variant="contained" color="secondary" onClick={() => navigate("/")}>
        ← Back to Home
      </Button>

      <Typography variant="h4" className="text-center my-6">
        Allopathy Medicines
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((medicine) => (
          <Card key={medicine.id} className="shadow-lg">
            <CardMedia component="img" height="140" image={medicine.image} alt={medicine.name} />
            <CardContent>
              <Typography variant="h6">{medicine.name}</Typography>
              <Typography variant="body2" color="textSecondary">{medicine.category}</Typography>
              <Typography variant="h6" className="text-green-600">{medicine.price}</Typography>
              <Button 
              fullWidth
                  variant="contained" 
                  color="primary" 
                  className="m-4"
                  onClick={() => navigate(`/medicine/${medicine.id}`)}
                >
                  Show Details
                </Button>
              <Button variant="contained" fullWidth className="mt-2" color="success">
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"flex space-x-2"}
          activeClassName={"bg-blue-500 text-white px-3 py-1 rounded"}
          pageClassName={"border px-3 py-1 rounded"}
          previousClassName={"border px-3 py-1 rounded"}
          nextClassName={"border px-3 py-1 rounded"}
          disabledClassName={"text-gray-400"}
        />
      </div>
    </div>
  );
};

export default AllopathyPage;

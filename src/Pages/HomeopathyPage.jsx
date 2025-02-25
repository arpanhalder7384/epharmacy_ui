import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const homeopathyMedicines = [
    { id: 1, name: "Arnica Montana", category: "Pain Relief", price: "₹150", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Nux Vomica", category: "Digestive Health", price: "₹180", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Belladonna", category: "Fever & Cough", price: "₹130", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Rhus Tox", category: "Joint Pain", price: "₹160", image: "https://via.placeholder.com/150" },
    { id: 5, name: "Sulphur", category: "Skin Care", price: "₹200", image: "https://via.placeholder.com/150" },
    { id: 6, name: "Calcarea Carb", category: "Bone Health", price: "₹170", image: "https://via.placeholder.com/150" },
];

const ITEMS_PER_PAGE = 4;

const HomeopathyPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate(); // Hook for navigation


    const [medicines, setMedicines] = useState(homeopathyMedicines);
    const [sortType, setSortType] = useState(""); // Store selected sort type

    const offset = currentPage * ITEMS_PER_PAGE;
    const currentItems = medicines.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(medicines.length / ITEMS_PER_PAGE);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleSort = (type) => {
        let sortedMedicines = [...medicines];
        console.log(type)
        switch (type) {
            case "price-high-low":
                sortedMedicines.sort((a, b) => b.price - a.price);
                break;
            case "price-low-high":
                sortedMedicines.sort((a, b) => a.price - b.price);
                break;
            case "name-a-z":
                sortedMedicines.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-z-a":
                sortedMedicines.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        setSortType(type);
        setMedicines(sortedMedicines);
    };


    return (
        <div className="max-w-6xl mx-auto p-6">
            <Button variant="contained" color="secondary" onClick={() => navigate("/")}>
                ← Back to Home
            </Button>

            <Typography variant="h4" className="text-center my-6">
                Homeopathy Medicines
            </Typography>

            {/* Sort Dropdown */}
            <div className="mb-4">
                <label className="mr-2">Sort by:</label>
                <select
                    className="border p-2 rounded"
                    value={sortType}
                    onChange={(e) => handleSort(e.target.value)}
                >
                    <option value="">Select</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="name-a-z">Name: A to Z</option>
                    <option value="name-z-a">Name: Z to A</option>
                </select>
            </div>

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
                                onClick={() => navigate(`/medicineDetails/${medicine.id}`)}
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

export default HomeopathyPage;

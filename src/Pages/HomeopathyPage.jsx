import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import SortDropDown from "../Components/SortDropDown";
import { fetchMedicines } from "../services/medicineService";
import { hideLoader, showLoader } from "../redux/slices/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../services/cartService";
import { useToast } from "./../utils/ToastProvider";
import { updateItemCount } from "../redux/slices/cartSlice";



const ITEMS_PER_PAGE = 6;

const HomeopathyPage = () => {
    const showToast = useToast();
    const userData = useSelector((state) => state.user.userData)
    const customerId = localStorage.getItem("customerId") || null;

    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate(); // Hook for navigation
    const [homeopathyMedicines, setHomeopathyMedicines] = useState([])
    const dispatch = useDispatch();
    const offset = currentPage * ITEMS_PER_PAGE;
    const currentItems = homeopathyMedicines.slice(offset, offset + ITEMS_PER_PAGE);
    const [pageCount, setPageCount] = useState(0)
    const [sortType, setSortType] = useState("name")
    const [sortOrder, setSortOrder] = useState("asc")

    useEffect(() => {
        dispatch(showLoader());
        fetchMedicines(currentPage + 1, ITEMS_PER_PAGE, "Homeopathy", sortType, sortOrder) // Page 1, Size 10, Sort by Name (A-Z)
            .then((res) => {
                console.log(res.data.medicines)
                setPageCount(res.data.total / ITEMS_PER_PAGE)
                setHomeopathyMedicines(res.data.medicines);
            })
            .catch((error) => console.error("Error fetching medicines:", error))
            .finally(() => {
                dispatch(hideLoader())
            });
    }, [currentPage, sortOrder, sortType]);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const viewDetails = (medicineId) => {
        navigate(`/medicineDetails/${medicineId}`)
    }

    const handleAddToCart = (medicineId) => {
        console.log(userData)
        console.log("clicked")
        if (!userData) {
            navigate("/login")
        } else {
            dispatch(showLoader());
            addToCart(customerId, medicineId, 1).then((res) => {
                console.log(res.data)
                dispatch(updateItemCount(res.data.cart.items.length))
                console.log("Item Added to cart")
                showToast("Medicine added to cart!", "success")
            }).catch((error) => {
                showToast("Please try after some time", "error")
                console.error("Error fetching medicines:", error)
            })
                .finally(() => {
                    dispatch(hideLoader())
                });
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <section className="flex justify-between mb-6">
                <Button variant="contained" color="secondary" onClick={() => navigate("/")}>
                    ← Back to Home
                </Button>

                <Typography variant="h4" className="text-center my-6">
                    Homeopathy Medicines
                </Typography>
                <SortDropDown setSortType={setSortType} setSortOrder={setSortOrder} />
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {homeopathyMedicines.map((medicine) => (
                    <Card key={medicine.id} className="shadow-lg">
                        <CardMedia component="img" height="140" image={medicine.image} alt={medicine.name} />
                        <CardContent>
                            <Typography variant="h6">{medicine.medicineName}</Typography>
                            <Typography variant="body2" color="textSecondary">{medicine.category}</Typography>
                            <Typography variant="h6" className="text-green-600">{medicine.price}</Typography>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="m-4"
                                onClick={() => viewDetails(medicine.medicineId)}
                            >
                                Show Details
                            </Button>
                            <Button variant="contained" fullWidth className="mt-2" color="success" onClick={() => handleAddToCart(medicine.medicineId)}>
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

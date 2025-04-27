import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./../utils/ToastProvider";
import { fetchOrders } from "../services/orderService";
import { hideLoader, showLoader } from '../redux/slices/loaderSlice';
import { logout } from "../redux/slices/userSlice";

// Function to return colored status chip
const getStatusChip = (status) => {
    let color;
    switch (status) {
        case "Pending":
            color = "warning";
            break;
        case "Shipped":
            color = "primary";
            break;
        case "Delivered":
            color = "success";
            break;
        case "Canceled":
            color = "error";
            break;
        default:
            color = "default";
    }
    return <Chip label={status} color={color} />;
};

const OrderPage = () => {
    const showToast = useToast();
    const userData = useSelector((state) => state.user.userData);
    const [orders, setOrders] = useState([])
    const navigate = useNavigate(); // Hook for navigation
    const customerId = localStorage.getItem("customerId") || null;
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(showLoader());
        fetchOrders(customerId).then(res => {

            let orderList = res.data.orders;
            if (!orderList || orderList.length === 0) {
                return;
            }
            setOrders(orderList.reverse())
        }).catch(e => {            
            if (e.status && (e.status == 401 || e.status == 403)) {
                dispatch(logout())
                return 
            }
            showToast("Unable to fetch order details. Please Retry.", "error")
        }).finally(() => {
            dispatch(hideLoader())
        })
    }, [])

    useEffect(() => {
        if (!userData) { // if user not logged in
            navigate("/")
        }
    }, [userData])

    return (
        <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
            <Button variant="contained" color="secondary" onClick={() => navigate("/")}>
                ← Back to Home
            </Button>
            <Typography variant="h4" gutterBottom>
                My Orders
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Serial No</strong></TableCell>
                            <TableCell><strong>Date</strong></TableCell>
                            <TableCell><strong>Total</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            {/* <TableCell><strong>Action</strong></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order, index) => (
                            <TableRow key={order.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{order.createdAt}</TableCell>
                                <TableCell>{order.orderValue.toFixed(2)}</TableCell>
                                <TableCell>{getStatusChip(order.orderStatus)}</TableCell>
                                {/* <TableCell>
                                    <Button variant="contained" color="primary" size="small">
                                        View Details
                                    </Button>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default OrderPage;

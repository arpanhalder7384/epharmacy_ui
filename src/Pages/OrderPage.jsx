import React from "react";
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

const orders = [
    {
        id: "ORD12345",
        date: "2025-02-23",
        items: "Paracetamol, Cough Syrup",
        total: "₹500",
        status: "Pending",
    },
    {
        id: "ORD12346",
        date: "2025-02-22",
        items: "Vitamin C, Pain Relief Gel",
        total: "₹700",
        status: "Shipped",
    },
    {
        id: "ORD12347",
        date: "2025-02-21",
        items: "Antibiotics, Health Supplement",
        total: "₹1200",
        status: "Delivered",
    },
    {
        id: "ORD12348",
        date: "2025-02-20",
        items: "First Aid Kit, Sanitizer",
        total: "₹800",
        status: "Canceled",
    },
];

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

    const navigate = useNavigate(); // Hook for navigation

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
                            <TableCell><strong>Order ID</strong></TableCell>
                            <TableCell><strong>Date</strong></TableCell>
                            <TableCell><strong>Items</strong></TableCell>
                            <TableCell><strong>Total</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.items}</TableCell>
                                <TableCell>{order.total}</TableCell>
                                <TableCell>{getStatusChip(order.status)}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" size="small">
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default OrderPage;

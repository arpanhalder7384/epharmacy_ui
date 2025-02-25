import React, { useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// Sample order object

const getCurrentDate = () => {
    const today = new Date();


    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
    const day = String(today.getDate()).padStart(2, '0');

    return `${day}-${month}-${year}`;
};


const OrderSuccess = () => {
    const navigate = useNavigate();

    // Calculate the total price
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []

    useEffect(() => {
        console.log(cartItems)
        if (cartItems.length == 0) {
            console.log("Here", cartItems)
            navigate("/")
        }
    }, [cartItems])

    const calculateTotalPrice = (medicines) => {
        if (!medicines) {
            return 0;
        }
        return medicines.reduce((total, medicine) => {
            return total + (medicine.quantity * medicine.price);
        }, 0);
    };
    let order = {
        orderDate: getCurrentDate(),
        medicines: cartItems.map(medicine => ({
            name: medicine.medicineName,
            quantity: medicine.quantity,
            price: medicine.price
        }))
    };

    useEffect(() => {
        return () => {
            localStorage.removeItem("cartItems")
        }
    }, [])

    const totalPrice = calculateTotalPrice(order.medicines);

    return (
        <Container maxWidth="sm" style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom align="center">
                Order Success
            </Typography>
            <Typography variant="h6" gutterBottom>
                Order Date: {order.orderDate}
            </Typography>

            <Typography variant="h5" gutterBottom>
                Order Details:
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Medicine Name</strong></TableCell>
                            <TableCell align="right"><strong>Quantity</strong></TableCell>
                            <TableCell align="right"><strong>Price per Medicine</strong></TableCell>
                            <TableCell align="right"><strong>Total Price</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.medicines && order.medicines.map((medicine, index) => (
                            <TableRow key={index}>
                                <TableCell>{medicine.name}</TableCell>
                                <TableCell align="right">{medicine.quantity}</TableCell>
                                <TableCell align="right">${medicine.price.toFixed(2)}</TableCell>
                                <TableCell align="right">${(medicine.quantity * medicine.price).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h6" style={{ marginTop: '20px' }}>
                Total Price: <strong>{totalPrice.toFixed(2)}</strong>
            </Typography>

            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                fullWidth
                onClick={() => navigate("/")}
            >
                Go to Homepage
            </Button>
        </Container>
    );
};




export default OrderSuccess;

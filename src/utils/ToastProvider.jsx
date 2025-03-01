import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

// Create Context for Toast
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({
        open: false,
        message: "",
        severity: "success", // success, error, warning, info
    });

    // Function to show toast
    const showToast = (message, severity = "success") => {
        setToast({ open: true, message, severity });
    };

    // Function to close toast
    const handleClose = () => {
        setToast({ ...toast, open: false });
    };

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <Snackbar
                open={toast.open}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={handleClose} severity={toast.severity} variant="filled">
                    {toast.message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
};

// Custom hook to use toast
export const useToast = () => {
    return useContext(ToastContext);
};

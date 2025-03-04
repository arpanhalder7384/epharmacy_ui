import React, { useState } from "react";
import { Card, CardContent, TextField, Button, Typography } from "@mui/material";

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    // Validate Password Change Form
    const validateForm = () => {
        let tempErrors = {};
        if (!formData.currentPassword) tempErrors.currentPassword = "Current password is required";
        if (formData.newPassword.length < 6) tempErrors.newPassword = "Password must be at least 6 characters";
        if (formData.newPassword !== formData.confirmPassword) tempErrors.confirmPassword = "Passwords do not match";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Simulate API call
        setTimeout(() => {
            setSuccessMessage("Password changed successfully!");
            setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        }, 1000);
    };

    return (
        <div style={{ maxWidth: "900px", margin: "auto", padding: "40px" }} className="flex  flex-col justify-center">
            <Button className="w-48" variant="contained" color="secondary" onClick={() => { }}>
                ← Back to Home
            </Button>
            <Typography variant="h4" gutterBottom>
                Change Password
            </Typography>
            <Card className="w-full  shadow-lg">
                <CardContent className="p-6">
                    <Typography variant="h5" className="text-center mb-4 font-semibold">
                        Change Password
                    </Typography>

                    {successMessage && (
                        <Typography variant="body2" className="text-green-600 text-center mb-3">
                            {successMessage}
                        </Typography>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TextField
                            fullWidth
                            label="Current Password"
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            error={!!errors.currentPassword}
                            helperText={errors.currentPassword}
                        />

                        <TextField
                            fullWidth
                            label="New Password"
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword}
                        />

                        <TextField
                            fullWidth
                            label="Confirm New Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                        />

                        <Button variant="contained" color="primary" fullWidth type="submit">
                            Update Password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChangePassword;

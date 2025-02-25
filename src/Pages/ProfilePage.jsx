import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Grid, Avatar, Divider } from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        mobile: "9876543210",
        gender: "Male",
        address: "123 Street, Kolkata, India",
    });

    const navigate = useNavigate(); // Hook for navigation

    const [editMode, setEditMode] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(user);

    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setUser(updatedUser);
        setEditMode(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 flex flex-col">
            <div className=" flex items-start pb-10">
                <Button variant="contained" color="secondary" onClick={() => navigate("/")}>
                    ← Back to Home
                </Button>
            </div>

            {/* Profile Card */}
            <Card className="w-full shadow-xl rounded-lg p-6 bg-white">
                <CardContent>
                    <div className="flex flex-col items-center">
                        {/* Profile Avatar */}
                        <Avatar sx={{ width: 80, height: 80, bgcolor: "#3b82f6" }}>J</Avatar>
                        <Typography variant="h5" className="mt-3 font-semibold text-gray-700">
                            {user.name}
                        </Typography>
                        <Typography variant="body2" className="text-gray-500">
                            {user.email}
                        </Typography>
                    </div>

                    <Divider className="my-4" />

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                name="name"
                                fullWidth
                                value={updatedUser.name}
                                onChange={handleChange}
                                disabled={!editMode}
                                className="rounded-md"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Email"
                                name="email"
                                fullWidth
                                value={updatedUser.email}
                                disabled
                                className="rounded-md"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Mobile Number"
                                name="mobile"
                                fullWidth
                                value={updatedUser.mobile}
                                onChange={handleChange}
                                disabled={!editMode}
                                className="rounded-md"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Gender"
                                name="gender"
                                fullWidth
                                value={updatedUser.gender}
                                onChange={handleChange}
                                disabled={!editMode}
                                className="rounded-md"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Address"
                                name="address"
                                fullWidth
                                multiline
                                rows={2}
                                value={updatedUser.address}
                                onChange={handleChange}
                                disabled={!editMode}
                                className="rounded-md"
                            />
                        </Grid>
                    </Grid>

                    <div className="flex justify-end mt-6 space-x-3">
                        {editMode ? (
                            <>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<Cancel />}
                                    onClick={() => setEditMode(false)}
                                    className="bg-red-500 hover:bg-red-700 text-white"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Save />}
                                    onClick={handleSave}
                                    className="bg-green-500 hover:bg-green-700 text-white"
                                >
                                    Save Changes
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Edit />}
                                onClick={() => setEditMode(true)}
                                className="bg-blue-500 hover:bg-blue-700 text-white"
                            >
                                Edit Profile
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePage;

import React, { useEffect, useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Grid, Avatar, Divider, MenuItem } from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./../utils/ToastProvider";
import { updateUserProfile } from '../services/userService';
import { hideLoader, showLoader } from '../redux/slices/loaderSlice';
import { setUserData } from "../redux/slices/userSlice";


const ProfilePage = () => {
    const dispatch = useDispatch();
    const showToast = useToast();
    const customerId = localStorage.getItem("customerId")
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.userData);

    const [user, setUser] = useState({
        customerName: userData?.customerName,
        customerEmailId: userData?.customerEmailId,
        contactNumber: userData?.contactNumber,
        gender: userData?.gender
    });
    const [editMode, setEditMode] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(user);

    useEffect(() => {
        if (!userData) { // if user not logged in
            navigate("/")
        }
    }, [userData])

    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const validateMobileNumber = (mobile) => {
        console.log("mobile", mobile)
        if (!mobile) return "Mobile number is required!";

        // Must be exactly 10 digits and start with 6, 7, 8, or 9
        const mobileRegex = /^[6789][0-9]{9}$/;
        return mobileRegex.test(mobile) ? "" : "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9!";
    };

    const handleSave = () => {
        if (validateMobileNumber(updatedUser.contactNumber) !== "") {
            showToast("Invalid Email or Mobile Number. Please provide valid input", "error")
            return;
        }
        const updateProfiledata = {
            "customerName": updatedUser.customerName,
            "contactNumber": updatedUser.contactNumber,
            "gender": updatedUser.gender
        }
        dispatch(showLoader());
        updateUserProfile(updateProfiledata, customerId).then((res) => {
            setUser(updatedUser);
            setEditMode(false);
            showToast("User updated successfully", "success")
            console.log(updatedUser, "updatedUser")
            localStorage.setItem("userData", JSON.stringify(updatedUser))
            dispatch(setUserData(updatedUser))
        }).catch((e) => {

        }).finally(() => {
            dispatch(hideLoader());
        })

    };

    return (
        <div className="max-w-3xl mx-auto p-6 flex flex-col">
            <div className=" flex items-start pb-10">
                <Button variant="contained" color="secondary" onClick={() => navigate("/")}>
                    ← Back to Home
                </Button>
            </div>

            {/* Profile Card */}
            <Card className="w-full shadow-xl rounded-lg pb-6 bg-white px-6">
                <CardContent>
                    <div className="flex flex-col items-center mb-10">
                        {/* Profile Avatar */}
                        <Avatar sx={{ width: 80, height: 80, bgcolor: "#3b82f6" }}>J</Avatar>
                        <Typography variant="h5" className="mt-3 font-semibold text-gray-700">
                            {user.name}
                        </Typography>
                    </div>

                    <Divider className="my-4" />

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                name="customerName"
                                fullWidth
                                value={updatedUser.customerName}
                                onChange={handleChange}
                                disabled={!editMode}
                                className="rounded-md"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Email"
                                name="customerEmailId"
                                fullWidth
                                onChange={handleChange}
                                value={updatedUser.customerEmailId}
                                disabled
                                className="rounded-md"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Mobile Number"
                                name="contactNumber"
                                fullWidth
                                value={updatedUser.contactNumber}
                                onChange={handleChange}
                                disabled={!editMode}
                                className="rounded-md"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Gender"
                                name="gender"
                                value={updatedUser.gender}
                                onChange={handleChange}
                                disabled={!editMode}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>
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

import { useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Button, TextField, InputAdornment, IconButton, MenuItem } from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";

export default function SignUp() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    mobileNumber: "",
    dateOfBirth: "",
    address: "",
    pincode: "",
    state: "",
    country: "",
    city: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Password validation conditions
  const passwordValidations = [
    { regex: /[a-z]/, message: "Must contain at least 1 lowercase!" },
    { regex: /[A-Z]/, message: "Must contain at least 1 uppercase!" },
    { regex: /[0-9]/, message: "Must contain at least 1 digit!" },
    { regex: /[\W_]/, message: "Must contain at least 1 special character!" },
    { regex: /.{7,}/, message: "Must be at least 7 characters!" },
    { regex: /^.{7,20}$/, message: "Must be at most 20 characters!" },
  ];

  useEffect(() => {
    validateStep1();
    validateStep2();
  }, [])


  // Validate Step 1
  const validateStep1 = () => {
    let newErrors = {};
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;

    const mobileError = validateMobileNumber(formData.mobileNumber);
    if (mobileError) newErrors.mobileNumber = mobileError;

    if (!formData.gender) newErrors.gender = "Gender is required!";
    if (!formData.mobileNumber || formData.mobileNumber.length !== 10) newErrors.mobileNumber = "Enter a valid 10-digit number!";

    const emailError = validEmailId(formData.email);
    if (emailError) newErrors.email = emailError;

    const dobError = validateDOB(formData.dateOfBirth);
    if (dobError) newErrors.dateOfBirth = dobError;

    const invalidPassword = passwordValidations.some(rule => !rule.regex.test(formData.password));
    if (invalidPassword) newErrors.password = "Please provide a valid password!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const validateStep2 = () => {
    let newErrors = {};
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!/^[0-9]{6}$/.test(formData.pincode)) newErrors.pincode = "Invalid pincode";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (formData.city.trim().length <= 3) newErrors.city = "City is required";
    if (formData.country.trim().length <= 3) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateName = (name) => {
    if (!name) return "Name is required!";

    // Check if the name has at least one space and is at least 6 characters long
    const nameRegex = /^(?=.*\s).{6,}$/;
    return nameRegex.test(name) ? "" : "Name should be contain only alphabets and altease single space between word";
  };

  const validateMobileNumber = (mobile) => {
    if (!mobile) return "Mobile number is required!";

    // Must be exactly 10 digits and start with 6, 7, 8, or 9
    const mobileRegex = /^[6789][0-9]{9}$/;
    return mobileRegex.test(mobile) ? "" : "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9!";
  };



  function validEmailId(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email) ? "" : "Email id should be in valid format (example: example@gmail.com";
  }

  // Handle Next Step
  const handleNext = () => {
    if (activeStep === 0 && !validateStep1()) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleSubmit = () => {
    if (activeStep === 1 && !validateStep2()) return;
    setActiveStep((prev) => prev + 1);
  };

  // Handle Back Step
  const handleBack = () => setActiveStep((prev) => prev - 1);


  const validateDOB = (dob) => {
    if (!dob) return "Date of Birth is required!";

    const birthDate = new Date(dob);
    const today = new Date();


    // Check if the date is in the future
    if (birthDate > today) return "Date of Birth cannot be in the future!";

    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Adjust age if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      return age - 1 >= 18 ? "" : "You must be at least 18 years old!";
    }

    return age >= 18 ? "" : "You must be at least 18 years old!";
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 border rounded-lg shadow-lg">
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step><StepLabel>Personal Info</StepLabel></Step>
        <Step><StepLabel>Address Info</StepLabel></Step>
      </Stepper>

      {activeStep === 0 && (
        <div className="mt-4 space-y-3">
          <TextField
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email ID"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            margin="normal"
            error={!!errors.gender}
            helperText={errors.gender}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            label="Mobile Number"
            fullWidth
            value={formData.mobileNumber}
            onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
            error={!!errors.mobileNumber}
            helperText={errors.mobileNumber}
          />

          <TextField
            fullWidth
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth}

          />

          {/* Password Input with Validation */}
          <TextField
            label="Password"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className="text-gray-500" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className="mt-2">
            {passwordValidations.map((rule, index) => (
              <p key={index} className={`text-sm flex items-center gap-2 ${rule.regex.test(formData.password) ? "text-green-600" : "text-red-600"}`}>
                {rule.regex.test(formData.password) ? "✅" : "❌"} {rule.message}
              </p>
            ))}
          </div>
        </div>
      )}

      {activeStep === 1 && (
        <div className="mt-4 space-y-3">
          <TextField
            label="Address"
            fullWidth
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            error={!!errors.address}
            helperText={errors.address}
          />
          <TextField
            label="City"
            fullWidth
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            error={!!errors.city}
            helperText={errors.city}
          />
          <TextField
            label="Pincode"
            fullWidth
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            error={!!errors.pincode}
            helperText={errors.pincode}
          />
          <TextField
            label="State"
            fullWidth
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            error={!!errors.state}
            helperText={errors.state}
          />
          <TextField
            label="Country"
            fullWidth
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            error={!!errors.country}
            helperText={errors.country}
          />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-4 flex justify-between">
        <Button onClick={handleBack} disabled={activeStep === 0} variant="contained">Back</Button>
        {activeStep < 1 ? (
          <Button onClick={handleNext} variant="contained" color="primary">Next</Button>
        ) : (
          <Button onClick={handleSubmit} variant="contained" color="success">Submit</Button>
        )}
      </div>
    </div>
  );
}

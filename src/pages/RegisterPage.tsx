import React, { useState } from "react";
import Layout from "../components/common/Layout";
import { User, UserRole } from "../utils/types";
import { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { registerUser } from "../slices/authSlice";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";

const VendorRegisterPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: UserRole.vendor,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required.";
    else if (!/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber =
        "Invalid phone number. (Write phone number without 0 and country Code)";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await dispatch(registerUser(formData));
        toast.success("Vendor registration successful!");
        navigate("/vendor-dashboard");
      } catch (error) {
        toast.error("Registration failed. Please try again.");
      }
    } else {
      toast("Please fix the errors before submitting.", { icon: "⚠️" });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/vendor-dashboard" />;
  }

  return (
    <Layout>
      <div className="vendor-register-container">
        <h2>Vendor Registration</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          <button type="submit" className="btn btn-primary">
            {isLoading ? <DotLoader /> : "Register as Vendor"}
          </button>
        </form>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </Layout>
  );
};

export default VendorRegisterPage;

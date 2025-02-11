import React, { useState } from "react";
import Layout from "../components/common/Layout";
import { User, UserRole } from "../utils/types";
import { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { registerUser } from "../slices/authSlice";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";

const RegisterPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: UserRole.customer,
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
        toast.success("Registration successful! Welcome aboard!");
        navigate("/");
      } catch (error) {
        toast.error("Registration failed. Please try again.");
      }
    } else {
      toast("Please fix the errors before submitting.", { icon: "⚠️" });
    }
  };
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <Layout>
      <div className="sticky-header-next-sec ec-breadcrumb section-space-mb">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row ec_breadcrumb_inner">
                <div className="col-md-6 col-sm-12">
                  <h2 className="ec-breadcrumb-title">Register</h2>
                </div>
                <div className="col-md-6 col-sm-12">
                  <ul className="ec-breadcrumb-list">
                    <li className="ec-breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="ec-breadcrumb-item active">Register</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="ec-page-content section-space-p">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="section-title">
                <h2 className="ec-bg-title">Register</h2>
                <h2 className="ec-title">Register</h2>
                <p className="sub-title mb-3">
                  Best place to buy and sell digital products
                </p>
              </div>
            </div>
            <div className="ec-register-wrapper">
              <div className="ec-register-container">
                <div className="ec-register-form">
                  <form onSubmit={handleSubmit}>
                    <span className="ec-register-wrap ec-register-half">
                      <label>First Name*</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p
                          className="error text-danger "
                          style={{ marginTop: -20, marginBottom: 10 }}
                        >
                          {errors.firstName}
                        </p>
                      )}
                    </span>
                    <span className="ec-register-wrap ec-register-half">
                      <label>Last Name*</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p
                          className="error text-danger "
                          style={{ marginTop: -20, marginBottom: 10 }}
                        >
                          {errors.lastName}
                        </p>
                      )}
                    </span>
                    <span className="ec-register-wrap ec-register-half">
                      <label>Email*</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p
                          className="error text-danger "
                          style={{ marginTop: -20, marginBottom: 10 }}
                        >
                          {errors.email}
                        </p>
                      )}
                    </span>
                    <span className="ec-register-wrap ec-register-half">
                      <label>Phone Number*</label>
                      <div className="input-group d-flex flex-nowrap">
                        <button
                          className="btn btn-secondary"
                          disabled
                          style={{
                            width: "auto",
                            margin: 0,
                            height: "45px",
                          }}
                        >
                          +91
                        </button>
                        <input
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className="form-control"
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p
                          className="error text-danger "
                          style={{ marginTop: -20, marginBottom: 10 }}
                        >
                          {errors.phoneNumber}
                        </p>
                      )}
                    </span>

                    <span className="ec-register-wrap ec-register-half">
                      <label>Password*</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                      />
                      {errors.password && (
                        <p
                          className="error text-danger "
                          style={{ marginTop: -20, marginBottom: 10 }}
                        >
                          {errors.password}
                        </p>
                      )}
                    </span>
                    <span className="ec-register-wrap ec-register-half">
                      <label>Confirm Password*</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                      />
                      {errors.confirmPassword && (
                        <p
                          className="error text-danger "
                          style={{ marginTop: -20, marginBottom: 10 }}
                        >
                          {errors.confirmPassword}
                        </p>
                      )}
                    </span>
                    <span className="ec-register-wrap ec-register-btn">
                      <button className="btn btn-primary" type="submit">
                        {isLoading ? <DotLoader /> : "Register"}
                      </button>
                    </span>
                    <p className="mt-3 text-center">
                      Already have an account?{" "}
                      <Link to="/login" className="text-primary">
                        Login here
                      </Link>
                    </p>
                  </form>{" "}
                  {error && <div className="alert alert-danger">{error}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;

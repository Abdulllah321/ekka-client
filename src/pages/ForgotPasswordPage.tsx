import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../store";
import { Link, useNavigate } from "react-router";
import { requestPasswordReset } from "../slices/authSlice";
import Logo from "../assets/images/logo/logo.png";
import Layout from "../components/common/Layout";
import toast from "react-hot-toast";
import CryptoJS from "crypto-js";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(requestPasswordReset(email)).unwrap();
      const encryptedEmail = CryptoJS.AES.encrypt(
        email,
        import.meta.env.VITE_SECRET_KEY
      ).toString();
      const encodedEmail = encodeURIComponent(encryptedEmail);
      navigate(`/verify-otp/${encodedEmail}`);
    } catch (error) {
      toast.error("Failed to send password reset email. Please try again.");
    }
  };

  const LayoutComp = isAuthenticated ? Layout : "div";

  return (
    <LayoutComp>
      <div className="forgot-password" id="body">
        <div
          className=" d-flex align-items-center justify-content-center  pt-24px pb-24px"
          style={{
            minHeight: "100vh",
            background: "#f1f1f1",
          }}
        >
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-10">
              <div className="card">
                <div className="card-header bg-primary-1">
                  <div className="ec-brand" style={{ textAlign: "center" }}>
                    <Link to="/" title="Ekka">
                      <img
                        className="ec-brand-icon"
                        src={Logo}
                        alt="Ekka Logo"
                      />
                    </Link>
                  </div>
                </div>
                <div className="card-body p-5">
                  <h4 className="text-dark mb-5">Sign In</h4>
                  <form onSubmit={handleForgotPassword}>
                    <div className="row">
                      <div className="form-group col-md-12 mb-4">
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Enter Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-12">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block mb-4"
                          disabled={isLoading} // Disable button when loading
                        >
                          {isLoading ? "Signing In..." : "Sign In"}
                        </button>
                      </div>
                    </div>
                  </form>
                  {error && (
                    <div className="alert alert-danger">
                      {typeof error === "string" ? error : error?.message}
                    </div>
                  )}{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutComp>
  );
};

export default LoginPage;

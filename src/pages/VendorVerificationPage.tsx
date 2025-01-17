import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/common/Layout";
import Breadcrumbs from "../components/common/BreadCrumbs";
import { useAppSelector } from "../store";
import { socket } from "../App";
import { useNavigate } from "react-router-dom";

const VerifyVendor = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState<number>(0); // Timer in seconds
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const email = useAppSelector((state) => state.auth.user?.email);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for real-time updates from the server
    socket.on("statusUpdate", (status: string) => {
      setStatusMessage(status);
    });

    return () => {
      socket.off("statusUpdate");
    };
  }, []);

  // Load OTP expiry time and resend cooldown from localStorage if available
  useEffect(() => {
    const otpExpiryTime = localStorage.getItem("otpExpiryTime");
    const resendCooldownTime = localStorage.getItem("resendCooldown");

    if (otpExpiryTime) {
      const expiryTime = parseInt(otpExpiryTime, 10);
      const currentTime = Date.now();
      if (expiryTime > currentTime) {
        setTimer(Math.floor((expiryTime - currentTime) / 1000)); // Set remaining time in seconds
        const interval = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        localStorage.removeItem("otpExpiryTime");
      }
    }

    if (resendCooldownTime) {
      const cooldownTime = parseInt(resendCooldownTime, 10);
      const currentTime = Date.now();
      if (cooldownTime > currentTime) {
        setResendCooldown(Math.floor((cooldownTime - currentTime) / 1000));
        const interval = setInterval(() => {
          setResendCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        localStorage.removeItem("resendCooldown");
      }
    }
  }, []);

  const handlePasswordVerification = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);
      setError(null);

      const response = await axios.post("/vendor/verify-password", {
        password,
      });
      setMessage(response.data.message);
      setIsOtpSent(true);

      // Set OTP expiry time in localStorage (15 minutes from now)
      const otpExpiryTime = Date.now() + 15 * 60 * 1000;
      localStorage.setItem("otpExpiryTime", otpExpiryTime.toString());

      // Set timer for OTP expiration
      setTimer(15 * 60); // 15 minutes in seconds
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Error verifying password");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    try {
      setLoading(true);
      setMessage(null);
      setError(null);

      const response = await axios.post("/vendor/verify-otp", {
        otpCode: otp,
        email,
      });
      navigate("/vendor/dashboard");
      setMessage(response.data.message);
    } catch (error: any) {
      setError(error.response?.data?.message || "Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      setMessage(null);
      setError(null);

      const response = await axios.post("/vendor/send-otp", {
        email,
      });
      setMessage(response.data.message);

      // Set resend cooldown time in localStorage (30 seconds from now)
      const resendCooldownTime = Date.now() + 30 * 1000;
      localStorage.setItem("resendCooldown", resendCooldownTime.toString());

      // Set cooldown timer for resend
      setResendCooldown(30); // 30 seconds cooldown
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Error resending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Breadcrumbs />
      <div
        className="row justify-content-center"
        style={{ marginTop: "40px", marginBottom: "40px" }}
      >
        <div className="col-md-6">
          <div
            className="card"
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px",
            }}
          >
            <div className="card-header">
              <h3 className="text-center" style={{ fontSize: "24px" }}>
                Vendor Verification
              </h3>
            </div>
            <div className="card-body">
              {" "}
              {statusMessage && (
                <div
                  className="alert alert-info mt-3"
                  style={{ fontSize: "14px", color: "#5bc0de" }}
                >
                  {statusMessage}
                </div>
              )}
              {!isOtpSent && (
                <>
                  <div className="form-group">
                    <label
                      htmlFor="password"
                      style={{
                        fontWeight: "600",
                        marginBottom: "5px",
                        marginTop: "10px",
                      }}
                    >
                      Enter your password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading || isOtpSent}
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        padding: "10px",
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="confirmPassword"
                      style={{
                        fontWeight: "600",
                        marginBottom: "5px",
                        marginTop: "10px",
                      }}
                    >
                      Confirm your password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading || isOtpSent}
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        padding: "10px",
                      }}
                    />
                  </div>
                  {error && (
                    <div
                      className="alert alert-danger mt-3"
                      style={{ fontSize: "14px", color: "#d9534f" }}
                    >
                      {error}
                    </div>
                  )}
                  {message && (
                    <div
                      className="alert alert-success mt-3"
                      style={{ fontSize: "14px", color: "#5bc0de" }}
                    >
                      {message}
                    </div>
                  )}
                  <button
                    onClick={handlePasswordVerification}
                    className="btn btn-primary btn-block mt-3"
                    disabled={loading || isOtpSent}
                  >
                    {loading ? "Verifying..." : "Verify and Upgrade"}
                  </button>
                </>
              )}
              {isOtpSent && (
                <>
                  <div className="form-group mt-3">
                    <label htmlFor="otp" style={{ fontWeight: "600" }}>
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="otp"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      disabled={loading}
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        padding: "10px",
                      }}
                    />
                  </div>
                  <div className="timer mt-3">
                    {timer > 0 ? (
                      <p>
                        OTP expires in: {Math.floor(timer / 60)}:
                        {timer % 60 < 10 ? "0" : ""}
                        {timer % 60}
                      </p>
                    ) : (
                      <p style={{ color: "red" }}>OTP has expired</p>
                    )}
                  </div>
                  <button
                    onClick={handleOtpVerification}
                    className="btn btn-success btn-block mt-3"
                    disabled={loading || timer === 0}
                  >
                    {loading ? "Verifying OTP..." : "Verify OTP"}
                  </button>
                  <button
                    onClick={handleResendOtp}
                    className="btn btn-secondary btn-block mt-3"
                    disabled={loading || resendCooldown > 0}
                  >
                    {resendCooldown > 0
                      ? `Resend OTP in ${resendCooldown}s`
                      : "Resend OTP"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyVendor;

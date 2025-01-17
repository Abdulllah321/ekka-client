import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/common/BreadCrumbs";
import Layout from "../components/common/Layout";
import { AppDispatch, useAppSelector } from "../store";
import CryptoJS from "crypto-js";
import toast from "react-hot-toast";
import Logo from "../assets/images/logo/logo.png";
import { useDispatch } from "react-redux";
import { resetPasswordWithOtp } from "../slices/authSlice";

const ChangePasswordPage = () => {
  const { email, otp } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [decodedEmail, setDecodedEmail] = useState<string | null>(null);

  useEffect(() => {
    try {
      const emailBytes = CryptoJS.AES.decrypt(
        decodeURIComponent(email || ""),
        import.meta.env.VITE_SECRET_KEY
      );
      const decryptedEmail = emailBytes.toString(CryptoJS.enc.Utf8);
      setDecodedEmail(decryptedEmail);
    } catch (error) {
      toast.error("Invalid or tampered data.");
      navigate("/forgot-password");
    }
  }, [email, otp, navigate]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await dispatch(
        resetPasswordWithOtp({
          email: decodedEmail!,
          newPassword: password,
        })
      ).unwrap();

      toast.success("Password changed successfully. Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    }
  };

  const LayoutComp = isAuthenticated ? Layout : "div";

  return (
    <LayoutComp>
      {isAuthenticated && (
        <Breadcrumbs BreadCrumbsPathnames={["Change-Password"]} />
      )}{" "}
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
                    <img className="ec-brand-icon" src={Logo} alt="Ekka Logo" />
                  </Link>
                </div>
              </div>
              <div className="card-body p-5">
                <h4 className="text-dark mb-5">Change Password</h4>
                <p className="mb-4">
                  Please set a new password for your account associated with:{" "}
                  <strong>{decodedEmail}</strong>
                </p>
                <form onSubmit={handleChangePassword}>
                  <div className="row">
                    <div className="form-group col-md-12 mb-4">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="form-group col-md-12 mb-4">
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                        disabled={isLoading || !password || !confirmPassword}
                      >
                        {isLoading ? "Updating..." : "Change Password"}
                      </button>
                    </div>
                  </div>
                </form>
                {error && (
                  <div className="alert alert-danger">
                    {typeof error === "string" ? error : error?.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutComp>
  );
};

export default ChangePasswordPage;

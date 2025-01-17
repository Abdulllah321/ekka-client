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
import { verifyOtp } from "../slices/authSlice";

const VerifyOtpPage = () => {
  const { email } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [decodedEmail, setDecodedEmail] = useState<string | null>(null);

  useEffect(() => {
    try {
      const bytes = CryptoJS.AES.decrypt(
        decodeURIComponent(email || ""),
        import.meta.env.VITE_SECRET_KEY
      );
      const decryptedEmail = bytes.toString(CryptoJS.enc.Utf8);
      setDecodedEmail(decryptedEmail);

      if (!decryptedEmail) {
        throw new Error("Email decryption failed.");
      }
    } catch (error) {
      toast.error("Invalid or tampered email.");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    // Encrypt email and OTP
    const encryptedEmail = CryptoJS.AES.encrypt(
      decodedEmail as string,
      import.meta.env.VITE_SECRET_KEY
    ).toString();

    const encryptedOtp = CryptoJS.AES.encrypt(
      otp,
      import.meta.env.VITE_SECRET_KEY
    ).toString();

    // Encode the encrypted email and OTP for safe URL usage
    const encodedEmail = encodeURIComponent(encryptedEmail);
    const encodedOtp = encodeURIComponent(encryptedOtp);

    try {
      await dispatch(verifyOtp({ email: decodedEmail!, otp })).unwrap();
      navigate(`/change-password/${encodedEmail}/${encodedOtp}`);
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  const LayoutComp = isAuthenticated ? Layout : "div";

  return (
    <LayoutComp>
      {isAuthenticated && <Breadcrumbs BreadCrumbsPathnames={["Verify-Otp"]} />}{" "}
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
                <h4 className="text-dark mb-5">Verify OTP</h4>
                <p className="mb-4">
                  Please enter the OTP sent to your email:{" "}
                  <strong>{decodedEmail}</strong>
                </p>
                <form onSubmit={handleVerifyOtp}>
                  <div className="row">
                    <div className="form-group col-md-12 mb-4">
                      <input
                        type="text"
                        className="form-control"
                        id="otp"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        disabled={isLoading}
                        maxLength={6}
                      />
                    </div>
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                        disabled={isLoading || otp.length !== 6} // Disable button when loading or invalid OTP
                      >
                        {isLoading ? "Verifying..." : "Verify OTP"}
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

export default VerifyOtpPage;

import { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/common/BreadCrumbs";
import Layout from "../components/common/Layout";
import { ProfileSidebar } from "./ProfilePage";
import axios from "axios";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm password do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        setMessage(response.data.message || "Password changed successfully.");
      } else {
        setError(response.data.message || "Failed to change password.");
      }
    } catch (err: any) {
      setError(
        err.response.data.message ||
          "An error occurred while changing the password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Breadcrumbs />
      <section className="ec-page-content ec-vendor-uploads ec-user-account section-space-p">
        <div className="container">
          <div className="row">
            <ProfileSidebar />
            <div className="ec-shop-rightside col-lg-9 col-md-12">
              <div className="ec-vendor-dashboard-card ec-vendor-setting-card">
                <div className="ec-vendor-card-body">
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="currentPassword"
                      placeholder="Enter your current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      disabled={loading}
                    />
                    <small
                      className="form-text text-muted mt-2"
                      style={{
                        display: loading ? "none" : "block",
                        float: "right",
                      }}
                    >
                      <Link to="/forgot-password" className="text-primary">
                        Forgot Password?
                      </Link>
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmNewPassword">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmNewPassword"
                      placeholder="Confirm your new password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  {error && (
                    <div className="alert alert-danger mt-3">{error}</div>
                  )}
                  {message && (
                    <div className="alert alert-success mt-3">{message}</div>
                  )}
                  <button
                    onClick={handleChangePassword}
                    className="btn btn-primary btn-block mt-3"
                    disabled={loading}
                  >
                    {loading ? "Changing..." : "Change Password"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ChangePasswordPage;

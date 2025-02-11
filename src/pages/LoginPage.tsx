import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../store";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../slices/authSlice";
import Logo from "../assets/images/logo/logo.png";
import toast from "react-hot-toast";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email: username, password })).unwrap();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="sign-inup" id="body">
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
                  <Link to="/" title="Vastra">
                    <img
                      className="ec-brand-icon"
                      src={Logo}
                      alt="Vastra Logo"
                    />
                  </Link>
                </div>
              </div>
              <div className="card-body p-5">
                <h4 className="text-dark mb-5">Sign In</h4>
                <form onSubmit={handleLogin}>
                  <div className="row">
                    <div className="form-group col-md-12 mb-4">
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12 mb-4">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <small
                        className="text-primary"
                        style={{ float: "right", marginTop: 10 }}
                      >
                        <Link to={`/forgot-password`}>Forgot Password?</Link>
                      </small>
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

                    <div className="col-md-12 text-center mt-3">
                      <p>
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary">
                          Sign Up here
                        </Link>
                      </p>
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
  );
};

export default LoginPage;

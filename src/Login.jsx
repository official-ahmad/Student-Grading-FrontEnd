import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaLock, FaUser } from "react-icons/fa"; // Assuming react-icons is installed for icons

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/login",
        {
          username,
          password,
        },
      );
      if (response.status === 200) {
        toast.success("Success: Admin Logged In!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "450px",
          borderRadius: "15px",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <FaLock size={50} className="text-primary mb-3" />
            <h3
              className="fw-bold text-dark"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Admin Portal
            </h3>
            <p className="text-muted">Secure Access to Administration</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">
                Username
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <FaUser className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-0 shadow-sm"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ borderRadius: "0 10px 10px 0" }}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold text-dark">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <FaLock className="text-muted" />
                </span>
                <input
                  type="password"
                  className="form-control border-0 shadow-sm"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ borderRadius: "0 10px 10px 0" }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-3 fw-bold shadow-sm"
              style={{
                borderRadius: "10px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Logging In...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">
              © 2026 Ahmad. All rights reserved.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

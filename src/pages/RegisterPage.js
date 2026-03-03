import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setStatus(""); setError("");
    if (!email || !password) { setError("All fields are required."); return; }
    try {
      await api.post("/Auth/register", { email, password, role: "Employee" });
      setStatus("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const errors = err.response?.data;
      if (typeof errors === "string") setError(errors);
      else if (Array.isArray(errors) && errors.length > 0) setError(errors[0].description);
      else setError("Registration failed. Check your details.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="subtitle">Use the email your admin registered you with</p>

        <div className="form-group">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 6 characters"
            onKeyDown={(e) => e.key === "Enter" && handleRegister()}
          />
        </div>

        <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleRegister}>
          Create Account
        </button>

        {status && <div className="alert alert-success">{status}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <p style={{ marginTop: "22px", fontSize: "13px", textAlign: "center", color: "#7d6048", fontFamily: "Segoe UI, sans-serif" }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
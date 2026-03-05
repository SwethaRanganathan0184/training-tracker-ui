import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/Auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      if (res.data.employeeId) localStorage.setItem("employeeId", res.data.employeeId);
      if (res.data.role === "Admin") navigate("/employees");
      else navigate("/dashboard");
    } catch {
      setStatus("Invalid email or password.");
    }
  };

  return (
    <div className="auth-wrapper">
    <h1 className="auth-title">Training Tracker</h1>
     
      <div className="auth-card">
        <h2>Welcome</h2>
        <p className="subtitle">Sign in to continue your training journey</p>
        <div className="form-group">
          <label>Email</label>
          <input
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>
        <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleLogin}>
          Sign In
        </button>
        {status && <div className="alert alert-error">{status}</div>}
        <p style={{ marginTop: "22px", fontSize: "13px", textAlign: "center", color: "#7d6048", fontFamily: "Segoe UI, sans-serif" }}>
          New employee? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

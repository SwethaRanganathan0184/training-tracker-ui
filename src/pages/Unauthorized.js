import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <div style={{ fontSize: "52px", marginBottom: "16px" }}>🚫</div>
        <h2>Access Denied</h2>
        <p style={{ color: "#7d6048", margin: "12px 0 28px", fontFamily: "Segoe UI, sans-serif" }}>
          You don't have permission to view this page.
        </p>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;
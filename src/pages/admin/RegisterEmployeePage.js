import { useState, useEffect } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";

function RegisterEmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("/employees");
        setEmployees(res.data);
      } catch {
        setError("Failed to load employees.");
      }
    };
    fetchEmployees();
  }, []);

  const handleRegister = async () => {
    setStatus("");
    setError("");

    if (!selectedEmployeeId || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      await api.post("/Auth/register", {
        email,
        password,
        role: "Employee",
        employeeId: parseInt(selectedEmployeeId)
      });
      setStatus("✅ Employee account created successfully!");
      setEmail("");
      setPassword("");
      setSelectedEmployeeId("");
    } catch (err) {
  console.log("REGISTER ERROR:", err.response?.data);
  setError("❌ Failed to register. Email may already be taken.");
}
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "30px", maxWidth: "400px" }}>
        <h2>Register Employee Account</h2>
        <p style={{ color: "#666", fontSize: "13px" }}>
          Link a login account to an existing employee record.
        </p>

        <label>Select Employee</label>
        <br />
        <select
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
          style={inputStyle}
        >
          <option value="">-- Select Employee --</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name} ({emp.department})
            </option>
          ))}
        </select>

        <br /><br />

        <label>Email</label>
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="employee@company.com"
          style={inputStyle}
        />

        <br /><br />

        <label>Password</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min 6 characters"
          style={inputStyle}
        />

        <br /><br />

        <button onClick={handleRegister} style={btnStyle}>
          Create Account
        </button>

        {status && <p style={{ color: "green", marginTop: "12px" }}>{status}</p>}
        {error && <p style={{ color: "red", marginTop: "12px" }}>{error}</p>}
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px",
  fontSize: "14px",
  borderRadius: "4px",
  border: "1px solid #ccc"
};

const btnStyle = {
  padding: "8px 20px",
  backgroundColor: "#2c3e50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

export default RegisterEmployeePage;
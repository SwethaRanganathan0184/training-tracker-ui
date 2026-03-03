import { useState } from "react";
import api from "./api/axios";

function EmployeeForm() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const addEmployee = async () => {
    if (!name || !department || !email) {
      setIsError(true);
      setMessage("Please fill all fields.");
      return;
    }
    try {
      await api.post("/employees", { name, department, email });
      setIsError(false);
      setMessage("Employee added successfully!");
      setName(""); setDepartment(""); setEmail("");
    } catch {
      setIsError(true);
      setMessage("Error adding employee.");
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ravi Kumar" />
      </div>
      <div className="form-group">
        <label>Department</label>
        <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. Engineering" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. ravi@company.com" />
      </div>
      <button className="btn btn-primary" onClick={addEmployee}>Add Employee</button>
      {message && <div className={`alert ${isError ? "alert-error" : "alert-success"}`}>{message}</div>}
    </div>
  );
}

export default EmployeeForm;
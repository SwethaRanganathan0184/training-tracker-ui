import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";

function ProgressBar({ value }) {
  const pct = value ?? 0;
  const cls = pct === 100 ? "high" : pct > 50 ? "mid" : "low";
  return (
    <div className="progress-wrap">
      <div className="progress-track">
        <div className={`progress-fill ${cls}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-label">{pct}%</div>
    </div>
  );
}

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [completions, setCompletions] = useState({});
  const [scores, setScores] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/employees");
        setEmployees(res.data);

        const completionData = {};
        const scoreData = {};

        for (const emp of res.data) {
          try {
            const [compRes, scoreRes] = await Promise.all([
              api.get(`/employee-courses/completion/${emp.id}`),
              api.get(`/employee-courses/score/${emp.id}`)
            ]);
            completionData[emp.id] = compRes.data;
            scoreData[emp.id] = scoreRes.data;
          } catch {
            completionData[emp.id] = 0;
            scoreData[emp.id] = 0;
          }
        }

        setCompletions(completionData);
        setScores(scoreData);
      } catch {
        setError("Failed to load employees.");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="page-header">
          <h2>Employees</h2>
          <Link to="/add-employee" className="btn btn-primary">+ Add Employee</Link>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Email</th>
                <th>Score</th>
                <th>Completion</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr className="empty-row"><td colSpan="6">No employees found</td></tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td><strong>{emp.name}</strong></td>
                    <td>{emp.department}</td>
                    <td style={{ color: "#6b7c6e" }}>{emp.email}</td>
                    <td>
                      <span style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        backgroundColor: "#2d4a3e",
                        color: "#f8fdf6",
                        fontWeight: "700",
                        fontSize: "13px",
                        fontFamily: "Georgia, serif",
                        minWidth: "48px",
                        textAlign: "center"
                      }}>
                        {scores[emp.id] ?? "—"} pts
                      </span>
                    </td>
                    <td style={{ minWidth: "160px" }}>
                      <ProgressBar value={completions[emp.id]} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default EmployeesPage;
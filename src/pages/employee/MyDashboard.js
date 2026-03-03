import { useState, useEffect } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";

function MyDashboard() {
  const [courses, setCourses] = useState([]);
  const [completion, setCompletion] = useState(null);
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const [coursesRes, completionRes, scoreRes] = await Promise.all([
        api.get("/employee-courses/my-courses"),
        api.get("/employee-courses/completion/me"),
        api.get("/employee-courses/score/me")
      ]);
      setCourses(coursesRes.data);
      setCompletion(completionRes.data);
      setScore(scoreRes.data);
    } catch {
      setError("Failed to load your dashboard.");
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleMarkComplete = async (id) => {
    try {
      await api.put(`/employee-courses/complete/me/${id}`);
      fetchData();
    } catch {
      setError("Failed to mark course as complete.");
    }
  };

  const pct = completion ?? 0;
  const cls = pct === 100 ? "high" : pct > 50 ? "mid" : "low";

  const getScoreBadge = (s) => {
    if (s === null) return null;
    if (s === 0) return { label: "Just Getting Started 🌱", color: "#a8c5a0", bg: "#edf7eb" };
    if (s < 10) return { label: "On Your Way 🚶", color: "#7d9b76", bg: "#d4edda" };
    if (s < 20) return { label: "Making Progress 🌿", color: "#4a7c59", bg: "#c3e6cb" };
    if (s < 35) return { label: "Getting Strong 💪", color: "#2d6a4f", bg: "#b7ddc8" };
    return { label: "Training Champion 🏆", color: "#1b4332", bg: "#95d5b2" };
  };

  const badge = getScoreBadge(score);

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="page-header">
          <h2>My Training Dashboard</h2>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {/* Top stats row */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "28px", flexWrap: "wrap" }}>

          {/* Score card */}
          <div className="card" style={{
            flex: "1",
            minWidth: "220px",
            textAlign: "center",
            background: "linear-gradient(135deg, #2d4a3e 0%, #4a7c59 100%)",
            border: "none",
            color: "white",
            padding: "28px 24px"
          }}>
            <p style={{
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "#a8c5a0",
              marginBottom: "10px",
              fontFamily: "Segoe UI, sans-serif"
            }}>
              Total Score
            </p>
            <div style={{
              fontSize: "56px",
              fontWeight: "700",
              fontFamily: "Georgia, serif",
              lineHeight: 1,
              color: "#f8fdf6",
              marginBottom: "8px"
            }}>
              {score !== null ? score : "—"}
            </div>
            <p style={{
              fontSize: "12px",
              color: "#a8c5a0",
              fontFamily: "Segoe UI, sans-serif"
            }}>
              points earned
            </p>
            {badge && (
              <div style={{
                marginTop: "14px",
                display: "inline-block",
                padding: "5px 14px",
                borderRadius: "20px",
                backgroundColor: "rgba(168, 197, 160, 0.2)",
                color: "#d4edda",
                fontSize: "12px",
                fontWeight: "600",
                fontFamily: "Segoe UI, sans-serif",
                border: "1px solid rgba(168, 197, 160, 0.3)"
              }}>
                {badge.label}
              </div>
            )}
          </div>

          {/* Completion card */}
          <div className="card" style={{ flex: "2", minWidth: "280px" }}>
            <p style={{
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#6b7c6e",
              marginBottom: "16px",
              fontFamily: "Segoe UI, sans-serif"
            }}>
              Overall Completion
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
              <div className="progress-track" style={{ flex: 1, height: "14px" }}>
                <div className={`progress-fill ${cls}`} style={{ width: `${pct}%` }} />
              </div>
              <span style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#2d4a3e",
                minWidth: "52px",
                fontFamily: "Georgia, serif"
              }}>
                {pct}%
              </span>
            </div>

            {/* Mini course stats */}
            <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
              <div style={miniStat}>
                <span style={miniStatNum}>
                  {courses.filter((c) => c.isCompleted).length}
                </span>
                <span style={miniStatLabel}>Completed</span>
              </div>
              <div style={{ width: "1px", background: "#c8ddc4" }} />
              <div style={miniStat}>
                <span style={miniStatNum}>
                  {courses.filter((c) => !c.isCompleted).length}
                </span>
                <span style={miniStatLabel}>Remaining</span>
              </div>
              <div style={{ width: "1px", background: "#c8ddc4" }} />
              <div style={miniStat}>
                <span style={miniStatNum}>{courses.length}</span>
                <span style={miniStatLabel}>Total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Courses table */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Weight</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr className="empty-row">
                  <td colSpan="4">No courses assigned yet.</td>
                </tr>
              ) : (
                courses.map((c) => (
                  <tr key={c.id}>
                    <td><strong>{c.courseName}</strong></td>
                    <td>
                      <span style={{
                        fontFamily: "Segoe UI, sans-serif",
                        fontWeight: "700",
                        color: c.isCompleted ? "#2d4a3e" : "#a8c5a0"
                      }}>
                        +{c.weight ?? "—"}
                      </span>
                    </td>
                    <td>
                      {c.isCompleted
                        ? <span className="badge badge-success">✓ Completed</span>
                        : <span className="badge badge-warning">⏳ In Progress</span>}
                    </td>
                    <td>
                      {!c.isCompleted && (
                        <button
                          className="btn btn-success"
                          style={{ fontSize: "12px", padding: "7px 16px" }}
                          onClick={() => handleMarkComplete(c.id)}
                        >
                          Mark Complete
                        </button>
                      )}
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

const miniStat = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2px"
};

const miniStatNum = {
  fontSize: "22px",
  fontWeight: "700",
  fontFamily: "Georgia, serif",
  color: "#2d4a3e"
};

const miniStatLabel = {
  fontSize: "11px",
  color: "#6b7c6e",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  fontFamily: "Segoe UI, sans-serif"
};

export default MyDashboard;
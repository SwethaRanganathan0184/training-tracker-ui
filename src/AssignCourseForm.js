import { useState, useEffect } from "react";
import api from "./api/axios";

function AssignCourseForm({ onAssigned }) {
  const [employees, setEmployees] = useState([]);
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState({});
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, courseRes] = await Promise.all([
          api.get("/employees"),
          api.get("/courses")
        ]);
        setEmployees(empRes.data);
        setCourses(courseRes.data);
        setDepartments([...new Set(empRes.data.map((e) => e.department))]);
      } catch {}
    };
    fetchData();
  }, []);

  const employeesInDept = employees.filter((e) => e.department === selectedDept);

  const handleCourseSelect = (employeeId, courseId) => {
    setSelectedCourses((prev) => ({ ...prev, [employeeId]: courseId }));
  };

  const handleAssign = async (employeeId) => {
    const courseId = selectedCourses[employeeId];
    if (!courseId) {
      setMessages((prev) => ({ ...prev, [employeeId]: { type: "error", text: "Select a course first." } }));
      return;
    }
    try {
      await api.post("/employee-courses/assign", {
        employeeId: parseInt(employeeId),
        courseId: parseInt(courseId)
      });
      setMessages((prev) => ({ ...prev, [employeeId]: { type: "success", text: "Assigned!" } }));
      setSelectedCourses((prev) => ({ ...prev, [employeeId]: "" }));
      if (onAssigned) onAssigned();
    } catch {
      setMessages((prev) => ({ ...prev, [employeeId]: { type: "error", text: "Failed. May already be assigned." } }));
    }
  };

  return (
    <div>
      {/* Department tabs */}
      <div className="dept-tabs">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`btn btn-outline ${selectedDept === dept ? "active" : ""}`}
            style={{ fontSize: "12px", padding: "7px 18px" }}
          >
            {dept}
          </button>
        ))}
      </div>

      {!selectedDept && (
        <p style={{ color: "#c4a882", fontStyle: "italic", fontFamily: "Segoe UI, sans-serif" }}>
          Select a department above to see employees.
        </p>
      )}

      {selectedDept && employeesInDept.length === 0 && (
        <p style={{ color: "#c4a882", fontStyle: "italic" }}>No employees in this department.</p>
      )}

      {selectedDept && employeesInDept.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Select Course</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employeesInDept.map((emp) => (
              <tr key={emp.id}>
                <td><strong>{emp.name}</strong></td>
                <td>
                  <div className="form-group" style={{ margin: 0 }}>
                    <select
                      value={selectedCourses[emp.id] || ""}
                      onChange={(e) => handleCourseSelect(emp.id, e.target.value)}
                    >
                      <option value="">-- Select Course --</option>
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>{c.courseName}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td>
                  <button className="btn btn-success" style={{ fontSize: "12px", padding: "7px 16px" }} onClick={() => handleAssign(emp.id)}>
                    Assign
                  </button>
                </td>
                <td>
                  {messages[emp.id] && (
                    <span className={`badge ${messages[emp.id].type === "success" ? "badge-success" : "badge-warning"}`}>
                      {messages[emp.id].text}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AssignCourseForm;
import { useState, useEffect } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import CourseForm from "../../CourseForm";

function CoursesPage() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch {}
  };

  useEffect(() => { fetchCourses(); }, []);

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="page-header">
          <h2>Courses</h2>
        </div>

        <div className="card" style={{ maxWidth: "480px" }}>
          <h3 style={{ marginBottom: "20px", fontSize: "16px" }}>Add New Course</h3>
          <CourseForm onAdded={fetchCourses} />
        </div>

        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Course Name</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr className="empty-row"><td colSpan="3">No courses yet</td></tr>
              ) : (
                courses.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td><strong>{c.courseName}</strong></td>
                    <td>{c.weight}</td>
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

export default CoursesPage;
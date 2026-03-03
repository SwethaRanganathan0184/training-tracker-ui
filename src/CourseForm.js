import { useState } from "react";
import api from "./api/axios";

function CourseForm({ onAdded }) {
  const [courseName, setCourseName] = useState("");
  const [weight, setWeight] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const addCourse = async () => {
    if (!courseName || !weight) {
      setIsError(true);
      setMessage("Please fill all fields.");
      return;
    }
    try {
      await api.post("/courses", { courseName, weight: parseInt(weight) });
      setIsError(false);
      setMessage("Course added!");
      setCourseName(""); setWeight("");
      onAdded();
    } catch {
      setIsError(true);
      setMessage("Error adding course.");
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Course Name</label>
        <input value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="e.g. Fire Safety" />
      </div>
      <div className="form-group">
        <label>Weight</label>
        <input value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 3" />
      </div>
      <button className="btn btn-primary" onClick={addCourse}>Add Course</button>
      {message && <div className={`alert ${isError ? "alert-error" : "alert-success"}`}>{message}</div>}
    </div>
  );
}

export default CourseForm;
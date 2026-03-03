import Navbar from "../../components/Navbar";
import AssignCourseForm from "../../AssignCourseForm";

function AssignCoursePage() {
  return (
    <>
      <Navbar />
      <div className="page">
        <div className="page-header">
          <h2>Assign Course</h2>
        </div>
        <div className="card">
          <AssignCourseForm onAssigned={() => {}} />
        </div>
      </div>
    </>
  );
}

export default AssignCoursePage;
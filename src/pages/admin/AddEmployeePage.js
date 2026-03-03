import Navbar from "../../components/Navbar";
import EmployeeForm from "../../EmployeeForm";

function AddEmployeePage() {
  return (
    <>
      <Navbar />
      <div className="page">
        <div className="page-header">
          <h2>Add Employee</h2>
        </div>
        <div className="card" style={{ maxWidth: "480px" }}>
          <EmployeeForm />
        </div>
      </div>
    </>
  );
}

export default AddEmployeePage;
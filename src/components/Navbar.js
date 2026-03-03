import { Link, useNavigate } from "react-router-dom";
import { getRole, logout } from "../auth/authUtils";

function Navbar() {
  const role = getRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <span className="navbar-brand">🖥️ Training Tracker</span>

      {role === "Admin" && (
        <>
          <Link to="/employees">Employees</Link>
          <Link to="/add-employee">Add Employee</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/assign">Assign Course</Link>
        </>
      )}

      {role === "Employee" && (
        <Link to="/dashboard">My Dashboard</Link>
      )}

      <button
        onClick={handleLogout}
        className="btn btn-danger"
        style={{ marginLeft: "16px", padding: "7px 18px", fontSize: "11px" }}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
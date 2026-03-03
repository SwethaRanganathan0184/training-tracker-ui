import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome to Employee Training Tracker</h2>
      <p>Logged in as: <b>{role}</b></p>

      <nav style={{ marginBottom: "20px" }}>
        <Link to="/employees">Employees</Link> |{" "}
        <Link to="/add-employee">Add Employee</Link> |{" "}
        <Link to="/courses">Courses</Link> |{" "}
        <Link to="/assign">Assign Course</Link>
      </nav>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default HomePage;
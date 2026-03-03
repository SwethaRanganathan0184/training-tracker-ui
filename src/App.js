import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./auth/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import Unauthorized from "./pages/Unauthorized";

import EmployeesPage from "./pages/admin/EmployeesPage";
import AddEmployeePage from "./pages/admin/AddEmployeePage";
import CoursesPage from "./pages/admin/CoursesPage";
import AssignCoursePage from "./pages/admin/AssignCoursePage";

import MyDashboard from "./pages/employee/MyDashboard";
import RegisterEmployeePage from "./pages/admin/RegisterEmployeePage";

import RegisterPage from "./pages/RegisterPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin only */}
        <Route path="/employees" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <EmployeesPage />
          </ProtectedRoute>
        } />

        <Route path="/add-employee" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AddEmployeePage />
          </ProtectedRoute>
        } />

        <Route path="/courses" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <CoursesPage />
          </ProtectedRoute>
        } />

        <Route path="/assign" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AssignCoursePage />
          </ProtectedRoute>
        } />
        <Route path="/register-employee" element={
  <ProtectedRoute allowedRoles={["Admin"]}>
    <RegisterEmployeePage />
  </ProtectedRoute>
} />

        {/* Employee only */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={["Employee"]}>
            <MyDashboard />
          </ProtectedRoute>
        } />

        {/* Default redirect based on role */}
        <Route path="/" element={<RoleRedirect />} />
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

// Redirects to correct home page based on role after login
function RoleRedirect() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (role === "Admin") return <Navigate to="/employees" />;
  if (role === "Employee") return <Navigate to="/dashboard" />;
  return <Navigate to="/login" />;
}

export default App;
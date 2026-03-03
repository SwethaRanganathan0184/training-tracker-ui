export const getToken = () => localStorage.getItem("token");
export const getRole = () => localStorage.getItem("role");
export const getEmployeeId = () => localStorage.getItem("employeeId");

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("employeeId");
};
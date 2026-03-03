import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [completion, setCompletion] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5233/api/employees").then(res => {
      setEmployees(res.data);

      res.data.forEach(emp => {
        axios
          .get(
            `http://localhost:5233/api/employee-courses/completion/${emp.id}`
          )
          .then(r =>
            setCompletion(prev => ({ ...prev, [emp.id]: r.data }))
          );
      });
    });
  }, []);

  return (
    <div>
      <h3>Employees</h3>
      <ul>
        {employees.map(e => (
          <li key={e.id}>
            {e.name} ({e.department}) – Completion: {completion[e.id] || 0}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
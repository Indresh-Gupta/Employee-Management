import { useState } from "react";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>
                <img
                  src={`http://localhost:8080/${emp.photo}`}
                  alt="profile"
                  className="employee-photo"
                />
              </td>

              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.gender}</td>
              <td>{emp.dob?.substring(0, 10)}</td>
              <td>{emp.department}</td>
              <td>{emp.designation}</td>

              <td className="action-cell">
                <button
                  className="three-dot-btn"
                  onClick={() =>
                    setActiveMenu(activeMenu === emp._id ? null : emp._id)
                  }
                >
                  ⋮
                </button>

                {activeMenu === emp._id && (
                  <div className="dropdown-menu">
                    <button onClick={() => onEdit(emp)}>Update</button>
                    <button onClick={() => onDelete(emp._id)}>Delete</button>
                    <button onClick={() => setActiveMenu(null)}>
                      Cancel
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
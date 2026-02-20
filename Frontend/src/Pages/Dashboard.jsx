import { useState, useEffect } from "react";
import API from "../Api/axios";
import Header from "../Components/Header";
import EmployeeTable from "../Components/EmployeeTable";
import EmployeeModal from "../Components/EmployeeModal";
import "./Dashboard.css";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    designation: "",
    gender: ""
  });

  const fetchEmployees = async () => {
    const { data } = await API.get("/employees", { params: filters });
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // 🔥 Search Button Click
  const handleSearch = () => {
    setFilters({ ...filters, search: searchInput });
  };

  return (
    <div>
      <Header />

      <div className="table-header">

        {/* Search Box */}
        <div className="search-wrapper">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search employee..."
            className="search-input"
          />

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Create Button */}
        <button 
          className="create-btn"
          onClick={() => setShowModal(true)}
        >
          + Create Employee
        </button>

      </div>

      <EmployeeTable
  employees={employees}
  onEdit={(emp) => {
    setShowModal(true);
    setSelectedEmployee(emp);
  }}
  onDelete={async (id) => {
    await API.delete(`/employees/${id}`);
    fetchEmployees();
  }}
/>

      {showModal && (
        <EmployeeModal 
  employee={selectedEmployee}
  close={() => {
    setShowModal(false);
    setSelectedEmployee(null);
  }}
  refresh={fetchEmployees}
/>
      )}
    </div>
  );
};

export default Dashboard;
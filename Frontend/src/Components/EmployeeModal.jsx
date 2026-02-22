import { useState, useEffect } from "react";
import API from "../Api/axios";
import "./EmployeeModal.css";

const EmployeeModal = ({employee, close, refresh }) => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    department: "",
    designation: ""
  });
  
  useEffect(() => {
  if (employee) {
    setFormData({
      fullName: employee.fullName || "",
      email: employee.email || "",
      phone: employee.phone || "",
      gender: employee.gender || "",
      dob: employee.dob ? employee.dob.substring(0, 10) : "",
      department: employee.department || "",
      designation: employee.designation || ""
    });
  } else {
    // 🔥 Reset form when creating new employee
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      gender: "",
      dob: "",
      department: "",
      designation: ""
    });
    setPhoto(null); // 🔥 VERY IMPORTANT
  }
}, [employee]);

  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // if (photo) {
      //   data.append("photo", photo);
      // }

      if (photo instanceof File) {
  data.append("photo", photo);
}

     if (employee && employee._id) {
  await API.put(`/employees/${employee._id}`, data);
  alert("Employee Updated Successfully");
} else {
  await API.post("/employees", data);
  alert("Employee Created Successfully");
}
      refresh();
      setPhoto(null);
      close();

    } catch (error) {
      console.log(error.response?.data || error.message);
     alert(employee ? "Error Updating Employee" : "Error Creating Employee");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <div className="modal-header">
          <h2>{employee ? "Update Employee" : "Create Employee"}</h2>
          <button onClick={close}><i className="fa-solid fa-xmark"></i></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            <div className="form-group">
              <label>Full Name *</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input
                name="phone"
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Department *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>HR</option>
                <option>IT</option>
              </select>
            </div>

            <div className="form-group">
              <label>Designation *</label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Manager</option>
                <option>Developer</option>
              </select>
            </div>

            <div className="form-group">
              <label>Employee Photo</label>
              <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>

          </div>

          <div className="modal-footer">
            <button type="submit" className="save-btn">
            {employee ? "Update" : "Save"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
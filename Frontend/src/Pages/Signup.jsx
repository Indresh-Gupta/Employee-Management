import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../Api/axios";
import { AuthContext } from "../Context/AuthContext";
import "./Signup.css";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/auth/signup", form);
      login(data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h1 className="logo">IDMS</h1>
        <p className="subtitle">Create Your Account</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="signup-btn">
            Signup
          </button>
        </form>

        <p className="login-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
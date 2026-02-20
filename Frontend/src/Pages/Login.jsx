import { useState, useContext } from "react";
import API from "../Api/axios";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await API.post("/auth/login", form);
    login(data.token);
    navigate("/dashboard");
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setForm({...form, email: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setForm({...form, password: e.target.value})}
        />
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: "15px" }}>
  Don't have an account? <Link to="/signup">Signup</Link>
</p>
    </div>
  );
};

export default Login;
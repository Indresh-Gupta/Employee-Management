import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import "./Header.css";

const Header = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <h2>Employee Management</h2>

      <div className="header-right">
        {/* <span className="user">Logged In</span> */}
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
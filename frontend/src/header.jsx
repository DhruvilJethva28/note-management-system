import { useNavigate } from "react-router-dom";
import "./style/header.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/login");               // redirect to login
  };

  return (
    <header className="app-header">
      <h1 className="app-title">📝 Notes App</h1>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Header;

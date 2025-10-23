import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { TbLicense } from "react-icons/tb";
import "../style/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>My App</h2>
      <ul>
        <li>
          <Link to="/capbang"><TbLicense /> Cấp Bằng</Link>
        </li>
        <li>
          <Link to="/kiemtra"><FaCheckCircle /> Kiểm Tra Bằng</Link>
        </li>
        <li>
          <Link to="/TraCuuBang"><TbLicense /> Tra cứu bằng</Link>
        </li>
      </ul>
      <div className="sidebar-footer">© 2025 My App</div>
    </div>
  );
}

export default Sidebar;

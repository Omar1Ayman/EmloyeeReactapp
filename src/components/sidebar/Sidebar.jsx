import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="siidebar">
      <div className="logo">
        <i class="fa-solid fa-users icon-logo"></i>
        <h1 className="title">employee entry</h1>
      </div>
      <ul className="links">
        <li className="link">
          <NavLink to="/">
            <i class="icon fa-solid fa-house"></i>
            <span className="tlt">Home</span>
          </NavLink>
        </li>
        <li className="link">
          <NavLink to="employee">
            <i class="icon fa-solid fa-users"></i>
            <span className="tlt">Employees</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

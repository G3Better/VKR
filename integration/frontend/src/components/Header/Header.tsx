import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Header.module.sass";
import {roles} from "../../utills/roleUtills";

const Header: React.FC = () => {
  const [fio, setFio] = React.useState("");
  const [isShow, setShow] = React.useState(false);

  const logout = React.useCallback(() => {
    localStorage.removeItem("login");
    localStorage.removeItem("password");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("fio");
  }, []);

  const handleClick = React.useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  React.useEffect(() => {
    const fullName = localStorage.getItem("fio");
    setFio(fullName || "");
  }, [fio]);

  return (
    <>
      <header className={styles.header}>
        <NavLink to="/orders">Orders</NavLink>
        {roles.admin === localStorage.getItem("role") && <NavLink to="/users">Users</NavLink>}
        {roles.admin === localStorage.getItem("role") && <NavLink to="/authorizations">Authorizations</NavLink>}
        {roles.admin === localStorage.getItem("role") && <NavLink to="/contours">Contours</NavLink>}
        {roles.admin === localStorage.getItem("role") && <NavLink to="/networks">Networks</NavLink>}
        {roles.admin === localStorage.getItem("role") && <NavLink to="/request_rates">Request Rates</NavLink>}
        {roles.admin === localStorage.getItem("role") && <NavLink to="/roles">Roles</NavLink>}
        {roles.admin === localStorage.getItem("role") && <NavLink to="/status">Status</NavLink>}
        <NavLink to="/endpoints">Endpoints</NavLink>
        <NavLink to="/systems">Systems</NavLink>
        <button onClick={handleClick} className={styles.fullName}>
          {fio}
        </button>
        {isShow && (
          <div className={styles.logout_modal}>
            <NavLink to="/" onClick={() => logout()} className={styles.logout}>
              <LogoutIcon /> <span>Выйти</span>
            </NavLink>
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
};

export default Header;

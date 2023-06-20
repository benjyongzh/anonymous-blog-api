import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { isEmpty } from "lodash";

import DisplayModeToggle from "./DisplayModeToggle";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const pageName = useSelector((state) => state.page.pageName);
  const mainTitle = useSelector((state) => state.page.mainTitle);
  const mainId = useSelector((state) => state.page.mainId);

  const navBarButtons = (
    <ul className="nav navbar-nav column-gap-3">
      <li className="nav-item">
        <NavLink
          className={`fs-6 nav-link text-end ${
            mainId === user._id || pageName === "login"
              ? "active text-primary fw-bold"
              : ""
          }`}
          to={!isEmpty(user) ? `/users/${user._id}` : "/auth/login"}
        >
          {!isEmpty(user) ? user.first_name : "Log In"}
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={`fs-6 nav-link text-end ${
            pageName === "signup" ? "active text-primary fw-bold" : ""
          }`}
          to={!isEmpty(user) ? `/auth/loggingout/${user._id}` : "/auth/signup"}
        >
          {!isEmpty(user) ? "Log Out" : "Sign Up"}
        </NavLink>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-sm p-2">
      <div className="container-fluid d-flex">
        <NavLink className="navbar-brand text-uppercase fw-bold" to="/">
          {mainTitle}
        </NavLink>

        <DisplayModeToggle />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ padding: "1px 4px" }}
        >
          <i className="bx bx-md bx-menu-alt-right"></i>
        </button>

        <div
          className="navbar-collapse collapse justify-content-end"
          id="navbarSupportedContent"
        >
          {navBarButtons}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

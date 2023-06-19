import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { isEmpty } from "lodash";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const pageName = useSelector((state) => state.page.pageName);
  const mainTitle = useSelector((state) => state.page.mainTitle);
  const mainId = useSelector((state) => state.page.mainId);

  const navBarButtons = () => {
    if (!isEmpty(user)) {
      return (
        <ul className="nav navbar-nav" style={{ gap: "1rem" }}>
          <li className="nav-item">
            <NavLink
              className={`fs-6 nav-link text-end ${
                mainId === user._id ? "active text-primary fw-bold" : ""
              }`}
              to={`/users/${user._id}`}
            >
              {user.first_name}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="fs-6 nav-link text-end"
              to={`/auth/loggingout/${user._id}`}
            >
              Log Out
            </NavLink>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="nav navbar-nav" style={{ gap: "1rem" }}>
          <li className="nav-item">
            <NavLink
              className={`fs-6 nav-link text-end ${
                pageName === "login" ? "active text-primary fw-bold" : ""
              }`}
              to="/auth/login"
            >
              Log In
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`fs-6 nav-link text-end ${
                pageName === "signup" ? "active text-primary fw-bold" : ""
              }`}
              to="/auth/signup"
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-uppercase fw-bold" to="/">
          {mainTitle}
        </NavLink>
        <button
          className="navbar-toggler mb-3"
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
          {navBarButtons()}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

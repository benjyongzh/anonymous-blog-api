// import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { isEmpty } from "lodash";

function Navbar(props) {
  const { user, pageName, mainTitle } = props;

  //make sure log out button is using POST instead of just GET href

  const navBarButtons = () => {
    if (!isEmpty(user)) {
      return (
        <ul className="nav navbar-nav" style={{ gap: "1rem" }}>
          <li className="nav-item">
            <NavLink
              className={`fs-6 nav-link text-end ${
                pageName === "user_detail" ? "active text-primary fw-bold" : ""
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
                pageName === "login_page" ? "active text-primary fw-bold" : ""
              }`}
              to="/auth/login"
            >
              Log In
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`fs-6 nav-link text-end ${
                pageName === "signup_page" ? "active text-primary fw-bold" : ""
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

  //check if user changed
  // useEffect(() => {
  //   configureNavbarItemsBasedOnLogIn();
  // }, []);

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

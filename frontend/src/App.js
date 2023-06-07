import { useEffect, useState } from "react";

function App() {
  const [mainTitle, setMainTitle] = useState("");
  const [pageName, setPageName] = useState("");
  const [user, setUser] = useState({});

  //use useEffect to alter mainTitle, pageName and user
  //make sure log out button is using POST instead of just GET href
  let navBarButtons = (
    <ul className="nav navbar-nav" style={{ gap: "1rem" }}>
      <li className="nav-item">
        <a
          className={`fs-6 nav-link text-end ${
            pageName === "login_page" ? "active text-primary fw-bold" : ""
          }`}
          href="/auth/login"
        >
          Log In
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`fs-6 nav-link text-end ${
            pageName === "signup_page" ? "active text-primary fw-bold" : ""
          }`}
          href="/auth/signup"
        >
          Sign Up
        </a>
      </li>
    </ul>
  );

  if (user !== {}) {
    navBarButtons = (
      <ul className="nav navbar-nav" style={{ gap: "1rem" }}>
        <li className="nav-item">
          <a
            className={`fs-6 nav-link text-end ${
              pageName === "user_detail" ? "active text-primary fw-bold" : ""
            }`}
            href={`/users/${user._id}`}
          >
            {user.first_name}
          </a>
        </li>
        <li className="nav-item">
          <a className="fs-6 nav-link text-end " href="/auth/loggingout">
            Log Out
          </a>
        </li>
      </ul>
    );
  }

  return (
    <div className="App bg-light p-2">
      <header className="App-header">Some text here. front end only.</header>
      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand text-uppercase fw-bold" href="/">
              {mainTitle}
            </a>
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
              {navBarButtons}
            </div>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="border-top border-secondary py-1">block content</div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import axios from "./api/axios";

//components
import Homepage from "./Components/Homepage";
import Authpage from "./Components/Authpage";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import LogoutPage from "./Components/LogoutPage";

function App() {
  const [mainTitle, setMainTitle] = useState("");
  const [pageName, setPageName] = useState("");
  const [user, setUser] = useState(undefined);
  const [navBarButtons, setNavBarButtons] = useState(<></>);
  const [content, setContent] = useState({});

  //make sure log out button is using POST instead of just GET href

  const configureNavbarItemsBasedOnLogIn = () => {
    if (user !== undefined) {
      setNavBarButtons(
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
            <NavLink className="fs-6 nav-link text-end " to="/auth/loggingout">
              Log Out
            </NavLink>
          </li>
        </ul>
      );
    } else {
      setNavBarButtons(
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

  const getData = async () => {
    return await axios
      .get(`/`)
      .then((response) => {
        console.log(response.data);
        setUser(response.data.user || undefined);
      })
      .catch((error) => {});
  };

  //componentOnMount
  useEffect(() => {
    //do fetching
    setMainTitle("Anon Blog");
    getData();
    configureNavbarItemsBasedOnLogIn();
  }, []);

  //check if user changed
  useEffect(() => {
    configureNavbarItemsBasedOnLogIn();
  }, [user]);

  return (
    <div className="App bg-light p-2">
      <BrowserRouter>
        <header className="App-header">Some text here. front end only.</header>
        <div className="container-fluid p-0">
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
                {navBarButtons}
              </div>
            </div>
          </nav>
          <div className="container-fluid">
            <div className="border-top border-secondary py-1">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Homepage
                    // allPosts={content && content.posts}
                    // user={content && content.user}
                    />
                  }
                />

                <Route
                  path="auth"
                  element={<Authpage user={content && content.user} />}
                >
                  <Route
                    path="login"
                    element={<LoginForm user={content && content.user} />}
                  />

                  <Route
                    path="signup"
                    element={<SignupForm user={content && content.user} />}
                  />
                  {/*
                  <Route path="loggingout" />*/}
                  <Route path="logout/:userId" element={<LogoutPage />} />
                </Route>
                {/*
                <Route path="users" element={<ProductsPage />}>
                  <Route
                    index
                    path="null"
                    element={
                      <PokeballProducts addItemToCart={updateCartItems} />
                    }
                  />
                  <Route
                    path=":userId"
                    element={
                      <PokeballProducts addItemToCart={updateCartItems} />
                    }
                  >
                    <Route
                      path=":userId/memberstatus"
                      element={
                        <PokeballProducts addItemToCart={updateCartItems} />
                      }
                    />
                  </Route>
                </Route>
                <Route path="posts" element={<ProductsPage />}>
                  <Route
                    path="create"
                    element={
                      <PokeballProducts addItemToCart={updateCartItems} />
                    }
                  />
                  <Route
                    path=":postId"
                    element={
                      <PokeballProducts addItemToCart={updateCartItems} />
                    }
                  >
                    <Route
                      path="delete"
                      element={
                        <PokeballProducts addItemToCart={updateCartItems} />
                      }
                    />
                    <Route
                      path="comments"
                      element={
                        <PokeballProducts addItemToCart={updateCartItems} />
                      }
                    >
                      <Route
                        index
                        path="create"
                        element={
                          <PokeballProducts addItemToCart={updateCartItems} />
                        }
                      />
                      <Route
                        path=":commentId/reply"
                        element={
                          <PokeballProducts addItemToCart={updateCartItems} />
                        }
                      />
                    </Route>
                  </Route>
                </Route>
                      */}
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// require("dotenv");

function App() {
  const [mainTitle, setMainTitle] = useState("");
  const [pageName, setPageName] = useState("");
  const [user, setUser] = useState(null);
  const [navBarButtons, setNavBarButtons] = useState(<></>);
  const [tempContent, setTempContent] = useState("");

  //use useEffect to alter mainTitle, pageName and user. use fetch to get res.json
  //make sure log out button is using POST instead of just GET href
  //likely need react router inside block content

  const configureNavbarItemsBasedOnLogIn = () => {
    if (user !== null) {
      setNavBarButtons(
        <ul className="nav navbar-nav" style={{ gap: "1rem" }}>
          <li className="nav-item">
            <a
              className={`fs-6 nav-link text-end ${
                pageName === "user_detail" ? "active text-primary fw-bold" : ""
              }`}
              //href={`/users/${user._id}`}
            >
              {/*user.first_name*/}
            </a>
          </li>
          <li className="nav-item">
            <a className="fs-6 nav-link text-end " href="/auth/loggingout">
              Log Out
            </a>
          </li>
        </ul>
      );
    } else {
      setNavBarButtons(
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
    }
  };

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_API_INDEX_URL}${process.env.REACT_APP_BACKEND_PORT}`;
    console.log(url);
    const response = await fetch(url);
    setMainTitle("Anon Blog");
    const items = await response.json();
    console.log(items);
    setTempContent(items);
  };

  //componentOnMount
  useEffect(() => {
    //do fetching
    fetchData();
    configureNavbarItemsBasedOnLogIn();
  }, []);

  return (
    <div className="App bg-light p-2">
      <BrowserRouter>
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
            <div className="border-top border-secondary py-1">
              {/* {tempContent.posts.map((post) => {
                return <div>{post.text}</div>;
              })} */}
              <Routes>
                {/*
                <Route path="/" element={<HomePage />} />
                <Route path="auth" element={<ProductsPage />}>
                  <Route
                    path="login"
                    element={
                      <PokeballProducts addItemToCart={updateCartItems} />
                    }
                  />
                  <Route
                    path="signup"
                    element={<PotionProducts addItemToCart={updateCartItems} />}
                  />
                  <Route
                    path="loggingout"
                    element={<ProductDetails addItemToCart={updateCartItems} />}
                  />
                  <Route
                    path="logout/:userId"
                    element={<ProductDetails addItemToCart={updateCartItems} />}
                  />
                </Route>
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

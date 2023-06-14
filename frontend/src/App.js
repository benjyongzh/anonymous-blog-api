import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "./api/axios";

import { useSelector } from "react-redux";
// import { loggedIn, loggedOut } from "./Features/auth/authSlice";

//components
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";
import Authpage from "./Components/Authpage";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import LogoutPage from "./Components/LogoutPage";

function App() {
  const [mainTitle, setMainTitle] = useState("");
  const [pageName, setPageName] = useState("");

  const user = useSelector((state) => state.auth.user);

  //make sure log out button is using POST instead of just GET href
  const getData = async () => {
    return await axios
      .get(`/`)
      .then((response) => {
        console.log("app.js response: ", response.data);
        console.log("store user: ", user);
      })
      .catch((error) => {});
  };

  //componentOnMount
  useEffect(() => {
    //do fetching
    setMainTitle("Anon Blog");
    getData();
  }, []);

  return (
    <div className="App bg-light p-2">
      <BrowserRouter>
        <div className="container-fluid p-0">
          <Navbar mainTitle={mainTitle} user={user} pageName={pageName} />
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

                <Route path="auth" element={<Authpage />}>
                  <Route path="login" element={<LoginForm />} />

                  <Route path="signup" element={<SignupForm />} />
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

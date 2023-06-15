import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";
import Errorpage from "./Components/Errorpage";
//auth components
import Authpage from "./Components/Authpage";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import LoggingOutPage from "./Components/LoggingOutPage";
import LogoutPage from "./Components/LogoutPage";
//user components
import UserNotFoundpage from "./Components/UserNotFoundpage";
import UserDetailpage from "./Components/UserDetailpage";
import UserMemberStatuspage from "./Components/UserMemberStatuspage";

function App() {
  return (
    <div className="App bg-light p-2">
      <BrowserRouter>
        <div className="container-fluid p-0">
          <Navbar />
          <div className="container-fluid">
            <div className="border-top border-secondary py-1">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="error" element={<Errorpage />} />

                <Route path="auth" element={<Authpage />}>
                  <Route path="login" element={<LoginForm />} />
                  <Route path="signup" element={<SignupForm />} />
                  <Route
                    path="loggingout/:userid"
                    element={<LoggingOutPage />}
                  />
                  <Route path="logout" element={<LogoutPage />} />
                </Route>
                <Route path="users">
                  <Route index path="null" element={<UserNotFoundpage />} />
                  <Route path=":userId" element={<UserDetailpage />} />
                  <Route
                    path=":userId/memberstatus"
                    element={<UserMemberStatuspage />}
                  />
                </Route>
                {/*
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

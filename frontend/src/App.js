import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Navbar from "./Components/Navbar";
import Homepage from "./Layouts/Homepage";
import Errorpage from "./Layouts/Errorpage";
//auth components
import Authpage from "./Layouts/Authpage";
import LoginForm from "./Layouts/LoginForm";
import SignupForm from "./Layouts/SignupForm";
import LoggingOutPage from "./Layouts/LoggingOutPage";
import LogoutPage from "./Layouts/LogoutPage";
//user components
import UserNotFoundpage from "./Layouts/UserNotFoundpage";
import UserDetailpage from "./Layouts/UserDetailpage";
import UserMemberStatuspage from "./Layouts/UserMemberStatuspage";
//post components
import PostDetailpage from "./Layouts/PostDetailpage";
import PostCreatePage from "./Layouts/PostCreatePage";

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

                <Route path="posts">
                  <Route path="create" element={<PostCreatePage />} />
                  <Route path=":postId" element={<PostDetailpage />}>
                    {/* <Route
                      path="delete"
                      element={
                        <PokeballProducts addItemToCart={updateCartItems} />
                      }
                    />
                    <Route
                      path="comments/create"
                      element={
                        <PokeballProducts addItemToCart={updateCartItems} />
                      }
                    />
                    <Route
                      path="comments/:commentid/reply"
                      element={
                        <PokeballProducts addItemToCart={updateCartItems} />
                      }
                    /> */}
                  </Route>
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

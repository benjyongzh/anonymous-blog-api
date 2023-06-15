import { useLocation, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

import { useDispatch } from "react-redux";
import { loggedIn } from "../Features/auth/authSlice";
import { setPageName } from "../Features/page/pageSlice";

import ErrorList from "./ErrorList";
import FormInput from "./FormInput";

function LoginForm(props) {
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const dispatch = useDispatch();

  const getData = async () => {
    return await axiosInstance
      .get(`${location.pathname}`)
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setErrors([{ path: "generic", msg: "Connection to server failed" }]);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const responseObject = await axiosInstance
      .post(
        `${location.pathname}`,
        JSON.stringify({ username, password, confirmpassword })
      )
      .then((response) => {
        // console.log("response: ", response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        setErrors([{ path: "generic", msg: "Connection to server failed" }]);
        setLoginSuccess(false);
      });

    if (responseObject.errors) {
      //there are still errors in the form
      setErrors(responseObject.errors);
      setLoginSuccess(false);
    } else {
      // console.log(responseObject);
      dispatch(
        loggedIn({
          auth_token: responseObject.token,
          user: responseObject.user,
        })
      );

      // fetch pages with header: Authorization: Bearer <token>. use redirect if necessary
      setLoginSuccess(true);
    }
  };

  //componentOnMount
  useEffect(() => {
    dispatch(setPageName("login"));
    //do fetching
    getData();
  }, []);

  // useEffect(() => {
  //   //do fetching
  //   console.log("errors: ", errors);
  // }, [errors]);

  return loginSuccess ? (
    <Navigate to="/" replace={true} />
  ) : (
    <form onSubmit={handleSubmit}>
      <FormInput
        inputName="username"
        inputType="text"
        placeholder="username123"
        inputRequired={true}
        labelText="Username"
        handleChange={setUsername}
        errors={errors}
      />
      <FormInput
        inputName="password"
        inputType="password"
        placeholder="password123"
        inputRequired={true}
        labelText="Password"
        handleChange={setPassword}
        errors={errors}
      />
      <FormInput
        inputName="confirmpassword"
        inputType="password"
        placeholder="password123"
        inputRequired={true}
        labelText="Confirm Password"
        handleChange={setConfirmpassword}
        errors={errors}
      />
      <ErrorList errors={errors} includePaths={["generic"]} />
      <div className="mt-1 text-center form-group">
        <button className="w-100 btn btn-primary" type="submit">
          Submit
        </button>
      </div>
      <p className="mt-3">
        Not signed up yet? Create an account <Link to="/auth/signup">here</Link>
        <span>.</span>
      </p>
    </form>
  );
}

export default LoginForm;

import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

import { useDispatch, useSelector } from "react-redux";
import { loggedIn, loggedOut } from "../Features/auth/authSlice";

import ErrorList from "./ErrorList";
import FormInput from "./FormInput";

function LoginForm(props) {
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const dispatch = useDispatch();

  const getData = async () => {
    return await axios
      .get(`${location.pathname}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setErrors([{ path: "generic", msg: "Connection to server failed" }]);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const responseObject = await axios
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
      });

    if (responseObject.errors) {
      //there are still errors in the form
      setErrors(responseObject.errors);
    } else {
      //get redirect? find out how to go to index page upon successful sign in. maybe server has to do redirecting. what about different port?
      console.log(responseObject);
      // save token to localstorage as "token"
      // localStorage.setItem("auth_token", "Bearer " + responseObject.token);
      dispatch(
        loggedIn({
          auth_token: responseObject.token,
          user: responseObject.user,
        })
      );

      // fetch pages with header: Authorization: Bearer <token>. use redirect if necessary
    }
  };

  //componentOnMount
  useEffect(() => {
    //do fetching
    getData();
  }, []);
  useEffect(() => {
    //do fetching
    console.log("errors: ", errors);
  }, [errors]);

  return (
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

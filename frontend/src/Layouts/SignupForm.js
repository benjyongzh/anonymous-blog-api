import { useLocation, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

import { useDispatch } from "react-redux";
import { loggedIn } from "../Features/auth/authSlice";
import { setPageName, setMainId } from "../Features/page/pageSlice";

import ErrorList from "../Components/ErrorList";
import FormInput from "../Components/FormInput";

function SignupForm() {
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const dispatch = useDispatch();

  const getData = async () => {
    return await axiosInstance
      .get(`${location.pathname}`)
      .then((response) => {})
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
        JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username,
          password,
          confirmpassword,
        })
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        // console.log(error);
        setErrors([{ path: "generic", msg: "Connection to server failed" }]);
        setSignupSuccess(false);
      });

    if (responseObject.errors) {
      //there are still errors in the form
      setErrors(responseObject.errors);
      setSignupSuccess(false);
    } else {
      // console.log(responseObject);
      dispatch(
        loggedIn({
          auth_token: responseObject.token,
          user: responseObject.user,
        })
      );

      setSignupSuccess(true);
    }
  };

  //componentOnMount
  useEffect(() => {
    dispatch(setPageName("signup"));
    dispatch(setMainId(""));
    //do fetching
    getData();
  }, []);

  //for testing errors
  // useEffect(() => {
  //   console.log("errors: ", errors);
  // }, [errors]);

  return signupSuccess ? (
    <Navigate to="/" replace={true} />
  ) : (
    <form onSubmit={handleSubmit}>
      <FormInput
        inputName="first_name"
        inputType="text"
        placeholder="Jacky"
        inputRequired={true}
        labelText="First Name"
        handleChange={setFirstName}
        errors={errors}
      />

      <FormInput
        inputName="last_name"
        inputType="text"
        placeholder="Chan"
        inputRequired={true}
        labelText="Last Name"
        handleChange={setLastName}
        errors={errors}
      />
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
      <ErrorList
        errors={errors}
        excludePaths={[
          "first_name",
          "last_name",
          "username",
          "password",
          "confirmpassword",
        ]}
      />
      <div className="mt-2 text-center form-group">
        <button className="w-100 btn btn-primary" type="submit">
          Submit
        </button>
      </div>
      <p className="mt-2">
        Already have an account? Log in <Link to="/auth/login">here</Link>
        <span>.</span>
      </p>
    </form>
  );
}

export default SignupForm;

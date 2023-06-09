import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import ErrorList from "./ErrorList";
import FormInput from "./FormInput";

function SignupForm(props) {
  const [errors, setErrors] = useState([]);
  const location = useLocation();

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_API_INDEX_URL}${process.env.REACT_APP_BACKEND_PORT}${location.pathname}`;
    const response = await fetch(url);
    if (response) {
      const responseItems = await response.json();
      setErrors(responseItems.errors || []);
    } else {
      setErrors([{ path: "fetching data", msg: "Could not fetch" }]);
    }
  };

  //componentOnMount
  useEffect(() => {
    //do fetching
    fetchData();
  }, []);

  return (
    <form method="POST" action="">
      <FormInput
        inputName="first_name"
        inputType="text"
        placeholder="Jacky"
        inputRequired={true}
        labelText="First Name"
      />

      <FormInput
        inputName="last_name"
        inputType="text"
        placeholder="Chan"
        inputRequired={true}
        labelText="Last Name"
      />
      <FormInput
        inputName="username"
        inputType="text"
        placeholder="username123"
        inputRequired={true}
        labelText="Username"
      />
      <FormInput
        inputName="password"
        inputType="password"
        placeholder="password123"
        inputRequired={true}
        labelText="Password"
      />
      <FormInput
        inputName="confirmpassword"
        inputType="password"
        placeholder="password123"
        inputRequired={true}
        labelText="Confirm Password"
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

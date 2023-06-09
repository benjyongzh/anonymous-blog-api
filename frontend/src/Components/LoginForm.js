import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import ErrorList from "./ErrorList";
import FormInput from "./FormInput";

function LoginForm(props) {
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_API_INDEX_URL}${process.env.REACT_APP_BACKEND_PORT}${location.pathname}`;
    const response = await fetch(url);
    if (response) {
      const responseItems = await response.json();
      console.log(responseItems);
      setErrors(responseItems.errors || []);
    } else {
      setErrors([{ path: "fetching data", msg: "Could not fetch" }]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_API_INDEX_URL}${process.env.REACT_APP_BACKEND_PORT}${location.pathname}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify({ username, password, confirmpassword }),
    });
    const responseObject = await response.json();
    // console.log(responseObject);
    setErrors(responseObject.errors || []);
  };

  //componentOnMount
  useEffect(() => {
    //do fetching
    fetchData();
  }, []);

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

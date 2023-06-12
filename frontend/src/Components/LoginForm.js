import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDataGet, fetchDataPost } from "../Utils/fetch";

import ErrorList from "./ErrorList";
import FormInput from "./FormInput";

function LoginForm(props) {
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const getData = async () => {
    const data = await fetchDataGet(`${location.pathname}`);
    if (!data) {
      setErrors([{ path: "fetching data", msg: "Could not fetch" }]);
      return;
    }
    console.log(data);
    setErrors(responseItems.errors || []);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const responseObject = await fetchDataPost(
      `${location.pathname}`,
      {
        "Content-type": "application/json",
      },
      { username, password, confirmpassword }
    );

    if (!responseObject) {
      setErrors([{ path: "fetching data", msg: "Could not fetch" }]);
      return;
    }

    if (responseObject.errors) {
      //there are still errors in the form
      setErrors(responseObject.errors);
    } else {
      //get redirect? find out how to go to index page upon successful sign in. maybe server has to do redirecting. what about different port?
      console.log(responseObject);
      // save token to localstorage as "token"
      localStorage.setItem("token", "Bearer " + responseObject.token);

      // fetch pages with header: Authorization: Bearer <token>. use redirect if necessary
    }
  };

  //componentOnMount
  useEffect(() => {
    //do fetching
    getData();
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

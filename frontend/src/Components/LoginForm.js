import { Link } from "react-router-dom";

import ErrorMessage from "./ErrorMessage";
import FormInput from "./FormInput";

function LoginForm(props) {
  // const { user: currentUser } = props;
  // let { authType } = useParams();
  //   const location = useLocation();

  return (
    <form method="POST" action="">
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
      <p className="mt-1">
        {/*need to use redux to get error messages 
                if errors 
                    for error in errors 
                        if error.path==="username"
                            span(class='text-danger') #{error.msg}
                        else
                            span &nbsp;
                    else
                        span &nbsp;*/}
      </p>
      <div className="mt-2 text-center form-group">
        <button className="w-100 btn btn-primary" type="submit">
          Submit
        </button>
      </div>
      <p className="mt-2">
        Not signed up yet? Create an account <Link to="/auth/signup">here</Link>
        <span>.</span>
      </p>
    </form>
  );
}

export default LoginForm;

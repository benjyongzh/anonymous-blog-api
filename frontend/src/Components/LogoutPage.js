import { Link, useLocation } from "react-router-dom";

function LogoutPage(props) {
  const { state } = useLocation();
  const { username } = state;

  return (
    <div className="text-center">
      <p className="text-center">
        {username}, you have been logged out successfully.
      </p>
      <Link className="btn btn-primary mt-3" to="/">
        Go back home
      </Link>
    </div>
  );
}

export default LogoutPage;

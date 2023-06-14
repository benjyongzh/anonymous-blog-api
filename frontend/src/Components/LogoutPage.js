import { Link } from "react-router-dom";
import { useEffect } from "react";
// import axios from "../api/axios";

// import { useDispatch, useSelector } from "react-redux";
// import { loggedIn, loggedOut } from "../Features/auth/authSlice";

function LogoutPage(props) {
  const { username } = props;
  // const location = useLocation();

  // const fetchData = async () => {
  //   return await axios
  //     .get(`${location.pathname}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       const username = response.data.user.username;
  //       setLoggedOutText(`${username}, you have been logged out successfully.`);
  //     })
  //     .catch((error) => setLoggedOutText(error.message));
  // };

  //componentOnMount
  useEffect(() => {
    //do fetching
    fetchData();
  }, []);

  return (
    <div>
      <p className="text-center">
        `${username}, you have been logged out successfully.`
      </p>
      <Link className="btn btn-primary mt-3" to="/">
        Go back home
      </Link>
      <span>.</span>
    </div>
  );
}

export default LogoutPage;

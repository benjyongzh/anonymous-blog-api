import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

function LogoutPage(props) {
  const [loggedOutText, setLoggedOutText] = useState("Logging you out");
  const location = useLocation("");

  const fetchData = async () => {
    return await axios
      .get(`${location.pathname}`)
      .then((response) => {
        console.log(response.data);
        const username = response.data.user.username;
        setLoggedOutText(`${username}, you have been logged out successfully.`);
      })
      .catch((error) => setLoggedOutText(error.message));
  };

  //componentOnMount
  useEffect(() => {
    //do fetching
    fetchData();
  }, []);

  return (
    <div>
      <p className="text-center">{loggedOutText}</p>
      <Link className="btn btn-primary mt-3" to="/">
        Go back home
      </Link>
      <span>.</span>
    </div>
  );
}

export default LogoutPage;

import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function LogoutPage(props) {
  const [loggedOutText, setLoggedOutText] = useState("Logging you out");
  const location = useLocation("");

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_API_INDEX_URL}${process.env.REACT_APP_BACKEND_PORT}${location}`;
    const response = await fetch(url);
    if (response) {
      const responseItems = await response.json();
      const username = responseItems.user.username;
      setLoggedOutText(`${username}, you have been logged out successfully.`);
    } else {
      setLoggedOutText("Error logging out");
    }
  };

  //componentOnMount
  useEffect(() => {
    //do fetching
    fetchData();
  }, []);

  return (
    <div>
      <p className="text-center">{setLoggedOutText}</p>
      <Link className="btn btn-primary mt-3" to="/">
        Go back home
      </Link>
      <span>.</span>
    </div>
  );
}

export default LogoutPage;

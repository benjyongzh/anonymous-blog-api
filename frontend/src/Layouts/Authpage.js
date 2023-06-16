import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { pageNameList } from "../Features/page/pageSlice";

function Authpage(props) {
  const pageName = useSelector((state) => state.page.pageName);

  return (
    <div
      className="d-flex flex-column align-items-stretch justify-content-center container"
      style={{ maxWidth: "380px" }}
    >
      <h3 className="text-center m-4">{pageNameList[pageName]}</h3>
      <Outlet />
    </div>
  );
}

export default Authpage;

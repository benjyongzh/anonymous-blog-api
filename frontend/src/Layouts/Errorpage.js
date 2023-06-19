import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setPageName, setMainId } from "../Features/page/pageSlice";
import { pageNameList } from "../Features/page/pageSlice";

import React from "react";

function Errorpage() {
  const { state } = useLocation();
  const { message } = state;
  const dispatch = useDispatch();
  const pageName = useSelector((state) => state.page.pageName);

  //componentOnMount
  useEffect(() => {
    dispatch(setPageName("error"));
    dispatch(setMainId(""));
  }, []);

  return (
    <div className="mt-4 d-flex flex-column align-items-center justify-content-center container">
      <h3 className="text-center m-4">{pageNameList[pageName]}</h3>
      <h6 className="text-center m-4">{message}</h6>
      <Link className="btn btn-primary mt-3 px-4" to="/">
        Back
      </Link>
    </div>
  );
}

export default Errorpage;

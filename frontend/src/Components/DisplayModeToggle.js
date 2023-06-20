import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setDisplayMode } from "../Features/display/displaySlice";
import { isEmpty } from "lodash";

function Navbar() {
  const displayMode = useSelector((state) => state.display.mode);
  const dispatch = useDispatch();

  const toggleDisplayMode = () => {
    displayMode === "light"
      ? dispatch(setDisplayMode("dark"))
      : dispatch(setDisplayMode("light"));
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-bs-theme", displayMode);
  }, [displayMode]);

  return (
    <div className="d-flex gap-1">
      <label className="form-check-label" htmlFor="displayModeSwitch">
        <i className="bx align-bottom mb-1 bxs-sun"></i>
      </label>
      <div className="form-check form-switch ms-2">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="displayModeSwitch"
          checked={displayMode === "dark"}
          onChange={toggleDisplayMode}
        ></input>
      </div>
      <label className="form-check-label" htmlFor="displayModeSwitch">
        <i className="bx align-bottom mb-1 bxs-moon"></i>
      </label>
    </div>
  );
}

export default Navbar;

import { useEffect } from "react";
import "../Styles/displayModeToggle.css";
import Icon from "@mdi/react";
import {
  mdiWhiteBalanceSunny,
  mdiWeatherNight,
  mdiMoonWaningCrescent,
} from "@mdi/js";

import { useSelector, useDispatch } from "react-redux";
import { setDisplayMode } from "../Features/display/displaySlice";

function DisplayModeToggle() {
  const displayMode = useSelector((state) => state.display.mode);
  const dispatch = useDispatch();

  const toggleDisplayMode = () => {
    displayMode === "light" ? setDarkMode() : setLightMode();
  };

  const setDarkMode = () => {
    // set custom callback here
    dispatch(setDisplayMode("dark"));
  };

  const setLightMode = () => {
    // set custom callback here
    dispatch(setDisplayMode("light"));
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-bs-theme", displayMode);
  }, [displayMode]);

  return (
    <div className="displaymode-switch">
      <label className="switch">
        <input type="checkbox" onChange={toggleDisplayMode} />
        <span className="slider">
          <div className="slider-control">
            <Icon
              className="slider-icon"
              path={
                displayMode === "light"
                  ? mdiWhiteBalanceSunny
                  : mdiMoonWaningCrescent
              }
              size={0.65}
              color={"snow"}
              rotate={-30}
            />
          </div>
        </span>
      </label>
    </div>
  );
}

export default DisplayModeToggle;

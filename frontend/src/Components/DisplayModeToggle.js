import { useEffect } from "react";
import "../Styles/displayModeToggle.css";
import Icon from "@mdi/react";
import { mdiWhiteBalanceSunny, mdiMoonWaningCrescent } from "@mdi/js";

function DisplayModeToggle(props) {
  const { setLightMode, setDarkMode, displayState } = props;

  const toggleDisplayMode = () => {
    displayState === "light" ? setDarkMode() : setLightMode();
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-bs-theme", displayState);
  }, [displayState]);

  return (
    <div className="displaymode-switch">
      <label className="switch">
        <input type="checkbox" onChange={toggleDisplayMode} />
        <span className="slider">
          <div className="slider-control">
            <Icon
              className="slider-icon"
              path={
                displayState === "light"
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

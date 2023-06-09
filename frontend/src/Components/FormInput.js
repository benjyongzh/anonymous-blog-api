import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ErrorMessage from "./ErrorMessage";
import ErrorList from "./ErrorList";

function FormInput(props) {
  const { inputName, inputType, placeholder, inputRequired, labelText } = props;
  const location = useLocation();
  const [errors, setErrors] = useState([]);

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_API_INDEX_URL}${process.env.REACT_APP_BACKEND_PORT}${location.pathname}`;
    const response = await fetch(url);
    if (response) {
      const responseItems = await response.json();
      setErrors(responseItems.errors || []);
    } else {
      setErrors([{ path: "fetching data", msg: "Could not fetch" }]);
    }
  };

  //componentOnMount
  useEffect(() => {
    //do fetching
    fetchData();
  }, []);

  return (
    <div className="mt-3 form-group">
      <div className="form-floating mb-1">
        <input
          id={inputName}
          className="form-control"
          type={inputType}
          placeholder={placeholder}
          name={inputName}
          required={inputRequired}
        ></input>
        <label className="mt-1" htmlFor={inputName}>
          {labelText}
        </label>
      </div>
      <ErrorList errors={errors} includePaths={[inputName]} />
    </div>
  );
}

export default FormInput;

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ErrorList from "./ErrorList";

function FormInput(props) {
  const {
    inputName,
    inputType,
    placeholder,
    inputRequired,
    labelText,
    errors,
    handleChange,
  } = props;

  return (
    <div className="mt-1 form-group">
      <div className="form-floating mb-1">
        <input
          id={inputName}
          className="form-control"
          type={inputType}
          placeholder={placeholder}
          name={inputName}
          required={inputRequired}
          onChange={(e) => handleChange(e.target.value)}
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

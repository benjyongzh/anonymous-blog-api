import { useState } from "react";

import ErrorList from "./ErrorList";

function FormInput(props) {
  const [hasError, setHasError] = useState(false);

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
          className={`form-control ${hasError ? "is-invalid" : null}`}
          type={inputType}
          placeholder={placeholder}
          name={inputName}
          required={inputRequired}
          onChange={(e) => handleChange(e.target.value)}
        ></input>
        <label htmlFor={inputName}>{labelText}</label>
      </div>
      <ErrorList
        errors={errors}
        includePaths={[inputName]}
        checkFormInputValidityStyle={(bool) => setHasError(bool)}
      />
    </div>
  );
}

export default FormInput;

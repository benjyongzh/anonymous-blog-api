import ErrorMessage from "./ErrorMessage";
import { useState, useEffect } from "react";

function ErrorList(props) {
  const [hasErrorMessage, setHasErrorMessage] = useState(false);
  const filteredErrors = props.errors.filter((error) => {
    if (error.path) {
      return (
        (props.excludePaths && !props.excludePaths.includes(error.path)) ||
        (props.includePaths && props.includePaths.includes(error.path))
      );
    }
    return props.includes("generic");
  });

  useEffect(() => {
    // console.log(props);
    setHasErrorMessage(filteredErrors.length > 0);
    props.checkFormInputValidityStyle
      ? props.checkFormInputValidityStyle(hasErrorMessage)
      : null;
  });

  return (
    <p className="mt-1 mb-1" style={{ height: "35px" }}>
      {props.errors.length && filteredErrors.length ? (
        <ErrorMessage
          path={filteredErrors[0].path}
          message={filteredErrors[0].msg || filteredErrors[0].message}
        />
      ) : (
        <span>&nbsp;</span>
      )}
    </p>
  );
}

export default ErrorList;

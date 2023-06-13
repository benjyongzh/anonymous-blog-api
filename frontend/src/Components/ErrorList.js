import ErrorMessage from "./ErrorMessage";

function ErrorList(props) {
  const filteredErrors = props.errors.filter((error) => {
    if (error.path) {
      return (
        (props.excludePaths && !props.excludePaths.includes(error.path)) ||
        (props.includePaths && props.includePaths.includes(error.path))
      );
    }
    return props.includes("generic");
  });

  return (
    <p className="mt-1 mb-1" style={{ height: "35px" }}>
      {props.errors.length && filteredErrors.length ? (
        <ErrorMessage
          path={filteredErrors[0].path}
          message={filteredErrors[0].msg || filteredErrors[0].message}
        />
      ) : (
        <span key="0">&nbsp;</span>
      )}
    </p>
  );
}

export default ErrorList;

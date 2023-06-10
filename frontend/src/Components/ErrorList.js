import ErrorMessage from "./ErrorMessage";

function ErrorList(props) {
  return (
    <p className="mt-1 mb-1" style={{ height: "35px" }}>
      {props.errors.length ? (
        props.errors.map((error) => {
          if (error.path) {
            if (
              (props.excludePaths &&
                !props.excludePaths.includes(error.path)) ||
              (props.includePaths && props.includePaths.includes(error.path))
            ) {
              return (
                <ErrorMessage
                  key={props.errors.indexOf(error)}
                  path={error.path}
                  message={error.msg || error.message}
                />
              );
            } else {
              return <span key={props.errors.indexOf(error)}>&nbsp;</span>;
            }
          } else {
            if (props.includes("generic")) {
              return (
                <ErrorMessage
                  key={props.errors.indexOf(error)}
                  message={error.msg || error.message}
                />
              );
            } else {
              return <span key={props.errors.indexOf(error)}>&nbsp;</span>;
            }
          }
        })
      ) : (
        <span key="0">&nbsp;</span>
      )}
    </p>
  );
}

export default ErrorList;

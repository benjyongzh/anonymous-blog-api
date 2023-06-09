import ErrorMessage from "./ErrorMessage";

function ErrorList(props) {
  return (
    <p className="mt-1 mb-1" style={{ height: "45px" }}>
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
                  id={error.path}
                  path={error.path}
                  message={error.msg || error.message}
                />
              );
            } else {
              return <span>&nbsp;</span>;
            }
          } else {
            return (
              <ErrorMessage
                id={error.msg || error.message}
                path={"generic"}
                message={error.msg || error.message}
              />
            );
          }
        })
      ) : (
        <span>&nbsp;</span>
      )}
    </p>
  );
}

export default ErrorList;

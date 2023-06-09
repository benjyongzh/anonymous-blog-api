import ErrorMessage from "./ErrorMessage";

function ErrorList(props) {
  const errorComponent = props.errors.map((error) => {
    if (
      !props.excludePaths.includes(error.path) ||
      props.includePaths.includes(error.path)
    ) {
      return (
        <ErrorMessage id={error.path} path={error.path} message={error.msg} />
      );
    } else {
      return <span> </span>;
    }
  });

  return (
    <p className="mt-1">
      {props.errors.length ? { errorComponent } : <span> </span>}
    </p>
  );
}

export default ErrorList;

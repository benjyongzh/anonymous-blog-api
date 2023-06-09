function ErrorMessage(props) {
  return (
    <p className="text-danger">
      Error{props.path ? ` in ${props.path}` : ""}: {props.message}
    </p>
  );
}

export default ErrorMessage;

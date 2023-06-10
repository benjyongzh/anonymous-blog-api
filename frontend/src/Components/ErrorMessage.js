function ErrorMessage(props) {
  return (
    <span className="text-danger" style={{ fontSize: "12px" }}>
      Error{/*props.path ? ` in ${props.path}` : ""*/}: {props.message}
    </span>
  );
}

export default ErrorMessage;

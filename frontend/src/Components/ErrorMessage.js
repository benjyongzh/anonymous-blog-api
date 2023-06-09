function ErrorMessage(props) {
  return (
    <p className="text-danger" style={{ fontSize: "12px" }}>
      Error{/*props.path ? ` in ${props.path}` : ""*/}: {props.message}
    </p>
  );
}

export default ErrorMessage;

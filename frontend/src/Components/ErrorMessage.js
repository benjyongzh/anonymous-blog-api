function ErrorMessage(props) {
  return (
    <span className="text-danger" style={{ fontSize: "12px" }}>
      {/* Errorprops.path ? ` in ${props.path}` : "":  */}
      {props.message}
    </span>
  );
}

export default ErrorMessage;

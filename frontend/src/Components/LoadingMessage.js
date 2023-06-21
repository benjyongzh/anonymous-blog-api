function LoadingMessage(props) {
  return (
    <div className="text-center">
      <p className="text-secondary">
        <i className="bx align-bottom mb-1 bx-loader-circle bx-spin bx-flip-horizontal"></i>
        &nbsp;Loading {props.message}...
      </p>
    </div>
  );
}

export default LoadingMessage;

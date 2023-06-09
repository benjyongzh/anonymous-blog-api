function LoadingMessage(props) {
  return (
    <div className="text-center">
      <p className="text-secondary">Loading {props.message}...</p>
    </div>
  );
}

export default LoadingMessage;

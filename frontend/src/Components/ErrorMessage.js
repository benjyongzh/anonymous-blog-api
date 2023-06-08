function HomePage(props) {
  return (
    <p className="text-danger">
      Error{props.path ? ` in ${props.path}` : ""}: {props.message}
    </p>
  );
}

export default HomePage;

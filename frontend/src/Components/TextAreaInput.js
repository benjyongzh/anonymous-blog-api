import ErrorList from "./ErrorList";

function TextAreaInput(props) {
  const {
    inputName,
    placeholder,
    inputRequired,
    labelText,
    errors,
    handleChange,
    value,
  } = props;

  return (
    <div className="mt-3 form-group">
      <div className="form-floating mb-0">
        <textarea
          id={inputName}
          className="form-control"
          placeholder={placeholder}
          name={inputName}
          required={inputRequired}
          onChange={(e) => handleChange(e.target.value)}
          style={{ height: "150px" }}
        >
          {value}
        </textarea>
        <label htmlFor={inputName}>{labelText}</label>
      </div>
      <ErrorList errors={errors} includePaths={[inputName]} />
    </div>
  );
}

export default TextAreaInput;

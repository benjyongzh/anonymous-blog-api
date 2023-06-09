import ErrorMessage from "./ErrorMessage";

function FormInput(props) {
  const { inputName, inputType, placeholder, inputRequired, labelText } = props;

  return (
    <div className="mt-3 form-group">
      <div className="form-floating mb-1">
        <input
          id={inputName}
          className="form-control"
          type={inputType}
          placeholder={placeholder}
          name={inputName}
          required={inputRequired}
        ></input>
        <label className="mt-1" htmlFor={inputName}>
          {labelText}
        </label>
      </div>
      <p className="mt-1">
        {/*need to use redux to get error messages 
                if errors 
                    for error in errors 
                        if error.path==="username"
                            span(class='text-danger') #{error.msg}
                        else
                            span &nbsp;
                    else
                        span &nbsp;*/}
      </p>
    </div>
  );

  // return (
  //   <div
  //     className="d-flex flex-column align-items-stretch justify-content-center container"
  //     style={{ maxWidth: "380px" }}
  //   >
  //     <h3 className="text-center m-4">{authType}</h3>
  //     <Outlet />
  //   </div>
  // );
}

export default FormInput;

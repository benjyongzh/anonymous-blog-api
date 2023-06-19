import { useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

import { useSelector, useDispatch } from "react-redux";
import { setPageName, pageNameList } from "../Features/page/pageSlice";

import ErrorList from "../Components/ErrorList";
import FormInput from "../Components/FormInput";

function UserMemberStatuspage() {
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [newMemberPassword, setNewMemberPassword] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const pageName = useSelector((state) => state.page.pageName);
  const dispatch = useDispatch();

  const getData = async () => {
    return await axiosInstance
      .get(`${location.pathname}`)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
        setErrors([{ path: "generic", msg: "Connection to server failed" }]);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUpdateLoading(true);
    await axiosInstance
      .post(
        `${location.pathname}`,
        JSON.stringify({ member_password: newMemberPassword })
      )
      .then((response) => {
        // console.log("response: ", response);
        setUpdateLoading(false);
        if (response.data.errors) {
          //there are still errors in the form
          setErrors(response.data.errors);
          setUpdateSuccess(false);
        } else {
          //success
          setNewMemberPassword("");
          setUpdateSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrors([{ path: "generic", msg: "Connection to server failed" }]);
        setUpdateLoading(false);
        setUpdateSuccess(false);
      });
  };

  //componentOnMount
  useEffect(() => {
    dispatch(setPageName("member_status"));
    //do fetching
    getData();
  }, []);

  return updateSuccess ? (
    <Navigate to={currentUser.url} />
  ) : (
    <div
      className="d-flex flex-column align-items-stretch justify-content-center container"
      style={{ maxWidth: "380px" }}
    >
      <h3 className="m-4 text-center">{pageNameList[pageName]}</h3>
      <p className="m-2 text-center">
        Key in the secret passcode to become either a{" "}
        <strong>Premium Member</strong> or an <strong>Admin</strong>.
      </p>
      <form onSubmit={handleSubmit}>
        <FormInput
          inputName="member_password"
          inputType="password"
          placeholder="passcode"
          inputRequired={true}
          labelText="Passcode"
          handleChange={setNewMemberPassword}
          errors={errors}
        />
        <ErrorList errors={errors} includePaths={["generic"]} />
        <div className="d-flex justify-content-center mt-4">
          <button
            className="w-100 btn btn-primary me-3"
            type="submit"
            style={{ maxWidth: "250px" }}
          >
            Confirm
          </button>
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="w-100 btn btn-outline-secondary ms-3"
            style={{ maxWidth: "250px" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserMemberStatuspage;

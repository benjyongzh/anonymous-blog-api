import { useLocation, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

import { useDispatch, useSelector } from "react-redux";
import { setPageName, pageNameList } from "../Features/page/pageSlice";

import ErrorList from "../Components/ErrorList";
import FormInput from "../Components/FormInput";
import TextAreaInput from "../Components/TextAreaInput";

function PostCreatePage() {
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [createSuccess, setCreateSuccess] = useState(false);
  const [postUrl, setPostUrl] = useState("/");

  const dispatch = useDispatch();
  const pageName = useSelector((state) => state.page.pageName);

  const getData = async () => {
    return await axiosInstance
      .get(`${location.pathname}`)
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setErrors([{ path: "generic", msg: "Connection to server failed" }]);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const responseObject = await axiosInstance
      .post(`${location.pathname}`, JSON.stringify({ title, text }))
      .then((response) => {
        // console.log("response: ", response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        setErrors([{ path: "generic", msg: "Connection to server failed" }]);
        setCreateSuccess(false);
      });

    if (responseObject.errors) {
      //there are still errors in the form
      setErrors(responseObject.errors);
      setCreateSuccess(false);
    } else {
      //redirect to this new post. use response.data.post.url
      setPostUrl(responseObject.post.url);
      setCreateSuccess(true);
    }
  };

  //componentOnMount
  useEffect(() => {
    dispatch(setPageName("post_create"));
    //do fetching
    getData();
  }, []);

  return createSuccess ? (
    <Navigate to={postUrl} replace={true} />
  ) : (
    <div
      className="d-flex flex-column align-items-stretch justify-content-center container"
      style={{ maxWidth: "380px" }}
    >
      <h3 className="text-center m-4">{pageNameList[pageName]}</h3>
      <form onSubmit={handleSubmit}>
        <FormInput
          inputName="title"
          inputType="text"
          placeholder="title of post here"
          inputRequired={true}
          labelText="Title of Post"
          handleChange={setTitle}
          errors={errors}
        />
        <TextAreaInput
          inputName="text"
          placeholder="Max. 300 characters"
          inputRequired={false}
          labelText={`Optional text`}
          errors={errors}
          handleChange={setText}
          defaultValue={text}
          style={{ height: "200px" }}
        />
        <ErrorList errors={errors} includePaths={["generic"]} />
        <div className="d-flex justify-content-center mt-2">
          <button
            className="w-100 btn btn-primary me-3"
            type="submit"
            style={{ maxWidth: "250px" }}
          >
            Create
          </button>
          <Link
            to="/"
            type="button"
            className="w-100 btn btn-outline-secondary ms-3"
            style={{ maxWidth: "250px" }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default PostCreatePage;

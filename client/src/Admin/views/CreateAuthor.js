import AuthorForm from "../Components/ManageBooks/authorForm";
import axios from "axios";
import React, { useState } from "react";
import Navbar from "../Components/Navigation/Navbar";
import { navigate } from "@reach/router";

export default function CreateAuthor(props) {
  const [errors, setErrors] = useState({});

  const createAuthorInfo = (authorData) => {
    console.log("data recieved on create from" + authorData)
    axios
      .post("http://localhost:8000/api/authors", authorData,{
        withCredentials: true,
      })
      .then((res) => {
        //console.log(res.data._id);
      navigate("/admin/authors");
      })
      .catch((err) => {
        //console.log(err.response);
        setErrors(err.response.data.errors);
      });
  };
  return (
    <div>
         <Navbar/>
        <AuthorForm
          authorData=""
          errors={errors}
          onSubmitProp={createAuthorInfo}
          isEdit="false"
        ></AuthorForm>
    </div>
  );
}

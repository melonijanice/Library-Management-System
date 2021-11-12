import AuthorForm from "../Components/ManageBooks/authorForm";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import Navbar from "../Components/Navigation/Navbar";

export default function EditAuthor(props) {
  const [errors, setErrors] = useState({});
  const [authors, setAuthor] = useState({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/authors/" + props.id, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data)
        setAuthor(res.data);
        setLoaded(true)
      })
      //.catch((err) => navigate("/product/"));
  }, []);
  const updateAuthorInfo=(authorData)=>
  {
    console.log("Edit data" + authorData);
    axios
    .put("http://localhost:8000/api/authors/" + props.id, authorData, {
        withCredentials: true,
      })
    .then((res) => {
      navigate(`/admin/authors`);
    })
    .catch((err) => {
      setErrors(err.response.data.errors);
      return "errors"
    });
  }
  return (
    <div>
        <Navbar/>
      {loaded && (
        <AuthorForm
        authorData={authors}
        errors={errors}
        onSubmitProp={updateAuthorInfo}
        isEdit="true"
      ></AuthorForm>
      )}
    </div>
  );
  
}
import UserForm from "../Components/ManageUsers/UserForm";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Home from "../Components/pages/home";
import { navigate } from "@reach/router";
import Navbar from "../Components/Navigation/Navbar";
import Box from "@mui/material/Box";

export default function Register(props) {
  const [errors, setErrors] = useState({});

  const createUserInfo = (userData) => {
    userData["Role"] = props.admin;

    axios
      .post("http://localhost:8000/api/users", userData,{
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.user._id);
          navigate("/library/generic");
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors(err.response.data.errors);
      });
  };
  return (
<div>
      <Navbar />

      {props.admin === "admin" || props.admin === "users" ? (
        <UserForm
          userData=""
          errors={errors}
          onSubmitProp={createUserInfo}
          isEdit="false"
        ></UserForm>
      ) : (
        <Home />
      )}
    
    </div>
  );
}

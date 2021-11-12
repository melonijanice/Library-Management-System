import UserForm from "../Components/ManageUsers/UserForm";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import Navbar from "../Components/Navigation/Navbar";

export default function EditUsers(props) {
  const [errors, setErrors] = useState({});
  const [users, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    console.log(props.id)
    axios
      .get("http://localhost:8000/api/users/" + props.id, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data)
        setUser(res.data);
        setLoaded(true)
      })
      .catch((err) => {
        console.log(err.response.data)
        //navigate("/product/")
      });
  }, []);
  const updateUserInfo=(userData)=>
  {
    userData['Role'] =props.admin;
    delete userData.password;
    delete userData.confirmPassword
    console.log("Edit data" + userData);
    axios
    .put("http://localhost:8000/api/users/" + props.id, userData, {
      withCredentials: true,
    })
    .then((res) => {
      navigate(`/admin/users`);
    })
    .catch((err) => {
      //console.log(err.response.data.errors)
      setErrors(err.response.data.errors);
      return "errors"
    });
  }
  return (
    <div>
        <Navbar/>
      {loaded && (
        <UserForm
        userData={users}
        errors={errors}
        onSubmitProp={updateUserInfo}
        isEdit="true"
      ></UserForm>
      )}
      
      {/* <Delete id={props.id} afterDelete={redirectAfterDelete} /> */}
    </div>
  );
  
}
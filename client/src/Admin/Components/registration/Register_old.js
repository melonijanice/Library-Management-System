import Box from "@mui/material/Box";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "../../../App.css";
import BasicDatePicker from "./BasicDatePicker";
import Button from "@mui/material/Button";
import axios from "axios";
export default function Register() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [DOB, setDOB] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const getDOB = (DOB) => {
    console.log(DOB);
    setDOB(DOB);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log({ firstName, lastName, email, DOB, password, confirmPassword });
    axios
      .post("http://localhost:8000/api/users", {
        firstName,
        lastName,
        email,
        DOB,
        password,
        confirmPassword,
      })
      .then((res) => {
        //send this message to server directly
        console.log("sending data", res.data);
      })
      .catch((err) => {
        console.log(err.response);
        //setErrors(err.response.data.errors);
      });
  };
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center", md: "flex-start" },
        m: 3,
        minWidth: { md: 350 },
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="registerForm">
        <div>
          To sign up, complete the form below. You will receive a library card
          number upon approval from existing Admin which you may use to
          immediately access our books. Remember, your Dojo Card will expire
          after 1 year. Welcome to Dojo Public Library, and happy reading!
        </div>
        <TextField
          id="firstName"
          label="First Name*"
          variant="outlined"
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
        />
        <TextField
          id="last_name"
          label="Last Name*"
          variant="outlined"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
        />
        <TextField
          id="email"
          type="email"
          label="E-mail*"
          variant="outlined"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <BasicDatePicker onChangeProp={getDOB} />
        <TextField
          id="password"
          label="Password*"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="confirmPassword"
          label="Confirm Password*"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
        <div>
          <Button onClick={onSubmitHandler} variant="contained" color="success">
            Success
          </Button>
        </div>
      </div>
    </Box>
  );
}

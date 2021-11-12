import Box from "@mui/material/Box";
import React, { useState, useReducer } from "react";
import TextField from "@mui/material/TextField";
import "../../../App.css";
import BasicDatePicker from "../registration/BasicDatePicker";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

export default function UserForm(props) {

  const initialState = {
    firstName: props.userData.firstName,
    lastName: props.userData.lastName,
    email: props.userData.email,
    DOB: props.userData.DOB?props.userData.DOB:"",
    password: props.userData.password,
    confirmPassword: props.userData.confirmPassword,
    streetAddress: props.userData.streetAddress,
    city: props.userData.city,
    State: props.userData.State,
    zip: props.userData.zip,
  };
  function reducer(state, action) {
    return {
      ...state,
      [action.type]: action.payload,
    };
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleChange(e) {
    
    const { id, value } = e.target;
    dispatch({
      type: id,
      payload: value,
    });
  }
  function handleStateChange(e) {
  
    dispatch({
      type: "State",
      payload: e.target.value,
    });
  }


  const getDOB = (DOB) => {
   
    dispatch({
      type: "DOB",
      payload: DOB,
    });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      streetAddress,
      city,
      State,
      zip,
      DOB,
      password,
      confirmPassword,
    } = state;

    props.onSubmitProp({
      firstName,
      lastName,
      email,
      DOB,
      streetAddress,
      city,
      State,
      zip,
      password,
      confirmPassword,
    });
  };
  const states = [
    {
      value: "Texas",
      label: "Texas",
    },
  ];
  return (
    <Box
      component="form"
      sx={{
        marginLeft: {md: 25, lg:50 },
        marginTop: "30px",
        minWidth: { md: 350 },
        width: 600,
        flexDirection: "column",
        alignItems: { xs: "center", md: "flex-start" },
        "& .MuiTextField-root": { ml: 4, width: "50ch"}
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{padding:"10px"}}>
        To sign up, complete the form below. You will receive a library card
        number upon approval from existing Admin which you may use to
        immediately access our books. Remember, your Dojo Card will expire after
        1 year. Welcome to Dojo Public Library, and happy reading!
      </div>
      <div>
        <p className="error-text">
          {props.errors !== "" &&
            props.errors.firstName &&
            props.errors.firstName.message}
        </p>
        <TextField
          error={
            props.errors !== "" &&
            props.errors.firstName &&
            props.errors.firstName.message
              ? "error"
              : ""
          }
          id="firstName"
          label="First Name*"
          variant="outlined"
          value={state.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <p className="error-text">
          {props.errors !== "" &&
            props.errors.lastName &&
            props.errors.lastName.message}
        </p>
        <TextField
          error={
            props.errors !== "" &&
            props.errors.lastName &&
            props.errors.lastName.message
              ? "error"
              : ""
          }
          id="lastName"
          label="Last Name*"
          variant="outlined"
          value={state.lastName}
          onChange={handleChange}
        />
      </div>

      <div>
        <p className="error-text">
          {props.errors !== "" &&
            props.errors.email &&
            props.errors.email.message}
        </p>
        <p className="error-text">
          {props.errors !== "" &&
            props.errors.unique &&
            props.errors.unique.message}
        </p>
        <TextField
          error={
            props.errors !== "" &&
            props.errors.email &&
            props.errors.email.message
              ? "error"
              : ""
          }
          id="email"
          type="email"
          label="E-mail*"
          variant="outlined"
          value={state.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <p className="error-text">
          {props.errors !== "" && props.errors.DOB && props.errors.DOB.message}
        </p>
        <BasicDatePicker
          errorProp={
            props.errors !== "" && props.errors.DOB && props.errors.DOB.message
              ? "error"
              : ""
          }
          valueProp={state.DOB}
          onChangeProp={getDOB}
          dateLabel="Date of Birth*"
        />
      </div>
      <div>
        <p className="error-text">
          {props.errors !== "" &&
            props.errors.streetAddress &&
            props.errors.streetAddress.message}
        </p>
        <TextField
         error={props.errors !== "" &&
         props.errors.streetAddress &&
         props.errors.streetAddress.message
            ? "error"
            : ""
        }
          id="streetAddress"
          label="Street Address"
          onChange={handleChange}
          variant="outlined"
          value={state.streetAddress}
        />
      </div>
      <div>
        <p className="error-text">
          {props.errors !== "" &&
            props.errors.city &&
            props.errors.city.message}
        </p>
        <TextField
        error={props.errors !== "" &&
        props.errors.city &&
        props.errors.city.message
           ? "error"
           : ""
       }
          style={{ width: "22ch"}}
          id="city"
          label="city"
          onChange={handleChange}
          variant="outlined"
          value={state.city}
        />

        <TextField
          style={{ width: "24ch" }}
          id="state"
          select
          label="State"
          onChange={handleStateChange}
          variant="outlined"
          value={state.State}
        >
          {states.map((option) => (
            <MenuItem id="state" key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
     
      <div>
        <p className="error-text">
          {props.errors !== "" &&
            props.errors.zip &&
            props.errors.zip.message}
        </p>
        <TextField
         error={props.errors !== "" &&
             props.errors.zip &&
             props.errors.zip.message
            ? "error"
            : ""
        }
          label="Zip Code"
          id="zip"
          style={{ width: "22ch" }}
          variant="outlined"
          onChange={handleChange}
          value={state.zip}
        />
      </div>
      
      <div className={props.isEdit==="true"?"hideDiv":"showDiv"}>
        <p className="error-text">
          {props.errors !== "" &&
            props.errors.password &&
            props.errors.password.message}
        </p>
        <TextField
          error={
            props.errors !== "" &&
            props.errors.password &&
            props.errors.password.message
              ? "error"
              : ""
          }
          id="password"
          label="Password*"
          type="password"
          variant="outlined"
          value={state.password}
          onChange={handleChange}
        />
      </div>

      <div className={props.isEdit==="true"?"hideDiv":"showDiv"}>
        <p className="error-text">
          {props.errors !== "" &&
            props.errors.confirmPassword &&
            props.errors.confirmPassword.message}
        </p>
        <TextField
          error={
            props.errors !== "" &&
            props.errors.confirmPassword &&
            props.errors.confirmPassword.message
              ? "error"
              : ""
          }
          id="confirmPassword"
          label="Confirm Password*"
          type="password"
          variant="outlined"
          value={state.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div style={{textAlign: "center",padding:"3%"}}>
        <Button onClick={onSubmitHandler} variant="contained" color="success">
        {props.isEdit==="true"?"Update":"Register"}
        </Button>
      </div>
    </Box>
  );
}
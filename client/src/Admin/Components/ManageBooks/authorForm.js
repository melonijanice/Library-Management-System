import Box from "@mui/material/Box";
import React, { useReducer } from "react";
import TextField from "@mui/material/TextField";
import "../../../App.css";
import Button from "@mui/material/Button";
import axios from "axios";

export default function AuthorForm(props) {
  const initialState = {
    firstName: props.authorData.firstName,
    lastName: props.authorData.lastName,
    bio: props.authorData.bio,
    wiki: props.authorData.wiki,
    openLibraryDumpData: props.authorData.openLibraryDumpData,
    apiKey: props.authorData.apiKey,
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
    if (id === "firstName" || id === "lastName") {
      dispatch({
        type: "apiKey",
        payload: "",
      });
      dispatch({
        type: "openLibraryDumpData",
        payload: "",
      });
    }
    dispatch({
      type: id,
      payload: value,
    });
  }
  const getAPIKey = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://openlibrary.org/search/authors.json?q=${state.firstName} ${state.lastName}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.docs) {
          dispatch({
            type: "openLibraryDumpData",
            payload: JSON.stringify(res.data),
          });
          dispatch({
            type: "apiKey",
            payload: res.data.docs[0].key,
          });
        }
      })

      .catch((err) => {
        //navigate(`/admin/home`);
      });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const { firstName, lastName, bio, wiki, openLibraryDumpData, apiKey } =
      state;
    props.onSubmitProp({
      firstName,
      lastName,
      bio,
      wiki,
      openLibraryDumpData,
      apiKey,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        marginLeft: { md: 25, lg: 50 },
        marginTop: "30px",
        minWidth: { md: 350 },
        width: 600,
        flexDirection: "column",
        alignItems: { xs: "center", md: "flex-start" },
        "& .MuiTextField-root": { ml: 4, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >

      <div>
        <p className="error-text">{props.errors?.firstName?.message}</p>
        <TextField
          error={props.errors?.firstName?.message ? "error" : ""}
          id="firstName"
          label="First Name*"
          variant="outlined"
          value={state.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <p className="error-text">{props.errors?.lastName?.message}</p>
        <TextField
          error={props.errors?.lastName?.message ? "error" : ""}
          id="lastName"
          label="Last Name*"
          variant="outlined"
          value={state.lastName}
          onChange={handleChange}
        />
      </div>

      <div>
        <TextField
          id="bio"
          type="bio"
          label="Bio"
          variant="outlined"
          value={state.bio}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          id="wiki"
          type="wiki"
          label="Wiki"
          variant="outlined"
          value={state.wiki}
          onChange={handleChange}
        />
      </div>
      <div>
  
        <TextField
          id="apiKey"
          type="apiKey"
          variant="outlined"
          value={state.apiKey}
          disabled
          onChange={handleChange}
        />
        <Button
          disabled={state.firstName && state.lastName ? false : true}
          onClick={getAPIKey}
          variant="contained"
          color="success"
        >
          get Api key
        </Button>
      </div>
      <div style={{ textAlign: "center", padding: "3%" }}>
        <Button onClick={onSubmitHandler} variant="contained" color="success">
          {props.isEdit === "true" ? "Update" : "Create"}
        </Button>
      </div>
    </Box>
  );
}

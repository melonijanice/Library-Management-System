import Box from "@mui/material/Box";
import React, { useState, useReducer } from "react";
import TextField from "@mui/material/TextField";
import "../../../App.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MultipleSelectChip from "./MultipleSelectAuthors";
import BasicDatePicker from "../registration/BasicDatePicker";
import axios from "axios";

export default function BookForm(props) {
  const initialState = {
    bookData: props.bookData,
    description: props.bookData.description,
    title: props.bookData.title,
    subjects: props.bookData.subjects,
    authors: props.bookData.authors ? props.bookData.authors : "",
    coversImg: props.bookData.coversImg,
    ISBN: props.bookData.ISBN,
    publish_date: props.bookData.publish_date
      ? props.bookData.publish_date
      : "",
    number_of_pages: props.bookData.number_of_pages,
    number_of_Copies: props.bookData.number_of_Copies,
    languages: props.bookData.languages,
    publisher: props.bookData.publisher,
  };

  const [subList, setsubList] = useState(
    props.bookData.subjects === undefined || props.bookData.subjects === ""
      ? [""]
      : [...props.bookData.subjects]
  );
  const [file, setFile] = useState("");

  const handleRemoveImgClick = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/remove", { fileName: state.coversImg })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "coversImg",
          payload: "",
        });
      })

      .catch((err) => {
        console.log(err.response.data);
      });
  };

  // handle input change
  const handleSubInputChange = (e, index) => {
    e.preventDefault();
    const { value } = e.target;
    const list = [...subList];
    list[index] = value;
    setsubList(list);
    dispatch({
      type: "subjects",
      payload: list,
    });
  };
  const onChangeFileHandler = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  // handle click event of the Remove button
  const handleRemoveSubClick = (e, index) => {
    e.preventDefault();
    const list = [...subList];
    list.splice(index, 1);
    console.log(list);
    setsubList(list);
    dispatch({
      type: "subjects",
      payload: list,
    });
  };

  // handle click event of the Add button
  const handleAddSubClick = (e) => {
    e.preventDefault();
    setsubList([...subList, ""]);
    dispatch({
      type: "subjects",
      payload: [...subList, ""],
    });
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
    console.log(id, value);
    dispatch({
      type: id,
      payload: value,
    });
  }

  const getPublishDate = (DOB) => {
    dispatch({
      type: "publish_date",
      payload: DOB,
    });
  };
  const setAuthorChange = (authors) => {
    dispatch({
      type: "authors",
      payload: authors,
    });
  };

  const onSubmitHandler = () => {
    const {
      description,
      title,
      subjects,
      authors,
      coversImg,
      ISBN,
      publish_date,
      number_of_pages,
      number_of_Copies,
      languages,
      publisher,
    } = state;

    console.log({
      description,
      title,
      subjects,
      authors,
      coversImg,
      ISBN,
      publish_date,
      number_of_pages,
      number_of_Copies,
      languages,
      publisher,
    });
    props.onSubmitProp({
      description,
      title,
      subjects,
      authors,
      coversImg,
      ISBN,
      publish_date,
      number_of_pages,
      number_of_Copies,
      languages,
      publisher,
    });
  };
  const onSubmitFileHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    axios
      .post("http://localhost:8000/api/upload", formData)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "coversImg",
          payload: res.data.fileName,
        });
      })

      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <Box
      component="form"
      sx={{
        flexDirection: "column",
        alignItems: { xs: "center", md: "flex-start" },
        ml: 30,
        minWidth: { md: 350 },
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <p className="error-text">{props.errors?.title?.message}</p>

        <TextField
          error={props.errors?.title?.message ? "error" : ""}
          id="title"
          label="title*"
          variant="outlined"
          value={state.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          id="description"
          label="description*"
          variant="outlined"
          value={state.description}
          onChange={handleChange}
        />
      </div>
      <div>
        {subList.map((x, i) => {
          return (
            <div className="box">
              <TextField
                id="Subject"
                label="Subject*"
                variant="outlined"
                placeholder="Enter subject"
                value={x}
                onChange={(e) => handleSubInputChange(e, i)}
              />

              {subList.length !== 1 && (
                <IconButton aria-label="add" size="large" color="error">
                  <RemoveIcon
                    fontSize="inherit"
                    onClick={(e) => handleRemoveSubClick(e, i)}
                  />
                </IconButton>
              )}
              {subList.length - 1 === i && (
                <IconButton aria-label="add" size="large" color="primary">
                  <AddIcon
                    fontSize="inherit"
                    onClick={(e) => handleAddSubClick(e, i)}
                  />
                </IconButton>
              )}
            </div>
          );
        })}
      </div>

      <MultipleSelectChip
        onChangeProp={setAuthorChange}
        authors={props.bookData.authors}
      />

      {state.coversImg === "" || state.coversImg === undefined ? (
        <div>
          <TextField
            name="image"
            id="formFilemd"
            type="file"
            onChange={onChangeFileHandler}
          />
          <Button
            onClick={onSubmitFileHandler}
            variant="contained"
            color="primary"
          >
            Upload
          </Button>
        </div>
      ) : (
        <div>
          {state.coversImg}
          <Button onClick={handleRemoveImgClick}>Remove</Button>
        </div>
      )}
      {/*     <div>
          <TextField
            name="image"
            id="formFilemd"
            type="file"
            onChange={onChangeFileHandler}
          />
          <Button onClick={onSubmitFileHandler} variant="contained" color="primary">
            Upload
          </Button>
        </div> */}
      <div>
        <TextField
          id="ISBN"
          label="ISBN*"
          variant="outlined"
          value={state.ISBN}
          onChange={handleChange}
        />
      </div>
      <div>
        <BasicDatePicker
          valueProp={state.publish_date}
          onChangeProp={getPublishDate}
          dateLabel="Publish Date*"
        />
      </div>
      <div>
        <TextField
          id="number_of_pages"
          label="number_of_pages"
          variant="outlined"
          value={state.number_of_pages}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          id="number_of_Copies"
          label="number_of_Copies"
          variant="outlined"
          value={state.number_of_Copies}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          id="languages"
          label="languages*"
          variant="outlined"
          value={state.languages}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          id="publisher"
          label="publisher*"
          variant="outlined"
          value={state.publisher}
          onChange={handleChange}
        />
      </div>
      <div>
        <Button onClick={onSubmitHandler} variant="contained" color="success">
          {props.isEdit === "true" ? "Update" : "Create"}
        </Button>
      </div>
    </Box>
  );
}

import React, { useState, useReducer, Fragment } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function FileUploadPage(props) {
  const [file, setFile] = useState("");

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
   
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    axios.post("http://localhost:8000/upload", formData)
    .then((res) => {
      console.log(res.data);
      props.onChangeUploadProp(file.name)
    
    })
    .catch((err) => {
      console.log(err.response.data);
    });

    return () => console.log("Waited for the upload");
      //const { filename, filepath } = res.data;
	  
      //setUploadedFile({ filename, filepath });
      //console.log(res.data.filename)
      
  };
  return (
    <Fragment>
      <form onSubmit={onSubmitHandler}>
        <div>
          <TextField
            name="image"
            id="formFilemd"
            type="file"
            onChange={onChangeHandler}
          />
          <Button onClick={onSubmitHandler} variant="contained" color="primary">
            Upload
          </Button>
        </div>
      </form>
    </Fragment>
  );
}
export default FileUploadPage;

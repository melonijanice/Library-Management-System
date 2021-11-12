import BookForm from "../Components/ManageBooks/BookForm";
import axios from "axios";
import React, { useState } from "react";
import Navbar from "../Components/Navigation/Navbar";
import { navigate } from "@reach/router";

export default function CreateBook(props) {
  const [errors, setErrors] = useState({});

  const createBookInfo = (bookData) => {
      
    
    axios
      .post("http://localhost:8000/api/books", bookData,{
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data._id);
        navigate("/admin/books");
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors(err.response.data.errors);
      });
  };
  return (
    <div>
         <Navbar/>
        <BookForm
          bookData=""
          errors={errors}
          onSubmitProp={createBookInfo}
          isEdit="false"
        ></BookForm>
    </div>
  );
}

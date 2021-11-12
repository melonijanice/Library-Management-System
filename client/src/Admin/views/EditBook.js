import BookForm from "../Components/ManageBooks/BookForm";
import axios from "axios";
import React, { useEffect,useState } from "react";
import Navbar from "../Components/Navigation/Navbar";
import { navigate } from "@reach/router";


export default function EditBook(props) {
  const [errors, setErrors] = useState({});
  const [books, setBook] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/book/" + props.id, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Fetch Books Data");
        console.log(res.data)
        setBook(res.data);
        setLoaded(true)
      })
      //.catch((err) => navigate("/product/"));
  }, []);
  const updateBookInfo = (bookData) => {
    console.log("Updated Books Data");
    console.log(bookData);
    axios
    .put("http://localhost:8000/api/book/" + props.id, bookData, {
        withCredentials: true,
      })
    .then((res) => {
      navigate(`/admin/books`);
    })
    .catch((err) => {
      setErrors(err.response.data.errors);
      return "errors"
    });
  };
  return (
    <div>
         <Navbar/>
         {loaded && ( <BookForm
          bookData={books}
          errors={errors}
          onSubmitProp={updateBookInfo}
          isEdit="true"
        ></BookForm>)}
    </div>
  );
}

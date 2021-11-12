import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../App.css";
import { navigate } from "@reach/router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const AllBooksGrid = (props) => {
  const [books, setBooks] = useState([]);
  const [borrowed, setBorrowed] = useState("false");
  const [User, setLoggedInUser] = useState({});
  const [loaded, setLoaded] = useState("false");
  const holdBookHandler = (event) => {
    const thisBook = books.filter((item) => item._id === event.target.name);
    
    const HoldBy = [...thisBook[0].Hold_by, User.user_id];
    console.log(HoldBy)
  axios
      .put(
        "http://localhost:8000/api/book/" + event.target.name,
        { Hold_by: HoldBy },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        
        setBorrowed(!borrowed);
      })
      .catch((err) => {
        console.log(err.response);
        //navigate(`/library/home`);
      }); 
  };
  const releaseHold=(event)=>
  {
    const thisHolder = books.filter((item) => item._id === event.target.name);
    const removeHold = thisHolder[0].Hold_by.filter(
      (hold) => hold._id !== User.user_id
    );
    console.log(removeHold);

    axios
      .put(
        "http://localhost:8000/api/book/" + event.target.name,
        { Hold_by: removeHold },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setBorrowed(!borrowed);
      })
      .catch((err) => {
        console.log(err);
        //navigate(`/library/home`);
      });
  }
  const returnBookHandler = (event) => {
    const thisBorrower = books.filter((item) => item._id === event.target.name);
    const removeBorrowers = thisBorrower[0].Borrowed_by.filter(
      (borrower) => borrower._id !== User.user_id
    );
    console.log(removeBorrowers);

    axios
      .put(
        "http://localhost:8000/api/book/" + event.target.name,
        { Borrowed_by: removeBorrowers },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setBorrowed(!borrowed);
      })
      .catch((err) => {
        console.log(err);
        //navigate(`/library/home`);
      });
  };
  const borrowBookHandler = (event) => {
    const thisBorrower = books.filter((item) => item._id === event.target.name);
    const borrowedBy = [...thisBorrower[0].Borrowed_by, User.user_id];
    
    axios
      .put(
        "http://localhost:8000/api/book/" + event.target.name,
        { Borrowed_by: borrowedBy },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setBorrowed(!borrowed);
      })
      .catch((err) => {
        console.log(err);
        //navigate(`/library/home`);
      });
  };
  useEffect(() => {
    const LoggedInUser = JSON.parse(localStorage.user);
    setLoggedInUser(LoggedInUser);

    axios
      .get("http://localhost:8000/api/book", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("All Books", res.data);
        setBooks(res.data); // [1, 2, 3]
        setLoaded(true);
      })
      .catch((err) => {
        navigate(`/library/generic`);
      });
  }, [borrowed]);
  return (
    <div
      className="Container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {loaded &&
        books.map((book) => (
          <Card sx={{ maxWidth: 250, minWidth: 250, m: 2 }} raised>
            <CardMedia
              component="img"
              alt="green iguana"
              height="300"
              image={`http://localhost:8000/Images/${book.coversImg}`}
              onClick={() => {
                navigate(`/admin/${book._id}/viewBook`);
              }}
            />
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                <Link
                  underline="none"
                  sx={{ fontWeight: "bold",cursor: "pointer"  }}
                  color="green"
                  onClick={() => {
                    navigate(`/admin/${book._id}/viewBook`);
                  }}
                >
                  {book.title}
                </Link>
              </Typography>
              <Typography variant="body1" color="text.secondary">
                by{" "}
                {book.authors.map((author) => (
                  <Link
                    underline="none"
                    sx={{ fontStyle: "italic",fontWeight: "bold", cursor: "pointer" }}
                    onClick={() => {
                      navigate(
                        `/admin/${author._id}/${author.apiKey}/viewAuthor`
                      );
                    }}
                  >
                    {author.firstName + " " + author.lastName}
                  </Link>
                ))}
                {!props.isLibraryHome && (
                  <Typography variant="body1" color="text.secondary">
                    Total Copies: {book.number_of_Copies}
                  </Typography>
                )}
                <Typography variant="body1" color="text.secondary">
                  Available Copies:{" "}
                  {book.number_of_Copies - book.Borrowed_by.length}
                </Typography>
              </Typography>
            </CardContent>

            <CardActions>
              {props.isLibraryHome &&
                 (
                  <div>
                    {book.Borrowed_by.filter(
                      (item) => item._id === User.user_id
                    ).length <= 0 ? (
                      book.number_of_Copies - book.Borrowed_by.length > 0 && <Button
                        key={book._id}
                        onClick={borrowBookHandler}
                        size="small"
                        name={book._id}
                      >
                        Borrow
                      </Button>
                    ) : (
                      <Button
                        key={book._id}
                        onClick={returnBookHandler}
                        size="small"
                        name={book._id}
                      >
                        Return
                      </Button>
                    )}
                  </div>
                )}
                {book.Hold_by.filter(
                      (item) => item._id === User.user_id
                    ).length>0?<Button
                    key={book._id}
                    onClick={releaseHold}
                    size="small"
                    name={book._id}
                  >
                    Release Hold
                  </Button>:props.isLibraryHome &&
                      book.number_of_Copies - book.Borrowed_by.length === 0 && (
                        <Button
                          key={book._id}
                          onClick={holdBookHandler}
                          size="small"
                          name={book._id}
                        >
                          Hold
                        </Button>
                      )}
              
            </CardActions>
          </Card>
        ))}
    </div>
  );
};
export default AllBooksGrid;

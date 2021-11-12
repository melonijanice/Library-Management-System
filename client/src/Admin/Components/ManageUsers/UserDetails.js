import React, { useEffect, useState, Image } from "react";
import axios from "axios";
import Navbar from "../Navigation/Navbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { navigate } from "@reach/router";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from "@mui/material/CardMedia";


export default function UserDetails(props) {
  const [users, setUsers] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [birthDate, setbirthDate] = useState("");
  const [borrowedBooks, setborrowedBooks] = useState([]);
  const [holdBooks, setholdBooks] = useState([]);

  

  //const [imgSource, setimgSource] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/${props.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
        setLoaded(true);
        var moment = require('moment');
        let birth_date=new Date(res.data.DOB)
        birth_date=moment(birth_date).format('MM/DD/YYYY')
        console.log("birthdate",birth_date)
        setbirthDate(birth_date)
      })

      .catch((err) => {
        console.log(err.response);
      });

      axios
      .get(`http://localhost:8000/api/borrowedBooks/${props.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setborrowedBooks(res.data);
        console.log("all borrowed books", res.data);

      })

      .catch((err) => {
        navigate(`/admin/home`);
      });
      axios
      .get(`http://localhost:8000/api/heldBooks/${props.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setholdBooks(res.data);
        console.log("all held books", res.data);

      })
      .catch((err) => {
        navigate(`/admin/home`);
      });

  }, []);
  return (
    (loaded &&<div>
      <Navbar />
      <Paper
        elevation={7}
        sx={{
          bgcolor: "background.paper",
          p: 4,
          minWidth: 300,
          m: 2,
          display:"flex"
        }}
      >
       
 
            
    <Grid>
    
            <Grid>
            <h1 style={{color:"white"}}>{users.firstName+" "+users.lastName}</h1>
            {users.email}
        </Grid>
        <span style={{fontWeight:'bold'}}>Date of Birth:</span> 
         {birthDate}
    
        
        <Grid>
        <span style={{fontWeight:'bold'}}> Address: </span> 
       {users.streetAddress},{users.city},{users.State},{users.zip}
        </Grid>
        <h6 style={{color:"#571cbf"}}>Borrowed Books:</h6>
          <div
            className="Container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center"
            }}
          >
            {borrowedBooks.map((item) => (
              <Card sx={{ m: 2 }} raised>
                <CardMedia
                  component="img"
                  height="300"
                  width="auto"
                  image={`http://localhost:8000/Images/${item.coversImg}`}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                  ></Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Link
                    underline="none"
                    sx={{fontStyle:"italic",fontWeight: "bold", cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/admin/${item._id}/viewBook`);
                      }}
                    >
                      {item.title}
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
          <h6 style={{color:"#571cbf"}}>Book on Hold:</h6>
         <div
            className="Container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center"
            }}
          >
            {holdBooks.map((item) => (
              <Card sx={{ maxWidth: 250, minWidth: 250, m: 2 }} raised>
                <CardMedia
                  component="img"
                  height="300"
                  width="auto"
                  image={`http://localhost:8000/Images/${item.coversImg}`}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                  ></Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Link
                      underline="none"
                      sx={{fontStyle:"italic",fontWeight: "bold", cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/admin/${item._id}/viewBook`);
                      }}
                    >
                      {item.title}
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div> 
    {/*     <Grid>
               <span style={{fontWeight:'bold'}}> subjects: </span> 
               {books.subjects.map(author=>author + ",")}
        </Grid> */}
        
     {/*    <Grid>
        <span style={{fontWeight:'bold'}}> authors:</span> 
         {books.authors.map(author=>
          <Link
          underline="none"
          sx={{fontStyle:"italic"}}
          variant="body2"
          onClick={() => {
            navigate(`/admin/${author._id}/${author.apiKey}/viewAuthor`);
          }}
        >
          {author.firstName + " " + author.lastName}
        </Link>)}
        
        </Grid>
        <Grid>
        <span style={{fontWeight:'bold'}}> Total Copies: </span> 
        {books.number_of_Copies}
        </Grid>
        <Grid>
        <span style={{fontWeight:'bold'}}> Borrowed_by: </span> 
        {books.Borrowed_by.map(user=>
         user.firstName + " " + user.lastName + ","
        )}
        </Grid>
        <Grid>
        <span style={{fontWeight:'bold'}}>Hold_by:  </span> 
        {books.Hold_by.map(user=>
         user.firstName + " " + user.lastName + ","
        )}
    
        </Grid> */}
          </Grid>
    </Paper>
    </div>)
  );
}

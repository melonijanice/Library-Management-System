import React, { useEffect, useState, Image } from "react";
import axios from "axios";
import Navbar from "../Navigation/Navbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { navigate } from "@reach/router";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function BookDetails(props) {
  const [books, setBooks] = useState([]);
  const [image, setImage] = useState("");
  const [publishdate, setpublishDate] = useState("");
  const [editdate, setEditDate] = useState("");
  const [loaded, setLoaded] = useState(false);
  

  //const [imgSource, setimgSource] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/book/${props.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
        console.log(res.data.coversImg);
        setImage(`http://localhost:8000/Images/${res.data.coversImg}`)
        console.log();
        setLoaded("true")
        var newDate = new Date(res.data.publish_date);
        setpublishDate(newDate.getFullYear().toString())
        ;
        setEditDate(new Date(res.data.updatedAt).toString())
        
      })

      .catch((err) => {
        console.log(err.response);
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
       
      <Card sx={{ m: 2,p: 4,minWidth:400}}>
      <CardContent>
        
        <Typography variant="body2" color="text.secondary">

        <h1 style={{color:"white"}}>{books.title}</h1>
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="500"
        width="auto"
        image={image}
        alt="green iguana"
      />
     
    
    </Card>
    <Paper  sx={{
            bgcolor: "background.paper",
            m: 4,
            p:5
          }}>
            <Grid>
            {books.description}
        </Grid>
            
    <Grid>
       <span style={{fontWeight:'bold'}}>ISBN:</span>  {books.ISBN}
        </Grid>
        <Grid>
        <span style={{fontWeight:'bold'}}>Publish Date:</span> 
         {publishdate}
    
        </Grid>
        <Grid>
        <span style={{fontWeight:'bold'}}> Pages: </span> 
       {books.number_of_pages}
    
        </Grid>
        <Grid>
               <span style={{fontWeight:'bold'}}> subjects: </span> 
               {books.subjects.map(author=>author + ",")}
        </Grid>
        
        <Grid>
        <span style={{fontWeight:'bold'}}> authors:</span> 
         {books.authors.map(author=>
          <Link
          underline="none"
          sx={{fontStyle:"italic",fontWeight: "bold", cursor: "pointer" }}
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
    
        </Grid>
          </Paper>
    </Paper>
    </div>)
  );
}

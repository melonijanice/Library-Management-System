import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navigation/Navbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { navigate } from "@reach/router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function AuthorDetails(props) {
  const [author, setAuthor] = useState([]);
  const [apiAuthor, setapiAuthor] = useState([]);
  const [imgSource, setimgSource] = useState("");
  const [books, setBooks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/authors/${props.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setAuthor(res.data);
      })

      .catch((err) => {
        //navigate(`/library/home`);
      });
    axios
      .get(`http://localhost:8000/api/booksbyAuthor/${props.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setBooks(res.data);
        console.log("all books", res.data);
        setLoaded("true");
        //setAuthor(res.data);
      })

      .catch((err) => {
        navigate(`/admin/home`);
      });

    axios
      .get(`https://openlibrary.org/authors/${props.apiKey}.json`)
      .then((res) => {
        setapiAuthor(res.data);
        setimgSource(
          `https://covers.openlibrary.org/a/id/${res.data.photos[0]}-M.jpg`
        );
      })

      .catch((err) => {
        //navigate(`/library/home`);
      });
  }, []);
  return (
    <div>
      <Navbar />

      {loaded && (
        <Paper
          elevation={7}
          sx={{
            bgcolor: "background.paper",
            p: 4,
            minWidth: 300,
            m: 4,
          }}
        >
          <div className="AuthorDetails">
            <h1 style={{color:"white"}}>{author.firstName + " " + author.lastName}</h1>
          </div>
          <Grid
            container
            sx={{
              background:"linear-gradient(to right, #b2d6dd, #00A8C9 99%)",
              m: 4,
            }}
          >
              <Grid>
              <img src={imgSource} alt="BigCo Inc. logo" />
            </Grid>
            <Grid item xs={8} sx={{ p: 2 }}>
              {author.bio}
              <Grid sx={{ p: 2 }}>
                <Grid>Birth Date:{apiAuthor.birth_date}</Grid>
                <Grid>Death Date:{apiAuthor.death_date}</Grid>
                <Grid>
                  <b>Wiki:</b>
                </Grid>
                <Grid>
                  <a href={author.wiki}>{author.wiki}</a>
                </Grid>
              </Grid>
            </Grid>

          
          </Grid>
          <h6 style={{color:"#571cbf"}}>Books by author:</h6>
          <div
            className="Container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center"
            }}
          >
            {books.map((item) => (
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
                    sx={{ fontWeight: "bold", cursor: "pointer" }}
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
        </Paper>
      )}
    </div>
  );
}

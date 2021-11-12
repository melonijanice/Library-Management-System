import Navbar from "../Navigation/Navbar";
import React, { useEffect, useState } from "react";
import AllBooks from "../ManageBooks/AllBooks";
import { Link } from "@reach/router";
import { makeStyles } from "@material-ui/core";
import AllBooksGrid from "../ManageBooks/AllBooksGrid";
import ListIcon from "@mui/icons-material/List";
import GridViewIcon from "@mui/icons-material/GridView";
import Grid from "@mui/material/Grid";

export default function Books() {
  const [view, setView] = useState("true");
  const useStyles = makeStyles((theme) => ({
    link: {
      textDecoration: "none",
      color: "blue",
      fontSize: "20px",
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(2),
      "&:hover": {
        color: "green",
        borderBottom: "1px solid white",
      },
    },
  }));
  const classes = useStyles();
  const handleView = () => {
    setView(!view);
  };
  return (
    <div>
      <Navbar />
      {view ? (
        <>
          <div style={{ textAlign: "right" }}>
            <Link to="/admin/addBooks" className={classes.link}>
              Add new Books
            </Link>
            

            <ListIcon sx={{ mr: 5 }} onClick={handleView}></ListIcon>
          </div>
          <AllBooks></AllBooks>
        </>
      ) : (
        <div style={{ textAlign: "right" }}>
          <Link to="/admin/addBooks" className={classes.link}>
            Add new Books
          </Link>
          <GridViewIcon sx={{ mr: 5 }} onClick={handleView}></GridViewIcon>
          <AllBooksGrid></AllBooksGrid>
        </div>
      )}
    </div>
  );
}

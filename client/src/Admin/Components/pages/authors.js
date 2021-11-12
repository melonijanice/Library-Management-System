import Navbar from "../Navigation/Navbar";
import AllAuthors from "../ManageBooks/AllAuthors";
import { Link } from "@reach/router";
import {
    makeStyles,
    useTheme
  } from "@material-ui/core";
export default function Authors() {
    const useStyles = makeStyles((theme) => ({
        link: {
          textDecoration: "none",
          color: "black",
          fontSize: "20px",
          marginLeft: theme.spacing(5),
          marginRight: theme.spacing(2),
          "&:hover": {
            color: "green",
            borderBottom: "1px solid white",
          },
        }
      }));
      const classes = useStyles();
    return (<div>
         <Navbar/>
         <div style={{textAlign:"right"}}>
           <Link to="/admin/addAuthor" className={classes.link}>
              Add new Author
            </Link> 
           </div>
         <AllAuthors></AllAuthors>
    </div>)
};
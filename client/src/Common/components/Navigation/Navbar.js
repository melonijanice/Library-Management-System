import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "@reach/router";
import DrawerComponent from "./DrawerComponent";
import Logout from "../../../Admin/Components/registration/Logout"


const useStyles = makeStyles((theme) => ({

 logo: {
    flexGrow: "1",
    cursor: "pointer",
    fontSize: "50px",
  },
  abRoot: {
    background: 'linear-gradient(45deg, #005363 30%, #00A8C9 90%)',
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(2),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
  Image:{
      height:"50px",
      width:"50px"
  }
}));

function Navbar() {
    const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const cookie=document.cookie.match(/^(.*;)?\s*usertoken\s*=\s*[^;]+(.*)?$/);

  return (
    <AppBar classes={{ 
        root: classes.abRoot
      }} position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
            <img className={classes.Image} src="/Book Library-256.png" alt="Image_logo"/>
          Dojo Library
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            {cookie && 
             <><Link to="/library/home" className={classes.link}>
              Explore
            </Link>
            <button
                  className="btn dropdown-toggle linkText"
                  type="button"
                  id="dropdownMenu2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  My Account
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <li>
                    <Logout isLibraryHome="true"></Logout>
                  </li>
                </ul>

             </>}
          </div>
          
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;

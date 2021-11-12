import React, { useEffect, useState } from "react";

import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link} from "@reach/router";
import DrawerComponent from "../Navigation/DrawerComponent";
import Logout from "../registration/Logout";

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: "1",
    cursor: "pointer",
    fontSize: "50px",
  },
  abRoot: {
    background: "linear-gradient(45deg, #005363 30%, #00A8C9 90%)",
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
  BrandLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "40px",
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(2),
    "&:hover": {
      color: "white",
      textDecoration: "none"
    },
  },
  link_menu: {
    textDecoration: "none",
    color: "green",
    fontSize: "20px",
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(2),
    "&:hover": {
      borderBottom: "1px solid white",
    },
  },
  Image: {
    height: "50px",
    width: "50px",
  },
}));

function Navbar() {
  const classes = useStyles();
  const [User, setLoggedInUser] = useState({});
  useEffect(() => {
    const LoggedInUser = localStorage.user && JSON.parse(localStorage.user);
    console.log(LoggedInUser);
    setLoggedInUser(LoggedInUser);
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const cookie = document.cookie.match(/^(.*;)?\s*usertoken\s*=\s*[^;]+(.*)?$/);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <AppBar
      classes={{
        root: classes.abRoot,
      }}
      position="static"
    >
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          <img
            className={classes.Image}
            src="/Book Library-256.png"
            alt="Image_logo"
          />
          <Link to="/admin/home" className={classes.BrandLink}>
          Dojo Library
                </Link>
          
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            {cookie ? (
              <>
                <div></div>
                {/*       <Link to="/admin/home" className={classes.link}>
              Home
            </Link>
             */}
                <Link to="/admin/users" className={classes.link}>
                  Manage Users
                </Link>
                <Link to="/admin/books" className={classes.link}>
                  Manage Books
                </Link>
                <Link to="/admin/authors" className={classes.link}>
                  Manage Authors
                </Link>
                {/*    <Link to="/admin/events" className={classes.link}>
              Manage Events
            </Link> */}

                <button
                  className="btn dropdown-toggle linkText"
                  type="button"
                  id="dropdownMenu2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {User && User.name}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li>
                    <Link className={classes.link_menu} to={`/admin/${User.user_id}/viewUser`}>My Profile</Link>
                  </li>
                  <li>
                    <Link className={classes.link_menu} to={`/admin/${User.user_id}/Edit`}>Edit Profile</Link>
                  </li>
                  <li>
                    <Logout></Logout>
                  </li>
                </ul>
                
                {/* <Logout></Logout> */}
              </>
            ) : (
              <Link to="/admin/home" className={classes.link}>
                Login
              </Link>
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;

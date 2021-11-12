import React, { useState } from "react";
import Logout from "../registration/Logout"
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
 makeStyles
} from "@material-ui/core";
import { Link } from "@reach/router";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(()=>({
    link:{
        textDecoration:"none",
        color: "blue",
        fontSize: "20px",
    },
    icon:{
        color: "white"
    }
}));

function DrawerComponent() {
const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const cookie=document.cookie.match(/^(.*;)?\s*usertoken\s*=\s*[^;]+(.*)?$/);
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {cookie ?    <List>
         <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/admin/home" className={classes.link}>Home</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/admin/users" className={classes.link}>Manage Users</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/admin/books" className={classes.link}>Manage Books</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/admin/authors" className={classes.link}>Manage Authors</Link>
            </ListItemText>
          </ListItem>
          {/* <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/admin/events" className={classes.link}>Manage Events</Link>
            </ListItemText>
          </ListItem> */}
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
            <Logout></Logout>
            </ListItemText>
          </ListItem>
        </List>: (
          <List>
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/admin/home" className={classes.link}>
                  Login
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        )}
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;

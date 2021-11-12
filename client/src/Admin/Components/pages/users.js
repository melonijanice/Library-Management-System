import Navbar from "../Navigation/Navbar";
import UsersInfo from "../ManageUsers/UsersInfo"
import { Link } from "@reach/router";
import {
  makeStyles,
  useTheme
} from "@material-ui/core";

export default function Users() {
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
         <Navbar path="/admin/home" default />
         <div style={{textAlign:"right"}}>
           <Link to="/users/register" className={classes.link}>
              Add new User
            </Link> 
            <Link to="/admin/register" className={classes.link}>
              Add new Admin
            </Link></div>
         <UsersInfo isAll="true"></UsersInfo>

    </div>)
};
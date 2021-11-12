import React, { useEffect, useState } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "../../../App.css";
import { makeStyles } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { navigate } from "@reach/router";
import Link from "@mui/material/Link";

const UsersInfo = (props) => {
  const [users, setUsers] = useState([]);
  const [deleteFlag, setdeleteFlag] = useState(false);

  let columns = ["First Name", "Last Name", "E-mail", "Role", "Action"];
  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: "#FFF",
            width: "50px",
          },
        },
        MuiPaper:
        {
          root: {
            background: "linear-gradient(45deg, #b2d6dd 30%, #00A8C9 90%)",
        }
      },
        MuiTableCell: {
          head: {
            backgroundColor: "#b2d6dd !important",
            color:"white"
          },
        },
      },
    });
  const useStyles = makeStyles((theme) => ({
    buttonStyle: {
      display: "flex",
    },
  }));
  const options = {
    selectableRows: false,
    onRowsDelete: (rowsDeleted, data, newTableData) => {
      console.log(rowsDeleted, data);
    },
    viewColumns: true,
    customToolbarSelect: () => {},
  };
  const classes = useStyles();
  const editHandler = (item, flag) => {
    if (flag === "Edit") {
      navigate(`/admin/${item}/Edit`);
    } else if (flag === "Delete") {
      axios
        .delete(`http://localhost:8000/api/users/${item}`,{
          withCredentials: true,
        })
        .then((res) => {
          setdeleteFlag(!deleteFlag);
        })
        .catch((err) => {
          console.log("Error");
        });
    } else if (flag === "Approve") {
      axios
        .put(`http://localhost:8000/api/users/${item}/GenerateCard/`, {
          LibraryCard: item,
        },{
          withCredentials: true,
        })
        .then((res) => {
          console.log(res)
          setdeleteFlag(!deleteFlag);
          //navigate(`/admin/users`);
        })
        .catch((err) => {
          //console.log(err.response.data.errors)
          //setErrors(err.response.data.errors);
          return "errors";
        });
      //navigate(`/admin/${item}/Edit`);
    }
    else if (flag === "Reject") {
      axios
        .put(`http://localhost:8000/api/users/${item}/RejectUser/`, {
          LibraryCard: item,
        },{
          withCredentials: true,
        })
        .then((res) => {
          setdeleteFlag(!deleteFlag);
          //navigate(`/admin/users`);
        })
        .catch((err) => {
          //console.log(err.response.data.errors)
          //setErrors(err.response.data.errors);
          return "errors";
        });
      //navigate(`/admin/${item}/Edit`);
    }
  };
  useEffect(() => {
    console.log("use effect runs");
    axios
      .get("http://localhost:8000/api/users", {
        withCredentials: true,
      })
      .then((res) => {
        let allusers=res.data
        //filter users other than logged in user
        let user = JSON.parse( localStorage.user );
        console.log("User Email",user.email );
        allusers=allusers.filter(item => item.email!==user.email)

        if(props.isAll==="false")
        {
          //Filter only users those arent approved to display on home page
          const filteredusers=allusers.filter(item => !item.hasOwnProperty('LibraryCard'))
          console.log(filteredusers);
          setUsers(filteredusers);
        }
        else{

          setUsers(allusers);
          console.log(res.data);
        }
        
         // [1, 2, 3]
       
        //setUsers(arr);
        //console.log("all products"+ res.data)
      })
      .catch((err)=>{navigate(`/library/home`)}
      );
  }, [deleteFlag,props.isAll]);
  return (
    
    <div className="Container">
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={props.isAll==="false"?"Users waiting for approval. A library card will be generated upon approval and user will be E-mailed":""}
          data={users.map((item) => [
            item.firstName,
            item.lastName,
           
            <Link
            underline="none"
                  sx={{ fontWeight: "bold", cursor: "pointer" }}
              variant="body2"
              onClick={() => {
                navigate(`/admin/${item._id}/viewUser`);
              }}
            >
               {item.email}
            </Link>,
            item.Role,
            <div className={classes.buttonStyle}>
              {!item.LibraryCard &&
              <IconButton
                id={item._id}
                name="Approve"
                onClick={() => editHandler(item._id, "Approve")}
                aria-label="delete"
                size="large"
              >
                <ThumbUpAltIcon fontSize="inherit" />
              </IconButton>}
              <IconButton
                id={item._id}
                name="Reject"
                onClick={() => editHandler(item._id, "Reject")}
                aria-label="delete"
                size="large"
              >
                <ThumbDownIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                id={item._id}
                name="Edit"
                onClick={() => editHandler(item._id, "Edit")}
                aria-label="edit"
                size="large"
              >
                <EditIcon id={item._id} name="Edit" fontSize="inherit" />
              </IconButton>
              <IconButton
                id={item._id}
                name="Delete"
                onClick={() => editHandler(item._id, "Delete")}
                aria-label="delete"
                size="large"
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </div>,
          ])}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    </div>
  );
};
export default UsersInfo;

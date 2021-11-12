import React, { useEffect, useState } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "../../../App.css";
import { makeStyles } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { navigate } from "@reach/router";
import Link from "@mui/material/Link";

const AllAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [deleteFlag, setdeleteFlag] = useState(false);
  
  let columns = ["Author Name", "wiki", "Action"];
  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: "#FFF"
          },
        },
        MuiTableCell: {
          head: {
            background: "#b2d6dd !important",
            color:"white"
          },
        },
        MuiPaper:
        {
          root: {
            background: "linear-gradient(45deg, #b2d6dd 30%, #00A8C9 90%)",
        }
      }
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
      navigate(`/admin/${item}/EditAuthor`);
    } else if (flag === "Delete") {
      axios
        .delete(`http://localhost:8000/api/authors/${item}`, {
          withCredentials: true,
        })
        .then((res) => {
          setdeleteFlag(!deleteFlag);
        })
        .catch((err) => {
          console.log("Error");
        });
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/authors", {
        withCredentials: true,
      })
      .then((res) => {
        setAuthors(res.data); // [1, 2, 3]
        //setUsers(arr);
        //console.log("all products"+ res.data)
      })
      .catch((err) => {
        
        navigate(`/admin/home`);
      });
  }, [deleteFlag]);
  return (
    <div className="Container">
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Authors"}
          data={authors.map((item) => [
            <Link
            underline="none"
                  sx={{ fontWeight: "bold",
                  cursor: "pointer"}}
              variant="body2"
              onClick={() => {
                navigate(`/admin/${item._id}/${item.apiKey}/viewAuthor`);
              }}
            >
              {item.firstName + " " + item.lastName}
            </Link>,
            
            
            <Link
            underline="none"
                  sx={{ fontWeight: "bold" }}
            component="button"
            variant="body2"
            onClick={() => {
              navigate(`${item.wiki}`);
            }}
          >
            {item.wiki}
          </Link>,
           
            <div className={classes.buttonStyle}>
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
export default AllAuthors;

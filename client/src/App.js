import logo from "./logo.svg";
import "./App.css";
import { Router } from "@reach/router";
import ComboBox from "./Admin/Components/Navigation/NbaAutocomplete";
import Home from "./Admin/Components/pages/home";
import Books from "./Admin/Components/pages/books";
import Users from "./Admin/Components/pages/users";
import Authors from "./Admin/Components/pages/authors";
import Events from "./Admin/Components/pages/events";
import Register from "./Admin/views/Register";
import EditUsers from "./Admin/views/EditUsers";
import EditAuthor from "./Admin/views/EditAuthor";
import Logout from "./Admin/Components/registration/Logout";
import CreateAuthor from "./Admin/views/CreateAuthor"
import LibraryHome from "./Common/views/LibraryHome"
import CreateBook from "./Admin/views/CreateBook";
import EditBook from "./Admin/views/EditBook";
import AuthorDetails from "./Admin/Components/ManageBooks/AuthorDetail"
import BookDetails from "./Admin/Components/ManageBooks/BookDetails";
import LibraryGeneric from "./Admin/views/LibraryGeneric";
import UserDetails from "./Admin/Components/ManageUsers/UserDetails";

function App() {
  return (
    <div>
      <Router>
        <Home exact path="/admin/home/"/>
        <Logout exact path="/admin/logout/"/>
        <Books path="/admin/books"/>
        <Users path="/admin/users"/>
        <Authors path="/admin/authors"/>
        <Books path="/admin/books"/>
        <Events path="/admin/events"/>
        <Register exact path="/:admin/register"></Register>
        <EditUsers path="/admin/:id/Edit"></EditUsers>
        <EditAuthor path="/admin/:id/EditAuthor"></EditAuthor>
        <EditBook path="/admin/:id/EditBook"></EditBook>
        <CreateAuthor path="/admin/addAuthor"></CreateAuthor>
        <CreateBook path="/admin/addBooks"></CreateBook>
        <LibraryHome path="/library/home" default></LibraryHome>
        <LibraryGeneric path="/library/generic"/>
       <AuthorDetails path="/admin/:id/:apiKey/viewAuthor"></AuthorDetails>
       <BookDetails path="/admin/:id/viewBook"></BookDetails>
       <UserDetails path="/admin/:id/viewUser"></UserDetails>
      </Router>
      {/* <ComboBox></ComboBox> */}
    </div>
  );
}

export default App;

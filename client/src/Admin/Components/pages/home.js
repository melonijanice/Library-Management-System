import React, { useEffect, useState } from "react";
import Navbar from "../Navigation/Navbar";
import Login from "../registration/Login";
import UsersInfo from "../ManageUsers/UsersInfo";
import BookCount from "../ManageHome/BookCount";
import UserCount from "../ManageHome/UserCount";
import AuthorCount from "../ManageHome/AuthorCount";

export default function Home() {
  const cookie = document.cookie.match(/^(.*;)?\s*usertoken\s*=\s*[^;]+(.*)?$/);
  console.log(localStorage.getItem("userData"));
  const [User, setLoggedInUser] = useState({});
  useEffect(() => {
    const LoggedInUser = localStorage.user && JSON.parse(localStorage.user);
    console.log(LoggedInUser);
    setLoggedInUser(LoggedInUser);
  }, []);
  return (
    <div>
      <div>
        {cookie &&<Navbar />}

        {!cookie && <Login></Login>}
      </div>

      {cookie && (
        <div style={{ textAlign: "center", padding: "10px"}}>
          <UsersInfo isAll="false"></UsersInfo>
          <div className="row adminContainer" >
          <BookCount></BookCount>
          <UserCount></UserCount>
          <AuthorCount></AuthorCount>
          </div>
        </div>
      )}
    </div>
  );
}

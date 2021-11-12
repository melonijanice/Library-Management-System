import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
function AuthorCount(props) {
  const [count, setCount] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/authors", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("All Authors", res.data.length);
        setCount(res.data.length); // [1, 2, 3]
        //setUsers(arr);
        //console.log("all products"+ res.data)
      })
      .catch((err) => {
        //navigate(`/library/home`);
      });
  }, []);
  return (
              <div className="col-md-4 stretch-card grid-margin">
                <div className="card bg-gradient-danger card-img-holder text-white adminDash">
                  <div className="card-body adminDash">
                  <img className="card-img-absolute adminDashImg" src="/author.png" alt="Image_logo"/>
                    
                    <h4 className="font-weight-normal mb-3">Total Authors <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                    </h4>
                    <h2 className="mb-5">{count}</h2>
                    <h6 className="card-text"><Link className="linkText" to="/admin/authors">View</Link></h6>
                  </div>
                </div>
              </div>
  );
}
export default AuthorCount;

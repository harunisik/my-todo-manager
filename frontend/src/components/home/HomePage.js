import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <h3>Welcome to my To-Do List app XXXXx</h3>
    <br></br>
    <p>React, Redux and React Router for ultra-responsive web apps.</p>
    <Link to="todos" className="btn btn-primary btn-lg">
      Get started
    </Link>
  </div>
);

export default HomePage;

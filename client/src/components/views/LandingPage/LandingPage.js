import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      useEffect(() =>
      {axios.get("/api/hello").then((response) => console.log(response.data))},
      [])
      <h1>Home</h1>
      <nav>
        <Link to="/">Home</Link> |<Link to="about">About</Link> |
        <Link to="/Dashboard">Dashboard</Link> |
        <Link to="/register">RegisterPage</Link> |
      </nav>
    </div>
  );
}

export default LandingPage;

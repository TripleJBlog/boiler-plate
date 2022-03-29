import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response));
  }, []);
  return (
    <div>
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

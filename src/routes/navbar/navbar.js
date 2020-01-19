import React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo";

class Navbar extends React.Component {
  render() {
    return (
      <div className={"navbar"}>
        <Link style={{ textDecoration: "none" }} to="/">
          <Logo />
        </Link>
        <div className={"navbar-links"}>
        <Link style={{ textDecoration: "none" }} to="/signup">
          <h2>Sign Up</h2>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/login">
          <h2>Log In</h2>
        </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;

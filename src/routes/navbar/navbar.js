import React from "react";
import { Link } from "react-router-dom";

import api from "../../api/api";
import Cookies from "js-cookie";
import './navbar.scss';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      user_name: ""
    };
  }
  componentDidMount() {
    api.notifyLogin(this.onLogin);
    if (Cookies.get("auth")) {
      this.setState({
        login: true,
        user_name: JSON.parse(Cookies.get("auth").split("j:")[1]).first_name
      });
    } else {
      this.setState({
        login: false,
        user_name: ""
      });
    }
  }

  onLogin = () => {
    this.setState({
      login: true,
      user_name: JSON.parse(Cookies.get("auth").split("j:")[1]).first_name
    });
  };

  removeCookie = () => {
    Cookies.remove('auth');
    this.setState({
      login: false,
      user_name: ""
    });
  }

  capitalizedName = str => {
    let fullName = "";
    let namesArr = str.split(" ").map(name => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    });
    namesArr.forEach(name => {
      fullName += name + " ";
    });
    return fullName;
  };

  render() {
    return (
      <div className={"navbar"}>
        <Link style={{ textDecoration: "none" }} to="/">
          <Logo />
        </Link>
        {this.state.login ? (
          <div className={"navbar-links"}>
            <h2 className={"hello-user"}>
              <i className="fab fa-fort-awesome"></i>
              {`Welcome Back ${this.capitalizedName(this.state.user_name)}`}
              <AddApartmentButton/>
            </h2>
            <span>/</span>
            <Link style={{ textDecoration: "none" }} to="/">
              <h2 onClick={() => this.removeCookie()}>Log Out</h2>
            </Link>
          </div>
        ) : (
          <div className={"navbar-links"}>
            <Link style={{ textDecoration: "none" }} to="/signup">
              <h2>Sign Up</h2>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/login">
              <h2>Log In</h2>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;


function AddApartmentButton(){
  return(
    <div className={'add-apartment-wrapper'}>
      <Link style={{ textDecoration: "none" }} to='/addApartment' ><h2>Add Apartment</h2></Link>
    </div>
  );
}

function Logo() {
  return (
    <div className={"wrap-logo"}>
      <h1 className={"logo-sby"}>SBY</h1>
      <p className={"logo-real-estate"}>Real Estate</p>
    </div>
  );
}


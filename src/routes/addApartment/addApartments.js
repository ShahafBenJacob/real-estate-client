import React from "react";
import { Redirect } from "react-router-dom";

import api from "../../api/api"

class AddApartment extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isAuthenticated: false
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    await api.login(this.state.email, this.state.password);
    this.setState({
      isAuthenticated: true
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
        <div className={"page-login-wrapper"}>
          <h1>Log In</h1>
          <div className={"login-wrapper col-4"}>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className={"button-wrapper"}>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }


export default AddApartment;

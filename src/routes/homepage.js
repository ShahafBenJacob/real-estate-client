import React from "react";
import { Link } from "react-router-dom";
import Numbers from "./numbers";
import { getDataFromServer } from "../api";


class HomePage extends React.Component {
  constructor() {
    super();

    this.state = {
      "apartments": [],
      "users": [],
      "apartments/sold": [],
    };
  }

  componentDidMount = () => {
    getDataFromServer(this.handleSuccess, "apartments");
    getDataFromServer(this.handleSuccess, "users");
    getDataFromServer(this.handleSuccess, "apartments/sold");
  };

  handleSuccess = (data, type) => {
    console.log(data, type)
    this.setState({
      [type]: data
    });
  };
  render() {
    return (
      <div className={"center row"}>
        <div className={"items center"}>
          <div className={"second-background"}>
            <h1>
              Home Is Where The <i className="far fa-heart heart"></i> Is
            </h1>
            <Link style={{ textDecoration: "none" }} to="/search">
              <button>
                Fall In Love <br />
                With Our Homes
              </button>
            </Link>
          </div>
        </div>
        <div className={"container-fluid about-us"}>
          <div className={"col-11"}>
            <h2>About Us</h2>
            <h4>
              For years, millions of home shoppers have turned to{" "}
              <span className={"logo-sby"}>SBY</span>
              <span className={"logo-real-estate"}>Real Estate</span> to find
              their dream home. We offers a comprehensive list of for-sale
              properties, as well as the information and tools to make informed
              real estate decisions. Today, more than ever,{" "}
              <span className={"logo-sby"}>SBY</span>
              <span className={"logo-real-estate"}>Real Estate</span> is The
              Home of Home Search.
            </h4>
          </div>
        </div>

        <div className={"container-fluid statistics"}>
          <div className={"col-11"}>
            <h2>In Our Website</h2>
            <ul className={"row"}>
              <Numbers
                number={this.state.apartments.length}
                title={"Available Apartments"}
              />
              <Numbers
                number={this.state['apartments/sold'].length}
                title={"Sold Apartments"}
              />
              <Numbers
                number={this.state.users.length}
                title={"Customers"}
              />
            </ul>
          </div>
        </div>

        <div className={"footer container-fluid"}>
          <div className={"col-11"}>
            <a href="https://github.com/ShahafBenJacob" target="_blank">
              ©SBY,
            </a>
            <a href="https://www.realtor.com/" target="_blank">
              Inspired By Realtor
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;

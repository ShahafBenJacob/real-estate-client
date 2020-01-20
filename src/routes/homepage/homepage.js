import React from "react";
import { getStatisticalData } from "../../api";
import CenterPage from "./innerComponents/center";
import AboutUs from "./innerComponents/aboutUs";
import Statistics from "./innerComponents/statistics";

class HomePage extends React.Component {
  constructor() {
    super();

    this.state = {
      apartments: [],
      users: [],
      "apartments/sold": []
    };
  }

  componentDidMount = () => {
    getStatisticalData(this.handleSuccess, "apartments");
    getStatisticalData(this.handleSuccess, "users");
    getStatisticalData(this.handleSuccess, "apartments/sold");
  };

  handleSuccess = (data, type) => {
    this.setState({
      [type]: data
    });
  };

  render() {
    return (
      <div className={"center row"}>
        <CenterPage />
        <AboutUs />
        <Statistics
          apartments={this.state.apartments.length}
          soldApartments={this.state["apartments/sold"].length}
          users={this.state.users.length}
        />
      </div>
    );
  }
}

export default HomePage;

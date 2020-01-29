import React from "react";
import { getData } from "../../api/api";
import CenterPage from "./innerComponents/center";
import AboutUs from "./innerComponents/aboutUs";
import Statistics from "./innerComponents/statistics";

class HomePage extends React.Component {
  constructor() {
    super();

    this.state = {
      apartments: 0,
      users: 0,
      soldApartments: 0
    };
  }

  async componentDidMount() {
    const data = await getData("apartments/statistics");
    this.setState({
      ...data
    });
  }

  render() {
    return (
      <div className={'homepage-wrapper'}>
        <div className={"center row"}>
          <CenterPage apartments={this.state.apartments} />
          <AboutUs />
          <Statistics
            apartments={this.state.apartments}
            soldApartments={this.state.soldApartments}
            users={this.state.users}
          />
        </div>
      </div>
    );
  }
}

export default HomePage;

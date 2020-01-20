import React from "react";
import Numbers from "./numbers";

class Statistics extends React.Component {
  render() {
    const {apartments, soldApartments, users} = this.props;
    return (
        <div className={"container-fluid statistics"}>
        <div className={"col-11"}>
          <h2>In Our Website</h2>
          <ul className={"row"}>
            <Numbers
              number={apartments}
              title={"Available Apartments"}
            />
            <Numbers
              number={soldApartments}
              title={"Sold Apartments"}
            />
            <Numbers number={users} title={"Customers"} />
          </ul>
        </div>
      </div>
    );
  }
}

export default Statistics;

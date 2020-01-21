import React from "react";
import Dropdown from "./dropdown";
import Apartment from "./apartment";
import { getData } from "../../api/api";

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      cities_name: [],
      sale_status: [],
      property_type: [],
      apartments: [],
      loading: true,
      loaderMap: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      number_of_room: [1, 2, 3, 4, 5, 6, 7],
      number_of_bath: [1, 2, 3, 4, 5, 6, 7]
    };
  }

  async componentDidMount() {
    let [buttonsValues, apartments] = await Promise.all([getData("apartments/buttonsValues"), getData("apartments")]);
    // const buttonsValues = await getData("apartments/buttonsValues");
    // const apartments = await getData("apartments");
    this.setState({
      ...buttonsValues,
      apartments: apartments,
      loading: false
    });
  }

  capitalizedName = str => {
    let fullName = "";
    str.split(" ").map(name => {
      fullName += name.charAt(0).toUpperCase() + name.slice(1);
      fullName += " ";
    });
    return fullName;
  };

  render() {
    return (
      <div className={"search-page"}>
        <div className={"search-buttons-wrapper"}>
          <Dropdown title={"Cities"} values={this.state.cities_name} />
          <Dropdown title={"Sale Status"} values={this.state.sale_status} />
          <Dropdown title={"Property Type"} values={this.state.property_type} />
          <Dropdown
            title={"Number Of Rooms"}
            values={this.state.number_of_room}
          />
          <Dropdown
            title={"Number Of Bath"}
            values={this.state.number_of_bath}
          />
        </div>

        <div className={"row"}>
          {this.state.loading
            ? this.state.loaderMap.map(i => {
                return (
                  <div
                    key={i}
                    className="lds-ellipsis apartment col-lg-4 col-12 col-md-6"
                  >
                    <div className="lds-wrap">
                      <div className={"black-circle"}></div>
                      <div style={{ backgroundColor: "#E8C8BD" }}></div>
                      <div className={"black-circle"}></div>
                      <div className={"black-circle"}></div>
                    </div>
                  </div>
                );
              })
            : this.state.apartments.map(apartment => {
                return (
                  <Apartment
                    user_name={this.capitalizedName(apartment.user_name)}
                    key={apartment.id}
                    city_name={apartment.city_name}
                    country_name={apartment.country_name}
                    address={apartment.address}
                    price={apartment.price}
                    number_of_room={apartment.number_of_room}
                    number_of_bath={apartment.number_of_bath}
                    sqft={apartment.sqft}
                    days_on_web={apartment.days_on_web}
                    sale_status={apartment.sale_status}
                    property_type={apartment.property_type}
                    main_image={apartment.main_image}
                  />
                );
              })}
        </div>
      </div>
    );
  }
}

export default Search;

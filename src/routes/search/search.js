import React from "react";
import Dropdown from "./dropdown";
import Apartment from "./apartment";
import { getData } from "../../api/api";

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      cities_name: [],
      property_type: [],
      price: [],
      apartments: [],
      loading: true,
      loaderMap: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      number_of_room: [1, 2, 3, 4, 5, 6, 7],
      number_of_bath: [1, 2, 3, 4, 5, 6, 7],
      filters: {
        city_name: "",
        property_type: "",
        number_of_room: "",
        number_of_bath: "",
        price: ""
      }
    };
  }

  async componentDidMount() {
    let [buttonsValues, apartments] = await Promise.all([
      getData("apartments/buttonsValues"),
      getData(
        `apartments/?city_name=${this.state.filters.city_name}&number_of_room=${this.state.filters.number_of_room}&number_of_bath=${this.state.filters.number_of_bath}&price=${this.state.filters.price}&property_type=${this.state.filters.property_type}`
      )
    ]);
    this.setState({
      ...buttonsValues,
      apartments: apartments,
      loading: false
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

  async reloadApartments() {
    let apartments = await getData(
      `apartments/?city_name=${this.state.filters.city_name}&number_of_room=${this.state.filters.number_of_room}&number_of_bath=${this.state.filters.number_of_bath}&price=${this.state.filters.price}&property_type=${this.state.filters.property_type}`
    );
    this.setState({
      apartments: apartments,
      loading: false
    });
  }

  invokeApartmentsRender = () => {
    this.reloadApartments();
  };

  handleChange = (value, title) => {
    let filtersValues = this.state.filters;
    filtersValues[title] = value;
    this.setState(
      {
        filters: filtersValues,
        loading: true
      },
      this.invokeApartmentsRender()
    );
  };

  removeFilter = title => {
    this.handleChange("", title);
  };

  render() {
    return (
      <div className={"search-page"}>
        <DropdownButton
          citiesName={this.state.cities_name}
          propertyType={this.state.property_type}
          numberOfRooms={this.state.number_of_room}
          numberOfBaths={this.state.number_of_bath}
          price={this.state.price}
          handleChange={this.handleChange}
        />

        <SearchDetails
          citiesName={this.state.filters.city_name}
          propertyType={this.state.filters.property_type}
          numberOfRooms={this.state.filters.number_of_room}
          numberOfBaths={this.state.filters.number_of_bath}
          price={this.state.filters.price}
          removeFilter={this.removeFilter}
        />

        <div className={"row"}>
          {this.state.loading ? (
            <LoadingSymbol loaderMap={this.state.loaderMap} />
          ) : this.state.apartments.length > 0 ? (
            this.state.apartments.map(apartment => {
              return (
                <Apartment
                  user_name={this.capitalizedName(apartment.user_name)}
                  key={apartment.id}
                  city_name={apartment.city_name}
                  city_id={apartment.city_id}
                  country_name={apartment.country_name}
                  address={apartment.address}
                  price={apartment.price}
                  number_of_room={apartment.number_of_room}
                  number_of_bath={apartment.number_of_bath}
                  sqft={apartment.sqft}
                  days_on_web={apartment.days_on_web}
                  property_type={apartment.property_type}
                  main_image={apartment.main_image}
                />
              );
            })
          ) : (
            <NoApartmentsAvailable />
          )}
        </div>
      </div>
    );
  }
}

export default Search;

function DropdownButton(props) {
  return (
    <div className={"search-buttons-wrapper"}>
      <Dropdown
        title={"Cities"}
        values={props.citiesName}
        handleChange={props.handleChange}
        obj={"city_name"}
      />
      <Dropdown
        title={"Property Type"}
        values={props.propertyType}
        handleChange={props.handleChange}
        obj={"property_type"}
      />
      <Dropdown
        title={"Number Of Rooms"}
        values={props.numberOfRooms}
        handleChange={props.handleChange}
        obj={"number_of_room"}
      />
      <Dropdown
        title={"Number Of Bath"}
        values={props.numberOfBaths}
        handleChange={props.handleChange}
        obj={"number_of_bath"}
      />
      <Dropdown
        title={"Max Price"}
        values={props.price}
        handleChange={props.handleChange}
        obj={"price"}
      />
    </div>
  );
}

function SearchDetails(props) {
  return (
    <div className={"search-details"}>
      <h5>
        {props.citiesName ? (
          <span>
            <i
              onClick={() => props.removeFilter("city_name")}
              className="fas fa-times-circle"
            ></i>
            {props.citiesName}
          </span>
        ) : (
          <span></span>
        )}
      </h5>
      <h5>
        {props.propertyType ? (
          <span>
            <i
              onClick={() => props.removeFilter("property_type")}
              className="fas fa-times-circle"
            ></i>
            {props.propertyType}
          </span>
        ) : (
          <span></span>
        )}
      </h5>
      <h5>
        {props.numberOfRooms ? (
          <span>
            <i
              onClick={() => props.removeFilter("number_of_room")}
              className="fas fa-times-circle"
            ></i>
            {`Number of Rooms: ${props.numberOfRooms}`}
          </span>
        ) : (
          <span></span>
        )}
      </h5>
      <h5>
        {props.numberOfBaths ? (
          <span>
            <i
              onClick={() => props.removeFilter("number_of_bath")}
              className="fas fa-times-circle"
            ></i>
            {`Number of Baths: ${props.numberOfBaths}`}
          </span>
        ) : (
          <span></span>
        )}
      </h5>
      <h5>
        {props.price ? (
          <span>
            <i
              onClick={() => props.removeFilter("price")}
              className="fas fa-times-circle"
            ></i>
            {`Max Price: ${props.price}`}
          </span>
        ) : (
          <span></span>
        )}
      </h5>
    </div>
  );
}

function LoadingSymbol(props) {
  return props.loaderMap.map(i => {
    return (
      <div key={i} className="lds-ellipsis apartment col-lg-4 col-12 col-md-6">
        <div className="lds-wrap">
          <div className={"black-circle"}></div>
          <div style={{ backgroundColor: "#E8C8BD" }}></div>
          <div className={"black-circle"}></div>
          <div className={"black-circle"}></div>
        </div>
      </div>
    );
  });
}

function NoApartmentsAvailable() {
  return (
    <div className={'noApartments-wrapper'}>
      <h1>We Are Sorry...</h1>
      <h2>No Matching Home For Your Search.</h2>
    </div>
  );
}

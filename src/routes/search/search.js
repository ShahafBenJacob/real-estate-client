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
        price: "",
      },
      pagination: {
        page: 1,
        size: 9,
        count: 0,
        max: 0,
      }
    };
  }

  async componentDidMount() {
    let [buttonsValues, apartments, count] = await Promise.all([
      getData("apartments/buttonsValues"),
      getData(
        `apartments/?city_name=${this.state.filters.city_name}&number_of_room=${this.state.filters.number_of_room}&number_of_bath=${this.state.filters.number_of_bath}&price=${this.state.filters.price}&property_type=${this.state.filters.property_type}&page=${this.state.pagination.page}&size=${this.state.pagination.size}`
      ),
      getData('apartments/countApartments'),
    ]);
    this.setState({
      ...buttonsValues,
      apartments: apartments,
      pagination: { ...this.pagination, count: count },
      loading: false,
    })
  }

  capitalizedName = str => {
    let fullName = "";
    str.split(" ").map(name => {
      fullName += name.charAt(0).toUpperCase() + name.slice(1);
      fullName += " ";
    });
    return fullName;
  };

  reloadApartments = () => {
    this.componentDidMount();
  };

  handleChange = (value, title) => {
    let filtersValues = this.state.filters;
    filtersValues[title] = value;
    this.setState(
      {
        filters: filtersValues,
        loading: true
      },
      this.reloadApartments()
    );
  };

  removeFilter = title => {
    this.handleChange("", title);
  };


  pagination = () => {
    const maxPage = this.state.pagination.apartments / this.state.pagination.size
    console.log(this.state.pagination.apartments)
  }

  render() {
    return (
      <div className={"search-page"}>
        <div className={"search-buttons-wrapper"}>
          <Dropdown
            title={"Cities"}
            values={this.state.cities_name}
            handleChange={this.handleChange}
            obj={"city_name"}
          />
          <Dropdown
            title={"Property Type"}
            values={this.state.property_type}
            handleChange={this.handleChange}
            obj={"property_type"}
          />
          <Dropdown
            title={"Number Of Rooms"}
            values={this.state.number_of_room}
            handleChange={this.handleChange}
            obj={"number_of_room"}
          />
          <Dropdown
            title={"Number Of Bath"}
            values={this.state.number_of_bath}
            handleChange={this.handleChange}
            obj={"number_of_bath"}
          />
          <Dropdown
            title={"Max Price"}
            values={this.state.price}
            handleChange={this.handleChange}
            obj={"price"}
          />
        </div>

        <div className={"search-details"}>
          <h5>
            {this.state.filters.city_name ? (
              <span>
                <i
                  onClick={() => this.removeFilter("city_name")}
                  className="fas fa-times-circle"
                ></i>
                {this.state.filters.city_name}
              </span>
            ) : (
              <span></span>
            )}
          </h5>
          <h5>
            {this.state.filters.property_type ? (
              <span>
                <i
                  onClick={() => this.removeFilter("property_type")}
                  className="fas fa-times-circle"
                ></i>
                {this.state.filters.property_type}
              </span>
            ) : (
              <span></span>
            )}
          </h5>
          <h5>
            {this.state.filters.number_of_room ? (
              <span>
                <i
                  onClick={() => this.removeFilter("number_of_room")}
                  className="fas fa-times-circle"
                ></i>
                {`Number of Rooms: ${this.state.filters.number_of_room}`}
              </span>
            ) : (
              <span></span>
            )}
          </h5>
          <h5>
            {this.state.filters.number_of_bath ? (
              <span>
                <i
                  onClick={() => this.removeFilter("number_of_bath")}
                  className="fas fa-times-circle"
                ></i>
                {`Number of Baths: ${this.state.filters.number_of_bath}`}
              </span>
            ) : (
              <span></span>
            )}
          </h5>
          <h5>
            {this.state.filters.price ? (
              <span>
                <i
                  onClick={() => this.removeFilter("price")}
                  className="fas fa-times-circle"
                ></i>
                {`Max Price: ${this.state.filters.price}`}
              </span>
            ) : (
              <span></span>
            )}
          </h5>
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
              })}
        </div>
        <button onClick={() => this.pagination()}>
          Load More Apartments
        </button>

        {/* <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#">
                Previous
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                1
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                2
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                3
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav> */}
      </div>
    );
  }
}

export default Search;

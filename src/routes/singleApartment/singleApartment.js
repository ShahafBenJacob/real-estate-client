import React from "react";
import { getData } from "../../api/api";
import { Link } from "react-router-dom";

import "./singleApartment.scss";

class SingleApartment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apartment_id: props.location.state.id,
      images: []
    };
  }

  async componentDidMount() {
    const id = this.state.apartment_id;
    let images = await getData(`images/${id}`);

    this.setState({
      images: images
    });
  }

  pricePerSqft = (price, sqft) => {
    return Math.round(parseInt(price) / parseInt(sqft));
  };

  render() {
    const {
      user_name,
      id,
      city_name,
      city_id,
      country_name,
      address,
      price,
      number_of_room,
      number_of_bath,
      sqft,
      days_on_web,
      property_type,
      main_image
    } = this.props.location.state;
    return (
      <div className={"page-row row"}>
        <div className={"page-wrapper col-8"}>
          <div className={"carousel-wrapper"}>
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                {this.state.images.map((image, index) => (
                  <CarouselImage
                    image={image[1]}
                    index={index}
                    key={image[0]}
                  />
                ))}
              </div>
              <CarouselPrev />
              <CarouselNext />
            </div>
          </div>
          <div className={"details-part-wrapper"}>
            <div className={"details-part col-6"}>
              <h2><span>House Number</span> {id}</h2>
              <h2 className={'price'}>
                {price} 
                <i className="fas fa-shekel-sign"></i>
              </h2>
              <h2>
                <span>Full Address</span> {country_name}, {city_name}, {address}
              </h2>
              <h2><span>Property Type</span> {property_type}</h2>
              <h2>{sqft} <span>sqft</span></h2>
              <h2><span>Price Per sqft</span> {this.pricePerSqft(price, sqft)}</h2>
              <h2><span>Number Of Rooms</span> {number_of_room}</h2>
              <h2><span>Number Of Baths</span> {number_of_bath}</h2>
              <h2>
                <span>Publish By</span> {user_name} {days_on_web} Days Ago
              </h2>
            </div>
            <iframe
              className={"col-6"}
              title="map"
              src={`https://maps.google.com/maps?q=${city_name}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              frameBorder="0"
            ></iframe>
          </div>
        </div>
        <BackToApartments />
      </div>
    );
  }
}

export default SingleApartment;

function CarouselImage(props) {
  return (
    <div className={`carousel-item ${props.index === 0 ? "active" : ""}`}>
      <div
        className={"d-block image"}
        style={{
          backgroundImage: `url(http://localhost:3000/${props.image})`
        }}
      ></div>
    </div>
  );
}

function CarouselNext() {
  return (
    <a
      className="carousel-control-next"
      href="#carouselExampleControls"
      role="button"
      data-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  );
}

function CarouselPrev() {
  return (
    <a
      className="carousel-control-prev"
      href="#carouselExampleControls"
      role="button"
      data-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
  );
}

function BackToApartments(props) {
  return (
    <div className={"back-all-apartments-wrapper"}>
      <Link style={{ textDecoration: "none" }} to="/search">
        <button className={"back-all-apartments-button"}>
          Back To All Apartments
        </button>
      </Link>
    </div>
  );
}

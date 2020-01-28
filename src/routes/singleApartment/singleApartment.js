import React from "react";
import { getData } from "../../api/api";

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
      <div className={"page-wrapper"}>
        <div className={"carousel-wrapper"}>
          <div
            id="carouselExampleControls"
            class="carousel slide"
            data-ride="carousel"
          >
            <div class="carousel-inner">
              {this.state.images.map((image, index) => (
                <CarouselImage image={image[1]} index={index} key={image[0]} />
              ))}
            </div>
            <CarouselPrev />
            <CarouselNext />
          </div>
        </div>
        <div>
          <h2>{user_name}</h2>
          <h2>{id}</h2>
          <h2>{city_name}</h2>
          <h2>{city_id}</h2>
          <h2>{country_name}</h2>
          <h2>{address}</h2>
          <h2>{price}</h2>
          <h2>{number_of_room}</h2>
          <h2>{number_of_bath}</h2>
          <h2>{sqft}</h2>
          <h2>{days_on_web}</h2>
          <h2>{property_type}</h2>
          <h2>{main_image}</h2>

        </div>
      </div>
    );
  }
}

export default SingleApartment;

function CarouselImage(props) {
  return (
    <div className={`carousel-item ${props.index === 0 ? "active" : ""}`}>
      <div
        className={"d-block w-100 image"}
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
      class="carousel-control-next"
      href="#carouselExampleControls"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  );
}

function CarouselPrev() {
  return (
    <a
      class="carousel-control-prev"
      href="#carouselExampleControls"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
  );
}

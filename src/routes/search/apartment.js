import React from "react";
import { Link } from "react-router-dom";


function Apartment(props) {
  return (
    <div className={"apartment col-lg-4 col-12 col-md-6"}>
      <h5>{`Published by ${props.user_name} ${props.days_on_web} Days Ago`}</h5>
      <Link
            to={`/apartment/${props.id}`}
            style={{ textDecoration: "none"}}
          >
      <div
        className={"apartment-image"}
        style={{ backgroundImage: `url(http://localhost:3000/${props.main_image})` }}
      >
        <div className={"titles-wrapper"}>
          <div className={"property-type"}>{props.property_type}</div>
          <div className={"price"}>{`${props.price}$`}</div>

        </div>
        <i className="fas fa-heart heart"></i>
      </div>
      <div className={"under-image"}>
        <div className={"address-wrapper"}>
          <h5><i className="fas fa-city"></i>{props.country_name}, {props.city_name}, {props.address}</h5>
        </div>
        <div className={"apartment-detail-wrapper"}>
          <h5><i className="fas fa-door-open"></i>{props.number_of_room} Rooms</h5>
          <h5><i className="fas fa-bath"></i>{props.number_of_bath} Baths</h5>
          <h5><i className="fas fa-ruler-combined"></i>{props.sqft} Sqft</h5>
        </div>
      </div>
      </Link>
    </div>
  );
}

export default Apartment;

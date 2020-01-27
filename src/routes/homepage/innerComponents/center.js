import React from "react";
import { Link } from "react-router-dom";


function CenterPage(props) {
  return (
    <div
      className={"background-image"}
      style={{
        backgroundImage: 'url("http://localhost:3000/images/main.jpg")'
      }}
    >
      <div className={"items center"}>
        <div className={"second-background"}>
          <h1>
            Home Is Where The <i className="fas fa-heart heart"></i> Is
          </h1>
          <Link style={{ textDecoration: "none" }} to= "/search">
            <button>
              Fall In Love <br />
              With Our Homes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CenterPage;

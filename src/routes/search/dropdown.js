import React from "react";

function Dropdown(props) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenu2"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {props.title}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenu2"
      style={{overflowX: "auto", height: "200px"}}>
        {props.values.map((value, i) => {
          return (
            <button
              key={i}
              className="dropdown-item"
              type="button"
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Dropdown;

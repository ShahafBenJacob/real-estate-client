import React from "react";
import Dropdown from "./dropdown";


function Range() {
  return (
    <div className="range-wrapper">
      <Dropdown title={"min"} values={[0,1,2]}/>
      <Dropdown title={"max"} values={[0,1,2]}/>
    </div>
  );
}

export default Range;

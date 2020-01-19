import React from "react";

class Numbers extends React.Component {
  render() {
    const { number, title } = this.props;
    return (
      <li className={"col-4"}>
        <p className={"num"}>{number}</p>
        <p className={"title"}>{title}</p>
      </li>
    );
  }
}

export default Numbers;

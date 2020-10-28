import React from "react";
import "./App.css";
import "./Main.css";
import Button from "./Button";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(value) {
    console.log(value);
  }

  render() {
    return (
      <main className="Main">
        <p>
          The purpose of the Coronavirus Self-Checker is to help you make
          decisions about seeking appropriate medical care. This system is not
          intended for the diagnosis or treatment of disease, including
          COVID-19.
        </p>
        <div>
          <Button text={"I agree"} value={"agree"} onClick={this.handleClick} />
          <Button
            text={"I don't agree"}
            value={"disagree"}
            onClick={this.handleClick}
          />
        </div>
      </main>
    );
  }
}

export default Main;

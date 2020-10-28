import React from "react";
import "./App.css";
import "./Main.css";
import Button from "./Button";
import stepsData from "./../stepsData";

class Main extends React.Component {
  constructor(props) {
    super(props);

    const initialState = {
      currentStep: "disclaimer",
      step: stepsData[0],
    };
    this.state = initialState;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(value) {
    console.log(value);
  }

  render() {
    const stepOptions = this.state.step.options.map((option) => (
      <Button
        key={option.id}
        text={option.text}
        next={option.next}
        onClick={this.handleClick}
      />
    ));

    return (
      <main className="Main">
        <p>{this.state.step.prompt}</p>
        <div>{stepOptions}</div>
      </main>
    );
  }
}

export default Main;

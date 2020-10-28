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

  handleClick(nextValue) {
    // Just keeping an eye on things for now... @_o
    console.log(nextValue);
    console.log(this.state);

    const nextStep = stepsData.find((step) => step.id === nextValue);

    this.setState({
      currentStep: nextValue,
      step: nextStep,
    });
  }

  render() {
    if (this.state.step.final) {
      return (
        <main className="Main">
          <p>{this.state.step.prompt}</p>
        </main>
      );
    }

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

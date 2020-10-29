import React from "react";
import "./App.css";
import "./Main.css";
import Button from "./Button";
import screener from "./../stepsData";

class Main extends React.Component {
  constructor(props) {
    super(props);

    const initialState = {
      currentStep: "step-disclaimer",
      step: screener.stepsData[0],
    };
    this.state = initialState;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id, nextValue) {
    // Just keeping an eye on things for now... @_o
    console.log("Step id: ", id);
    console.log("nextValue: ", nextValue);
    console.log("this.state: ", this.state);

    this.updateDemographicData(id);

    console.log("Screener is now: ", screener);

    const nextStep = screener.stepsData.find((step) => step.id === nextValue);

    this.setState({
      currentStep: nextValue,
      step: nextStep,
    });
  }

  updateDemographicData(id) {
    // TODO: Refactor this later
    switch (id) {
      case "option--answering-for-self-or-other--self":
        screener.pronouns = {
          personal: "you",
          possessive: "your",
        };
        break;
      case "option--answering-for-self-or-other--other":
        screener.pronouns = {
          personal: "they",
          possessive: "their",
        };
        break;
      case "option--age--<2":
        screener.age = "<2";
        screener.ageCategory = "CHILD";
        break;
      case "option--age--2-9":
        screener.age = "2-9";
        screener.ageCategory = "CHILD";
        break;
      case "option--age--10-12":
        screener.age = "10-12";
        screener.ageCategory = "CHILD";
        break;
      case "option--age--13-17":
        screener.age = "13-17";
        screener.ageCategory = "CHILD";
        break;
      case "option--age--18-64":
        screener.age = "18-64";
        screener.ageCategory = "ADULT";
        break;
      case "option--age--65+":
        screener.age = "65+";
        screener.ageCategory = "ADULT";
        break;
      default:
        break;
    }
  }

  render() {
    if (this.state.step.final) {
      // There might be a good way to extract this duplication in React?
      return (
        <main className="Main">
          <h1 className="Main-header">{this.state.step.promptHeader}</h1>
          <p className="Main-paragraph">{this.state.step.getPrompt()}</p>
        </main>
      );
    }

    const stepOptions = this.state.step.options.map((option) => (
      <Button
        key={option.id}
        id={option.id}
        text={option.text}
        next={option.next}
        onClick={this.handleClick}
      />
    ));

    return (
      <main className="Main">
        <p className="Main-paragraph">{this.state.step.getPrompt()}</p>
        <div>{stepOptions}</div>
      </main>
    );
  }
}

export default Main;

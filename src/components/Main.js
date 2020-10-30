import React from "react";
import "./App.css";
import "./Main.css";
import Button from "./Button";
import screener from "./../stepsData";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: screener.stepsData[0],
    };

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
      step: nextStep,
    });
  }

  updateDemographicData(id) {
    // TODO: Refactor this later
    switch (id) {
      case "option--answering-for-self-or-other--self":
        screener.testTaker = "self";
        break;
      case "option--answering-for-self-or-other--other":
        screener.testTaker = "other";
        break;
      case "option--age--<2":
        screener.age = "<2";
        break;
      case "option--age--2-9":
        screener.age = "2-9";
        break;
      case "option--age--10-12":
        screener.age = "10-12";
        break;
      case "option--age--13-17":
        screener.age = "13-17";
        break;
      case "option--age--18-64":
        screener.age = "18-64";
        break;
      case "option--age--65+":
        screener.age = "65+";
        break;
      default:
        break;
    }
  }

  render() {
    const stepOptions = this.state.step.options.map((option) => (
      <Button
        key={option.id}
        id={option.id}
        text={option.text}
        next={option.getNextId()}
        onClick={this.handleClick}
      />
    ));

    return (
      <main className="Main">
        {!!this.state.step.final && (
          <h1 className="Main-header">{this.state.step.promptHeader}</h1>
        )}
        <p className="Main-paragraph">{this.state.step.getPrompt()}</p>
        {!this.state.step.final && <div>{stepOptions}</div>}
      </main>
    );
  }
}

export default Main;

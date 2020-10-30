import React from "react";
import "./App.css";
import "./Main.css";
import Button from "./Button";
import screener from "./../stepsData";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [{ step: screener.stepsData[0], previousSelection: undefined }],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(stepId, optionId, nextValue) {
    const history = this.state.history;

    // Just keeping an eye on things for now... @_o
    console.log("=========== handleClick =============");
    console.log("stepId: ", stepId);
    console.log("optionId: ", optionId);
    console.log("nextValue: ", nextValue);
    console.log("this.state: ", this.state);
    console.log("history: ", history);

    this.updateDemographicData(optionId);

    console.log("Screener is now: ", screener);

    const currentStep = screener.stepsData.find((step) => step.id === stepId);

    console.log("currentStep: ", currentStep);

    const nextStep = screener.stepsData.find((step) => step.id === nextValue);

    const currentSelection = currentStep.options.find(
      (option) => option.id === optionId
    );

    console.log("currentSelection.text: ", currentSelection.text);

    console.log("nextStep: ", nextStep);

    this.setState({
      history: history.concat([
        { step: nextStep, previousSelection: currentSelection?.text },
      ]),
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
    const history = this.state.history;
    const currentHistory = history[history.length - 1];
    const currentStep = currentHistory.step;

    console.log("============ render =============");
    console.log("history: ", history);
    console.log("currentHistory: ", currentHistory);
    console.log("currentStep: ", currentStep);

    let stepOptionsButtons;
    if (!currentStep.final) {
      stepOptionsButtons = currentStep.options.map((option) => (
        <Button
          key={option.id}
          optionId={option.id}
          stepId={currentStep.id}
          text={option.text}
          next={option.getNextId()}
          onClick={this.handleClick}
          buttonStyle={"Button-response"}
        />
      ));
    }

    let previousSelection;
    if (currentHistory.previousSelection) {
      previousSelection = (
        <p className="Main-paragraph Main-from-test-taker">
          {currentHistory.previousSelection}
        </p>
      );
    }

    console.log("previousSelection: ", previousSelection);

    return (
      <main className="Main">
        <div className="Main-content">
          {!!currentHistory.previousSelection && previousSelection}
          {!!currentStep.final && (
            <p className="Main-header">{currentStep.promptHeader}</p>
          )}
          <p className="Main-paragraph Main-from-screener">
            {currentStep.getPrompt()}
          </p>
          {!currentStep.final && <div>{stepOptionsButtons}</div>}
        </div>
      </main>
    );
  }
}

export default Main;

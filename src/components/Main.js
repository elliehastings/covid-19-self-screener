import React from "react";
import Step from "./Step";
import screener from "../screener";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [{ step: screener.stepsData[0], previousSelection: undefined }],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(stepId, optionId, nextValue) {
    this.updateDemographicData(optionId);

    const history = this.state.history;
    const currentStep = screener.stepsData.find((step) => step.id === stepId);
    const nextStep = screener.stepsData.find((step) => step.id === nextValue);
    const currentSelection = currentStep.options.find(
      (option) => option.id === optionId
    );

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
      case "option--gender--female":
        screener.gender = "female";
        break;
      case "option--gender--male":
        screener.gender = "male";
        break;
      case "option--gender--other":
        screener.gender = "other";
        break;
      default:
        break;
    }
  }

  render() {
    const history = this.state.history;

    const steps = history.map(function (historyEntry, index, history) {
      const historyLength = history.length - 1;

      return (
        <Step
          key={index}
          historyEntry={historyEntry}
          stepNumber={index}
          historyLength={historyLength}
          handleClick={this.handleClick}
        />
      );
    }, this);

    return (
      <main>
        <div>{steps}</div>
      </main>
    );
  }
}

export default Main;

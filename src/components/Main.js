import React from "react";
import "./App.css";
import "./Main.css";
import Button from "./Button";
import Response from "./Response";
import Prompt from "./Prompt";
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
      default:
        break;
    }
  }

  render() {
    const history = this.state.history;

    const historyElements = history.map(function (
      historyEntry,
      index,
      history
    ) {
      const currentStep = historyEntry.step;

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

      const previousSelection = historyEntry.previousSelection;
      const isLastSelection = index === history.length - 1;

      const historyElement = (
        <main className="Main">
          <div className="Main-content">
            {!!previousSelection && <Response text={previousSelection} />}
            {!!currentStep.final && <Prompt text={currentStep.promptHeader} />}
            <Prompt text={currentStep.getPrompt()} />
            {!currentStep.final && isLastSelection && (
              <div>{stepOptionsButtons}</div>
            )}
          </div>
        </main>
      );

      return historyElement;
    },
    this);

    return historyElements;
  }
}

export default Main;

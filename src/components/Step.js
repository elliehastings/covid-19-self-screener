import React from "react";
import "./App.css";
import "./Step.css";
import Button from "./Button";
import Response from "./Response";
import Prompts from "./Prompts";

function Step(props) {
  const currentStep = props.historyEntry.step;

  let stepOptionsButtons;
  if (!currentStep.final) {
    stepOptionsButtons = currentStep.options.map((option) => (
      <Button
        key={option.id}
        optionId={option.id}
        stepId={currentStep.id}
        text={option.text}
        next={option.getNextId()}
        onClick={props.handleClick}
      />
    ));
  }

  const previousSelection = props.historyEntry.previousSelection;
  const isLatestSelection = props.stepNumber === props.historyLength;

  return (
    <div key={props.stepNumber}>
      {!!previousSelection && <Response text={previousSelection} />}
      <Prompts prompts={currentStep.getPrompts()} />
      {!currentStep.final && isLatestSelection && (
        <div>{stepOptionsButtons}</div>
      )}
    </div>
  );
}

export default Step;

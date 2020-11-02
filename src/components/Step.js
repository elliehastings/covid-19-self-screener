import React from "react";
import "./App.css";
import "./Step.css";
import Message from "./Message";
import Button from "./Button";

function Step(props) {
  const currentStep = props.historyEntry.step;
  const previousSelection = props.historyEntry.previousSelection;
  const isLatestSelection = props.stepNumber === props.historyLength;

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

  const prompts = currentStep.getPrompts();
  const promptMessages = prompts.map((prompt, index) => (
    <Message key={index} text={prompt} messageType={"prompt"} />
  ));

  return (
    <div key={props.stepNumber}>
      {!!previousSelection && (
        <Message text={previousSelection} messageType={"response"} />
      )}
      {promptMessages}
      {!currentStep.final && isLatestSelection && (
        <div>{stepOptionsButtons}</div>
      )}
    </div>
  );
}

export default Step;

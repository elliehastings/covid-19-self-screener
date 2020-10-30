import "./App.css";
import "./Main.css";
import "./Button.css";

function Button(props) {
  const buttonClasses = props.buttonStyle
    ? `Button ${props.buttonStyle}`
    : "Button";
  return (
    <button
      className={buttonClasses}
      onClick={() => props.onClick(props.stepId, props.optionId, props.next)}
    >
      {props.text}
    </button>
  );
}

export default Button;

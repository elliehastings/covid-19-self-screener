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
      onClick={() => props.onClick(props.id, props.next)}
    >
      {props.text}
    </button>
  );
}

export default Button;

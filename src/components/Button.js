import "./Button.css";

function Button(props) {
  return (
    <button
      className="Button Button-response"
      onClick={() => props.onClick(props.stepId, props.optionId, props.next)}
    >
      {props.text}
    </button>
  );
}

export default Button;

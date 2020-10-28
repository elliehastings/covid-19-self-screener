import "./App.css";
import "./Main.css";
import "./Button.css";

function Button(props) {
  return (
    <button
      className="Button Button-response"
      onClick={() => props.onClick(props.next)}
    >
      {props.text}
    </button>
  );
}

export default Button;

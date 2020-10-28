import "./App.css";
import "./Main.css";
import "./Button.css";

function Button(props) {
  return (
    <button
      className="Button Button-response"
      onClick={() => props.onClick(props.value)}
    >
      {props.text}
    </button>
  );
}

export default Button;

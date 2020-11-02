import Prompt from "./Prompt";

function Prompts(props) {
  return props.prompts.map((prompt, index) => (
    <Prompt text={prompt} key={index} />
  ));
}

export default Prompts;

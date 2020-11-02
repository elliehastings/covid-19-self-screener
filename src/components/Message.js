import "./Message.css";

function Message(props) {
  const styles = `Message-paragraph Message-${props.messageType}`;

  return <p className={styles}>{props.text}</p>;
}

export default Message;

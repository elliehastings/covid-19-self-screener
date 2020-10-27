import "./Footer.css";

function Footer() {
  return (
    <footer className="Footer">
      Based on the{" "}
      <a
        href="https://github.com/CDCgov/covid19healthbot"
        rel="noopener"
        className="App-link"
      >
        CDC COVID-19 Online Self-Checker
      </a>
      <br></br>Made with 💛 at{" "}
      <a href="https://www.iorahealth.com/" rel="noopener" className="App-link">
        Iora Health
      </a>
    </footer>
  );
}

export default Footer;

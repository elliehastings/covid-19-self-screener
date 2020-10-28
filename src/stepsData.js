const stepsData = [
  {
    id: "disclaimer",
    prompt:
      "The purpose of the Coronavirus Self-Checker is to help you make decisions about seeking appropriate medical care. This system is not intended for the diagnosis or treatment of disease, including COVID-19.",
    options: [
      {
        id: "disclaimer-agree",
        value: "agree",
        text: "I agree",
        next: "intro-messaging",
        final: false,
      },
      {
        id: "disclaimer-disagree",
        value: "disagree",
        text: "I disagree",
        next: "disclaimer",
        final: false,
        result: {
          text: "Please consent to use the Coronavirus Self- Checker.",
        },
      },
    ],
  },
  {
    id: "intro-messaging",
    prompt:
      "I’m going to ask you some questions. I will use your answers to give you advice about the level of medical care you should seek. \nBut first, if you are experiencing a life-threatening emergency, please call 911 immediately. \nIf you are not experiencing a life-threatening emergency, let’s get started.\nDuring the assessment, you can refresh the page if you need to start again.",
    options: [
      {
        id: "intro-messaging-continue",
        value: "continue",
        text: "Continue",
        next: "this-id-is-tbd",
        final: false,
      },
    ],
  },
];

export default stepsData;

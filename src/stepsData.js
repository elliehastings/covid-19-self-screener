const stepsData = [
  {
    id: "step--disclaimer",
    prompt:
      "The purpose of the Coronavirus Self-Checker is to help you make decisions about seeking appropriate medical care. This system is not intended for the diagnosis or treatment of disease, including COVID-19.",
    options: [
      {
        id: "option--disclaimer-agree",
        text: "I agree",
        next: "step--intro-messaging",
      },
      {
        id: "option--disclaimer-disagree",
        text: "I disagree",
        next: "result--disclaimer-disagree",
      },
    ],
  },
  {
    id: "step--intro-messaging",
    prompt:
      "I’m going to ask you some questions. I will use your answers to give you advice about the level of medical care you should seek. \nBut first, if you are experiencing a life-threatening emergency, please call 911 immediately. \nIf you are not experiencing a life-threatening emergency, let’s get started.\nDuring the assessment, you can refresh the page if you need to start again.",
    options: [
      {
        id: "option--intro-messaging-continue",
        text: "Continue",
        next: "step--international-testing",
      },
    ],
  },
  {
    id: "result--disclaimer-disagree",
    prompt: "Please consent to use the Coronavirus Self-Checker.",
    final: true,
  },
  {
    id: "step--international-testing",
    prompt:
      "I’m going to ask you some questions. I will use your answers to give you advice about the level of medical care you should seek. \nBut first, if you are experiencing a life-threatening emergency, please call 911 immediately. \nIf you are not experiencing a life-threatening emergency, let’s get started.\nDuring the assessment, you can refresh the page if you need to start again.",
    options: [
      {
        id: "option--intro-messaging-continue",
        text: "Continue",
        // NEXT
        next: "step--this-id-is-tbd",
      },
    ],
  },
  {
    id: "step--result-disclaimer-disagree",
    prompt: "Please consent to use the Coronavirus Self-Checker.",
    final: true,
  },
];

export default stepsData;

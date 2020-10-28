const stepsData = [
  {
    id: "disclaimer",
    name: "disclaimer",
    prompt:
      "The purpose of the Coronavirus Self-Checker is to help you make decisions about seeking appropriate medical care. This system is not intended for the diagnosis or treatment of disease, including COVID-19.",
    options: [
      {
        id: "disclaimer-agree",
        value: "agree",
        text: "I agree",
        next: "this-id-is-tbd",
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
];

export default stepsData;

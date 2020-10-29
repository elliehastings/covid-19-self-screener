class Screener {
  constructor() {
    this.testTaker = undefined;
    this.age = undefined;
    this.gender = undefined;
    this.stepsData = [
      {
        id: "step--disclaimer",
        getPrompt: () =>
          "The purpose of the Coronavirus Self-Checker is to help you make decisions about seeking appropriate medical care. This system is not intended for the diagnosis or treatment of disease, including COVID-19.",
        options: [
          {
            id: "option--disclaimer--agree",
            text: "I agree",
            getNextId: () => "step--intro-messaging",
          },
          {
            id: "option--disclaimer--disagree",
            text: "I disagree",
            getNextId: () => "step--disclaimer--disagree",
          },
        ],
      },
      {
        id: "step--intro-messaging",
        getPrompt: () =>
          "I’m going to ask you some questions. I will use your answers to give you advice about the level of medical care you should seek. \nBut first, if you are experiencing a life-threatening emergency, please call 911 immediately. \nIf you are not experiencing a life-threatening emergency, let’s get started.\nDuring the assessment, you can refresh the page if you need to start again.",
        options: [
          {
            id: "option--intro-messaging--continue",
            text: "Continue",
            getNextId: () => "step--international-testing",
          },
        ],
      },
      {
        id: "step--disclaimer--disagree",
        promptHeader: "Consent required.",
        getPrompt: () => "Please consent to use the Coronavirus Self-Checker.",
        final: true,
      },
      {
        id: "step--international-testing",
        getPrompt: () =>
          "Are you in the United States or a U.S. territory right now?",
        options: [
          {
            id: "option--international-testing--yes",
            text: "Yes",
            getNextId: () => "step--answering-for-self-or-other",
          },
          {
            id: "option--international-testing--no",
            text: "No",
            getNextId: () => "step--international-testing--not-usa",
          },
        ],
      },
      // The CDC workflow does support an international workflow but we're focused on the US for now
      {
        id: "step--international-testing--not-usa",
        promptHeader: "International cases not supported.",
        getPrompt: () =>
          "I'm sorry, this self-screener only supports the United States at this time.",
        final: true,
      },
      {
        id: "step--answering-for-self-or-other",
        getPrompt: () => "Are you answering for yourself or someone else?",
        options: [
          {
            id: "option--answering-for-self-or-other--self",
            text: "Myself",
            getNextId: () => "step--age",
          },
          {
            id: "option--answering-for-self-or-other--other",
            text: "Someone else",
            getNextId: () => "step--age",
          },
        ],
      },
      // Age Question
      {
        id: "step--age",
        getPrompt: () => `What is ${this.pronouns.possessive} age?`,
        // TODO - make these options real
        options: [
          {
            id: "option--age--<2",
            text: "Younger than 2 years old",
            getNextId: () => "step--age--<2",
          },
          {
            id: "option--age--2-9",
            text: "2-9 years",
            getNextId: () => {
              if (this.testTaker === "self") {
                return "step--age--2-9--self";
              } else {
                return "step--gender";
              }
            },
          },
          {
            id: "option--age--10-12",
            text: "10-12 years",
            getNextId: () => {
              if (this.testTaker === "self") {
                return "step--age--10-12--self";
              } else {
                return "step--gender";
              }
            },
          },
          {
            id: "option--age--13-17",
            text: "13-17 years",
            getNextId: () => {
              if (this.testTaker === "self") {
                return "step--age--13-17--self";
              } else {
                return "step--gender";
              }
            },
          },
          {
            id: "option--age--18-64",
            text: "18-64 years",
            getNextId: () => "step--gender",
          },
          {
            id: "option--age--65+",
            text: "65+ years",
            getNextId: () => "step--gender",
          },
        ],
      },
      // Age Results
      {
        id: "step--age--<2",
        promptHeader: "Contact a medical provider.",
        getPrompt: () =>
          "This tool is intended for people 2 years or older. Please call the child’s medical provider, clinician advice line, or telemedicine provider.",
        final: true,
      },
      {
        id: "step--age--2-9--self",
        promptHeader:
          "Please ask your parent or guardian to help you complete these questions.",
        getPrompt: () =>
          "Please restart the self-checker when you have help from your parent or guardian.",
        final: true,
      },
      {
        id: "step--age--10-12--self",
        getPrompt: () =>
          "Please continue the self-checker when you have help from your parent or guardian.",
        options: [
          {
            id: "option--gender",
            text: "Continue",
            getNextId: () => "step--gender",
          },
        ],
      },
      {
        id: "step--age--13-17--self",
        getPrompt: () =>
          "Ask a parent or guardian to assist you, or if taking by yourself, share these results with your parent/guardian.",
        options: [
          {
            id: "option--gender",
            text: "Continue",
            getNextId: () => "step--gender",
          },
        ],
      },
      // Next questions
      {
        id: "step--gender",
        getPrompt: () => `What is ${this.pronouns.possessive} gender?`,
        // TODO
        options: [
          {
            id: "option--gender--f",
            text: "Female",
            getNextId: () => "step--this-id-is-tbd",
          },
        ],
      },
    ];
  }

  get pronouns() {
    if (this.testTaker === "other") {
      return {
        personal: "they",
        possessive: "their",
      };
    } else {
      return {
        personal: "you",
        possessive: "your",
      };
    }
  }

  get ageCategory() {
    if (["<2", "2-9", "10-12", "13-17"].includes(this.age)) {
      return "child";
    } else if (["18-64", "65+"].includes(this.age)) {
      return "adult";
    } else {
      return undefined;
    }
  }

  get riskCategory() {
    if (this.age === "65+") {
      return "high";
    } else if (this.age) {
      return "low";
    } else {
      return undefined;
    }
  }
}

export default new Screener();

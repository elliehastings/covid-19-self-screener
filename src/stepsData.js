class Screener {
  constructor() {
    this.pronouns = {};
    this.gender = undefined;
    this.age = undefined;
    this.ageCategory = undefined;
    this.stepsData = [
      {
        id: "step--disclaimer",
        getPrompt: () =>
          "The purpose of the Coronavirus Self-Checker is to help you make decisions about seeking appropriate medical care. This system is not intended for the diagnosis or treatment of disease, including COVID-19.",
        options: [
          {
            id: "option--disclaimer--agree",
            text: "I agree",
            next: "step--intro-messaging",
          },
          {
            id: "option--disclaimer--disagree",
            text: "I disagree",
            next: "step--disclaimer--disagree",
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
            next: "step--international-testing",
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
            next: "step--answering-for-self-or-other",
          },
          {
            id: "option--international-testing--no",
            text: "No",
            next: "step--international-testing--not-usa",
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
            next: "step--age",
          },
          {
            id: "option--answering-for-self-or-other--other",
            text: "Someone else",
            next: "step--age",
          },
        ],
      },
      {
        id: "step--age",
        getPrompt: () => `What is ${this.pronouns.possessive} age?`,
        // TODO - make these options real
        options: [
          {
            id: "option--age--<2",
            text: "Younger than 2 years old",
            next: "step--age--<2",
          },
          {
            id: "option--age--2-9",
            text: "2-9 years",
            next: "step--gender",
          },
          {
            id: "option--age--10-12",
            text: "10-12 years",
            next: "step--gender",
          },
          {
            id: "option--age--13-17",
            text: "13-17 years",
            next: "step--gender",
          },
          {
            id: "option--age--18-64",
            text: "18-64 years",
            next: "step--gender",
          },
          {
            id: "option--age--65+",
            text: "65+ years",
            next: "step--gender",
          },
        ],
      },
      {
        id: "step--age--<2",
        promptHeader: "Contact a medical provider.",
        getPrompt: () =>
          "This tool is intended for people 2 years or older. Please call the child’s medical provider, clinician advice line, or telemedicine provider.",
        final: true,
      },
      {
        id: "step--gender",
        getPrompt: () => `What is ${this.pronouns.possessive} gender?`,
        // TODO
        options: [
          {
            id: "option--gender--f",
            text: "Female",
            next: "step--this-id-is-tbd",
          },
        ],
      },
    ];
  }
}

export default new Screener();

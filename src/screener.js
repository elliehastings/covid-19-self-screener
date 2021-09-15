// Note: The point of Hackfest is to learn something new and demo something cool -
// in this case, the focus was on the React UI, so this is a bit of a Wizard-of-Oz
// app, and this class is the sad thing behind the screen :)

class Screener {
  constructor() {
    this.testTaker = undefined;
    this.age = undefined;
    this.gender = undefined;
    this.stepsData = [
      {
        id: "step--disclaimer",
        getPrompts: () => [
          "The purpose of the Coronavirus Self-Checker is to help you make decisions about seeking appropriate medical care. This system is not intended for the diagnosis or treatment of disease, including COVID-19.",
        ],
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
        getPrompts: () => [
          "I’m going to ask you some questions. I will use your answers to give you advice about the level of medical care you should seek. \nBut first, if you are experiencing a life-threatening emergency, please call 911 immediately. \nIf you are not experiencing a life-threatening emergency, let’s get started.\nDuring the assessment, you can refresh the page if you need to start again.",
        ],
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
        getPrompts: () => [
          "Consent required.",
          "Please consent to use the Coronavirus Self-Checker.",
        ],
        final: true,
      },
      {
        id: "step--international-testing",
        getPrompts: () => [
          "Are you in the United States or a U.S. territory right now?",
        ],
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
        getPrompts: () => [
          "International cases not supported.",
          "I'm sorry, this self-screener only supports the United States at this time.",
        ],
        final: true,
      },
      {
        id: "step--answering-for-self-or-other",
        getPrompts: () => ["Are you answering for yourself or someone else?"],
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
        getPrompts: () => [`What is ${this.pronouns.possessive} age?`],
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
        getPrompts: () => [
          "Contact a medical provider.",
          "This tool is intended for people 2 years or older. Please call the child’s medical provider, clinician advice line, or telemedicine provider.",
        ],
        final: true,
      },
      {
        id: "step--age--2-9--self",
        getPrompts: () => [
          "Ask your parent or guardian to help you complete these questions.",
          "Please restart the self-checker when you have help from your parent or guardian.",
        ],
        final: true,
      },
      {
        id: "step--age--10-12--self",
        getPrompts: () => [
          "Ask your parent or guardian to help you complete these questions.",
          "Please continue the self-checker when you have help from your parent or guardian.",
        ],
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
        getPrompts: () => [
          "Ask a parent or guardian to assist you, or if taking by yourself, share these results with your parent/guardian.",
        ],
        options: [
          {
            id: "option--gender",
            text: "Continue",
            getNextId: () => "step--gender",
          },
        ],
      },
      {
        id: "step--gender",
        getPrompts: () => [`What is ${this.pronouns.possessive} gender?`],
        options: [
          {
            id: "option--gender--female",
            text: "Female",
            getNextId: () => `step--emergency-symptoms--${this.ageCategory}`,
          },
          {
            id: "option--gender--male",
            text: "Male",
            getNextId: () => `step--emergency-symptoms--${this.ageCategory}`,
          },
          {
            id: "option--gender--other",
            text: "Other",
            getNextId: () => `step--emergency-symptoms--${this.ageCategory}`,
          },
        ],
      },
      {
        id: "step--emergency-symptoms--adult",
        getPrompts: () => [
          `Do ${this.pronouns.personal} have any of these life-threatening symptoms?
          • Bluish lips or face
          • Severe and constant pain or pressure in the chest
          • Extreme difficulty breathing (such as gasping for air, being unable to talk without catching ${this.pronouns.possessive} breath, severe wheezing, nostrils flaring)
          • New disorientation (acting confused)
          • Unconscious or very difficult to wake up
          • Slurred speech or difficulty speaking (new or worsening)
          • New or worsening seizures
          • Signs of low blood pressure (too weak to stand, dizziness, lightheaded, feeling cold, pale, clammy skin)
          • Dehydration (dry lips and mouth, not urinating much, sunken eyes)`,
        ],
        options: [
          {
            id: "option--emergency-symptoms--adult-yes",
            text: "Yes",
            getNextId: () => "step--emergency-symptoms--yes",
          },
          {
            id: "option--emergency-symptoms--adult-no",
            text: "No",
            getNextId: () => "step--feeling-sick",
          },
        ],
      },
      {
        id: "step--emergency-symptoms--child",
        getPrompts: () => [
          `Do ${this.pronouns.personal} have any of these life-threatening symptoms?
          • Bluish lips or face
          • Severe and constant pain or pressure in the chest
          • Extreme difficulty breathing (such as gasping for air, being unable to walk or talk without catching ${this.pronouns.possessive} breath, severe wheezing, nostrils flaring, grunting, or using extra muscles around the chest to help breathe)
          • Disoriented (acting confused or very irritable)
          • Unconscious or very difficult to wake up
          • New or worsening seizures
          • Signs of low blood pressure (too weak to stand, dizziness, lightheaded, feeling cold, pale, clammy skin)
          • Dehydration (dry lips and mouth, not urinating much, sunken eyes)
          • Refusing to drink liquids
          • Frequent vomiting`,
        ],
        options: [
          {
            id: "option--emergency-symptoms--child-yes",
            text: "Yes",
            getNextId: () => "step--emergency-symptoms--yes",
          },
          {
            id: "option--emergency-symptoms--child-no",
            text: "No",
            getNextId: () => "step--this-id-is-tbd",
          },
        ],
      },
      {
        id: "step--emergency-symptoms--yes",
        getPrompts: () => [
          "Urgent medical attention may be needed. Please call 911 or go to the Emergency Department.",
          `Based on ${this.pronouns.possessive} symptoms, ${this.pronouns.personal} may need urgent medical care. Please call 911 or go to the nearest emergency department.
          \nTell the 911 operator or emergency staff if ${this.pronouns.personal} have had contact with someone with COVID-19.`,
        ],
        final: true,
      },
      {
        id: "step--feeling-sick",
        getPrompts: () => [`Are ${this.pronouns.personal} feeling sick?`],
        options: [
          {
            id: "option--sick--yes",
            text: "Yes",
            getNextId: () => "step--symptomatic-exposure-y-n",
          },
          {
            id: "option--sick--no",
            text: "No",
            getNextId: () => "step--asymptomatic-exposure-y-n",
          },
        ],
      },
      //TODO
      {
        id: "step--symptomatic-exposure-y-n",
        getPrompts: () => [
          `In the two weeks before ${this.pronouns.personal} felt sick, did ${this.pronouns.personal} care for or have close contact (within 6 feet of an infected person for at least 15 minutes) with someone with symptoms of COVID-19, tested for COVID-19, or diagnosed with COVID-19?`,
        ],
        options: [
          {
            id: "option--symptomatic-exposure-y-n--yes",
            text: "Yes",
            getNextId: () => "step--exposure--symptoms",
          },

          {
            id: "option--symptomatic-exposure-y-n--no",
            text: "No",
            getNextId: () => "step--this-id-is-tbd",
          },
          {
            id: "option--symptomatic-exposure-y-n--dont-know",
            text: "I don't know",
            getNextId: () => "step--exposure--symptoms",
          },
        ],
      },
      // TODO
      {
        id: "step--asymptomatic-exposure-y-n",
        getPrompts: () => [
          `In the last two weeks, did ${this.pronouns.personal} care for or have close contact (within 6 feet of an infected person for at least 15 minutes) with someone with symptoms of COVID-19, tested for COVID-19, or diagnosed with COVID-19?`,
        ],
        options: [
          {
            id: "option--asymptomatic-exposure-y-n--yes",
            text: "Yes",
            getNextId: () => "step--this-id-is-tbd",
          },
          {
            id: "option--asymptomatic-exposure-y-n--no",
            text: "No",
            getNextId: () => "step--this-id-is-tbd",
          },
          {
            id: "option--symptomatic-exposure-y-n--dont-know",
            text: "I don't know",
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

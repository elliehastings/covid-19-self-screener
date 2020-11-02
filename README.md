# COVID-19 Screener

Implements the [screening protocol provided by the CDC](https://github.com/CDCgov/covid19healthbot/blob/master/screening_protocols/covid_19_screening_protocol_cdc_apple.pdf).

This project was created during the 2020 (virtual) Hackfest at [Iora Health](https://www.iorahealth.com/)! As such it has no test coverage but a lot of 💛.

## Versions

I tinkered with a few different iterations of this site, each stored in a
separate branch in this repo.

- main / [display-history-chat-style-version](https://github.com/elliehastings/covid-19-self-screener/tree/display-history-chat-style-version) -
  displays an iOS chat bubble type of interaction that displays previous selections
  in a running history that looks like an iOS conversation.
- [simple-version](https://github.com/elliehastings/covid-19-self-screener/tree/simple-version) - a simple version with no history and plain
  create-react-app type styling that simply moves from one prompt to the next without any other functionality.
- [simple-with-previous-button-version](https://github.com/elliehastings/covid-19-self-screener/tree/simple-with-previous-button-version) - a simple
  version with no displayed history but the ability to select a 'Previous' button to go back a single step.

## Running the site

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

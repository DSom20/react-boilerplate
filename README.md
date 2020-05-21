# Tidbits!

This is a fork of the react-boilerplate repo for purposes of the take-home screen portion of the DMI interview process.

## How to Start Locally
1. Clone repo and `cd` into it
2. `npm install`
3. `npm start`
4. Navigate on browser to localhost:3000/

## You'll want the backend too!
It's found at ""
To get it started:
1. Clone repo and `cd` into it
2. `npm install`
3. `npm start`

The backend starts by default on port 5000

## Technologies Used
Among others, this project utilizes React Router, Redux, React Sagas, Reselect, Styled Components, and React Testing Library

The Alert styled component utilizes conditional styling to determine whether it is green/red based on given props.

The NewTidbit container has full unit testing.

Testing Note:
  Test the NewTidbit container with
    `jest "NewTidbit"`
  Running `npm test` will run all tests, throwing errors for there not being any tests for some components.

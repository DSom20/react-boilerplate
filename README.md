# Tidbits!

This is a fork of the react-boilerplate repo for purposes of the take-home screen portion of the DMI interview process.

## How to Start Locally
1. Clone repo and `cd` into it
2. `npm install`
3. `npm start`
4. Navigate on browser to localhost:3000/
(5. Previously there was a separate backend api app to run. Now it is incorporated into the frontend server.)

## Technologies Used
This project utilizes React Router, Redux, React Sagas, Reselect, Styled Components, and React Testing Library, among others.

The Wrapper styled component in components/Alert utilizes conditional styling to determine whether it is green/red based on given props.

The NewTidbit container has full unit testing.

#### Testing Note:
You can test just the NewTidbit container with:

* `jest "NewTidbit"`

Running `npm test` will run all tests, throwing errors for there not being any tests for some components. 

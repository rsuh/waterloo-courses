// Import other components
import React from 'react';
import Weather from './components/Weather/weather.js'
import Course from './components/Course/Course.js'
import CourseList from './components/CourseList/CourseList.js'
// import $ from 'jquery';

// Import API
import api from './api/api.js'

// Import Css
import './App.css';

// Import logos/images
import logo from './logo.svg';

// Font Ubuntu
{/* <link href="https://fonts.googleapis.com/css?family=Ubuntu:400,500" rel="stylesheet"> */}

// Client-side apps can't hide API-keys
var apiKey = '1f20a62a6fd01d5bdbe088a3fa8e6510';
// TODO: Make a config.json file, gitignore it, and include the file here. https://gist.github.com/derzorngottes/3b57edc1f996dddcab25

var courseURL = "https://api.uwaterloo.ca/v2/terms/"
var termURL = "https://api.uwaterloo.ca/v2/terms/list.json"
var subjectsURL = "https://api.uwaterloo.ca/v2/codes/subjects.json"

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="App">
        {/* Latest compiled and minified CSS */}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        
        <div className="App-header"></div>
        {/* <Button bsStyle="info">Right</Button> */}
        <CourseList courseURL={courseURL} termURL={termURL} subjectsURL={subjectsURL} apiKey={apiKey} />
      </div>
    );
  }
}

export default App;

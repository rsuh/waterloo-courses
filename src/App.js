import React from 'react';

// Import Consts
import { API_KEY, COURSE_URL, TERM_URL, SUBJECTS_URL } from './constants/index'

// Import Components
import Weather from './components/Weather/index'
import Course from './components/Course/index'
import CourseList from './components/CourseList/index'

// Import API
import api from './api/index'

// Import Css
import './App.css';

// Import logos/images
import logo from './logo.svg';

// var courseURL = "https://api.uwaterloo.ca/v2/terms/"
// var termURL = "https://api.uwaterloo.ca/v2/terms/list.json"
// var subjectsURL = "https://api.uwaterloo.ca/v2/codes/subjects.json"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users: []}
  }

  render() {
    return (
      <div className="App">
        {/* Latest compiled and minified CSS */}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />

        <div className="App-header"></div>
        {/* <Button bsStyle="info">Right</Button> */}
        {<CourseList
          courseURL={COURSE_URL}
          termURL={TERM_URL}
          subjectsURL={SUBJECTS_URL}
        />}
      </div>
    );
  }
}

export default App;

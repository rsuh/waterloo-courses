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

// Client-side apps can't hide API-keys
// var apiKey = '1f20a62a6fd01d5bdbe088a3fa8e6510';
// TODO: Make a config.json file, gitignore it, and include the file here. https://gist.github.com/derzorngottes/3b57edc1f996dddcab25
// var courseURL = "https://api.uwaterloo.ca/v2/terms/"
// var termURL = "https://api.uwaterloo.ca/v2/terms/list.json"
// var subjectsURL = "https://api.uwaterloo.ca/v2/codes/subjects.json"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users: []}
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        {/* Latest compiled and minified CSS */}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />

        <div className="App-header"></div>
        {/* <Button bsStyle="info">Right</Button> */}
        {/*<CourseList
          courseURL={COURSE_URL}
          termURL={TERM_URL}
          subjectsURL={SUBJECTS_URL}
        />*/}
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }
}

export default App;

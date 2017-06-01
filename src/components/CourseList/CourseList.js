import React from 'react';
import api from '../../api/api.js';
import Select from 'react-select';
import Course from '../Course/Course.js'

// Import CSS from CourseList/styles.css
import './styles.css';
import 'react-select/dist/react-select.css';

class CourseList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      termResponse: null,
      termValue: {
        value: null, // For rendering
        label: null // For searching
      },
      subjectResponse: null,
      subjectValue: {
        value: null,
        label: null,
      },
      courseResponse: null
    };
    
    // So this.state is defined in these functions
    this.setTermValue = this.setTermValue.bind(this);
    this.setSubjectValue = this.setSubjectValue.bind(this);
  }

  componentDidMount() {
    api.getData(this.props.termURL + "?key=" + this.props.apiKey).then((response) => {
      this.setState({
        termResponse: response,
        termValue: {
          value: response.data.current_term,
          label: response.data.current_term
        }
      });
    });
    
    api.getData(this.props.subjectsURL + "?key=" + this.props.apiKey).then((response) => {
      this.setState({
        subjectResponse: response
      });
    });
  }
  
  // Private (Within Component only)
  getCourseData(termValue, subjectValue) {
    api.getData(this.props.courseURL + termValue + "/" + subjectValue + "/schedule.json?key=" + this.props.apiKey).then((response) => {
      // console.log("response " + JSON.stringify(response));
      console.log("success");
      this.setState({
        courseResponse: response
      });
    });    
    console.log(this.state.courseResponse);
  }
  
  setTermValue(value) {
    console.log("term changed " + JSON.stringify(value));
    this.setState((prevState) => {
      return {termValue: value}
    });
  }
  
  setSubjectValue(subject) {
    // If value != null and term != null, make api call
    if (subject != null && this.state.termValue != null) {
      console.log(subject);
      console.log(this.state.termValue);
      // Takes a while so have a spinning animation?
      this.getCourseData(this.state.termValue.value, subject.value);
      
      console.log("subjects changed " + JSON.stringify(subject));
      this.setState({
        subjectValue: subject
      });
    } else {
      console.log("ERROR: Term and Subject must be set");
    }
  }
  
  parseTermData() {
    const termData = this.state.termResponse.data;
    return [
      { value: termData.previous_term, label: termData.previous_term},
      { value: termData.current_term, label: termData.current_term},
      { value: termData.next_term, label: termData.next_term}
    ];
  }
  
  parseSubjectData() {
    const subjectData = this.state.subjectResponse.data;
    // console.log("subjectData " + JSON.stringify(subjectData));
    var subjectArray = subjectData.map(function(obj, index) {
      return { "value": obj.subject, "label": obj.subject };
    });
    return subjectArray;
    // console.log(JSON.stringify(subjectArray));
  }
  
  render() {
    if ((!this.state.termResponse) || (!this.state.subjectResponse)) {
      return (
        <p>Loading...</p>
      )
    }
    
    const courseResponse = this.state.courseResponse;
    console.log("courseResponse " + courseResponse);

    // Return here
    return (
      <div>
        <h2>CourseList component</h2>
        <Select
          name="form-field-name"
          value={this.state.termValue}
          options={this.parseTermData()}
          onChange={this.setTermValue}
        />
        
        <Select
          name="form-field-name"
          value={this.state.subjectValue}
          options={this.parseSubjectData()}
          onChange={this.setSubjectValue}
        />
        
        <Course data={courseResponse} />

      </div>
    );
  }
}

export default CourseList;
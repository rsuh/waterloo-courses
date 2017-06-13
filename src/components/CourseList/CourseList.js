import React from 'react';
import api from '../../api/api.js';
import Select from 'react-select';
import Course from '../Course/Course.js'
import { Button } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

// Import CSS from CourseList/styles.css
import './styles.css';
import 'react-select/dist/react-select.css';

class CourseList extends React.Component {
  constructor(props) {
    super(props);

    // termResponse : Getting all possible terms (1175, 1179)
    // subjectResponse : Getting all possible subjects (CS, MATH)
    // courseResponse : Getting all data for a specific subject (CS)
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
    
    // -> this.state is defined in these functions
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
  
  // Private
  getCourseData(termValue, subjectValue) {
    api.getData(this.props.courseURL + termValue + "/" + subjectValue + "/schedule.json?key=" + this.props.apiKey).then((response) => {
      this.setState({
        courseResponse: response
      });
    });    
    console.log(this.state.courseResponse);
  }
  
  setTermValue(value) {
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
    var subjectArray = subjectData.map(function(obj, index) {
      return { "value": obj.subject, "label": obj.subject };
    });
    return subjectArray;
  }
  
  render() {
    // JS for rendering
    if ((!this.state.termResponse) || (!this.state.subjectResponse)) {
      return (
        <p>Loading...</p>
      )
    }
    
    // Weird thing happening with null courseResponse
    const courseResponse = this.state.courseResponse;

    // Return here
    return (
      <Grid className="newContainer">
        <Row>
          <Col xs={4} md={4} lg={4}>
            <div className="dashboard-sidebar">
              <h3 className="term-header">Term</h3>
              <Select
                name="form-field-name"
                value={this.state.termValue}
                options={this.parseTermData()}
                onChange={this.setTermValue}
              />
              <h3 className="subject-header">Subject</h3>
              <Select
                name="form-field-name"
                value={this.state.subjectValue}
                options={this.parseSubjectData()}
                onChange={this.setSubjectValue}
              />
            </div>
            
            {/* Have filters to sort by online/instructors/full or not full/ etc */}
          </Col>
          <Col xs={8} md={8} lg={8}>
            <div className="dashboard-results">
              <Course courseData={courseResponse} />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default CourseList;
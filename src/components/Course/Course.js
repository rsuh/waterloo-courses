import React from 'react';
import _ from 'underscore'

// Import CSS from Course/styles.css
import './styles.css';

class Course extends React.Component {  
  constructor(props) {
    super(props);    
  }
  
  // Pass term into this component, and the component should update if the term is changed
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.courseData !== nextProps.courseData) {
      return true;
    }
    return false;
  }
  
  // Private
  formatCourseData() {
    var courseData = this.props.courseData.data;
    
    courseData.sort((a, b) => {
      return a.catalog_number - b.catalog_number;
    });

    var groupedCourses = _.groupBy(courseData, 'catalog_number');

    var a = Object.keys(groupedCourses).map(function(key, index) {

      // Array of same catalog_number courses
      var courseArray = groupedCourses[key]
      console.log(courseArray[0].subject);
      
      var q = courseArray.map((obj, index) => {
        // Return for q
        return (
          <tr key={index}>
            <td>{obj.section}</td>
            <td>{obj.class_number}</td>
            <td>{obj.campus}</td>
            <td>{obj.enrollment_total}/{obj.enrollment_capacity}</td>
            <td>{obj.subject} {obj.catalog_number} - {obj.title}</td>
            {/* , {obj.subject} {obj.catalog_number}, {obj.title}, {obj.campus} {obj.enrollment_total}/{obj.enrollment_capacity} */}
          </tr>
        );
      });
      
      // return for outer map
      return (
        <div className="courseCards" key={index}>
          <h3>{courseArray[0].subject} {key} - {courseArray[0].title}</h3>
          <table>
            <thead>
              <tr>
                <td>Section</td>
                <td>Class</td>
                <td>Campus</td>
                <td>Enrolled</td>
                <td>Time</td>
                <td>Location</td>
                <td>Instructor(s)</td>
              </tr>
            </thead>
            <tbody>
              {q}
            </tbody>
          </table>
        </div>
      );
    });
    // console.log("a is " + JSON.stringify(a));
    return a;
    
    // groupedCourses.forEach((obj, index) => {
    // courseData = _.each((groupedCourses, (value, key, list)) => {
      // Sort classses by catalog_number, take out grad/ courses catalog_num < 100
      
    // });
    // return a;
    // return courseData;
    // console.log("groupedCourses " + JSON.stringify(groupedCourses));
    // return groupedCourses;
  }

  render() {
    // If null courseData, return null p tag
    if (!this.props.courseData) return (<p></p>);
    
    console.warn(this.props.courseData.data[0]);
    // Tutorials are going to be in one block, lectures in another block.
    return (
      <div>
        <h2>Course</h2>
        {this.formatCourseData()}
      </div>
    );
  }
}

export default Course;
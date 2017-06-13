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
  sortCourseData() {
    var courseData = this.props.courseData.data;

    courseData.sort((a, b) => {
      return a.catalog_number - b.catalog_number;
    });

    return courseData;
  }
  
  formatCourseData() {
    var sortedCourses = this.sortCourseData();
    var groupedCourses = _.groupBy(sortedCourses, 'catalog_number');

    groupedCourses = Object.keys(groupedCourses).map(function(key, index) {

      // Array of same catalog_number courses
      var courseArray = groupedCourses[key]
      // console.log(courseArray[0].subject);
      
      var specificCourseArray = courseArray.map((obj, index) => {
        // Return for q
        return (
          <tr key={index}>
            <td>{obj.section}</td>
            <td>{obj.class_number}</td>
            <td>{obj.campus}</td>
            <td>{obj.enrollment_total}/{obj.enrollment_capacity}</td>
            {/* <td>{obj.subject} {obj.catalog_number} - {obj.title}</td> */}
            {/* , {obj.subject} {obj.catalog_number}, {obj.title}, {obj.campus} {obj.enrollment_total}/{obj.enrollment_capacity} */}
          </tr>
        );
      });
      
      // return for outer map
      return (
        <div className="courseCards" key={index}>
          <div className="courseBanner">
            <h3 className="courseSubject">{courseArray[0].subject} {key}</h3> 
            <h3 className="courseTitle">{courseArray[0].title}</h3>
          </div>
          <table className="courseTable">
            <thead>
              <tr className="courseTableHeadRow">
                <td>Section</td>
                <td>Class</td>
                <td>Campus</td>
                <td>Enrolled</td>
                {/* <td>Time</td>
                <td>Location</td>
                <td>Instructor(s)</td> */}
              </tr>
            </thead>
            <tbody>
              {specificCourseArray}
            </tbody>
          </table>
        </div>
      );
    });
    
    return groupedCourses;
  }

  render() {
    // If null courseData, return null p tag
    if (!this.props.courseData) return (<p></p>);
    
    console.warn(this.props.courseData.data[0]);
    // Tutorials are going to be in one block, lectures in another block.
    return (
      <div>
        <h3>Course</h3>
        {this.formatCourseData()}
      </div>
    );
  }
}

export default Course;
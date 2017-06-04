import React from 'react';

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
    
    courseData = this.props.courseData.data.map((obj, index) => {
      // Sort classses by catalog_number, take out grad/ courses catalog_num < 100
      return (
        <tr key={index}>
          <td>{obj.subject} {obj.catalog_number} - {obj.title}</td>
          <td>{obj.section}</td>
          <td>{obj.class_number}</td>
          <td>{obj.campus}</td>
          <td>{obj.enrollment_total}/{obj.enrollment_capacity}</td>
          {/* , {obj.subject} {obj.catalog_number}, {obj.title}, {obj.campus} {obj.enrollment_total}/{obj.enrollment_capacity} */}
        </tr>
      );
    });
    return courseData;
  }
  
  
  
  render() {
    // If null courseData, return null p tag
    if (!this.props.courseData) return (<p></p>);
    
    console.warn(this.props.courseData.data[0]);
    // Tutorials are going to be in one block, lectures in another block.
    return (
      <div>
        <h2>Course</h2>
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Section</th>
              <th>Class</th>
              <th>Campus</th>
              <th>Enrolled</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            
            
          </tbody>
          {this.formatCourseData()}
        </table>
        
      </div>
    );
  }
}

export default Course;
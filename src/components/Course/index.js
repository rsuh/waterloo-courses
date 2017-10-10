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
  // Sorts courses numerically
  sortCourseData() {
    var courseData = this.props.courseData.data;

    courseData.sort((a, b) => {
      return a.catalog_number - b.catalog_number;
    });

    return courseData;
  }

  // REFACTOR THIS PLEASE
  formatCourseData() {
    // Maybe have something that filters out useless courses
    var sortedCourses = this.sortCourseData();
    var groupedCourses = _.groupBy(sortedCourses, 'catalog_number');

    groupedCourses = Object.keys(groupedCourses).map((key, index) => {
      // Array of same catalog_number courses, sorted by LEC, LABS, TST
      var courseArray = groupedCourses[key].sort((a, b) => {
        var sectionNumA = a.section.substr(a.section.length - 3);
        var sectionNumB = b.section.substr(b.section.length - 3);

        return sectionNumA - sectionNumB;
      });

      // Maps through the courseArray
      var specificCourseArray = courseArray.map((course, index) => {
        var dates = course.classes.map((course, index) => {
          return (
            <div key={index}>
              {course.date.start_time} to {course.date.end_time} {course.date.weekdays}
            </div>
          );
        });

        // Return instructors
        var instructorList = course.classes.map((course, index) => {
          var instructors = course.instructors.map((course, index) => {
            return (
              <div>
                {course}
              </div>
            );
          });

          return instructors;
        });

        // Return location
        var location = course.classes.map((course, index) => {
          console.log(course);
          return (
            <div key={index}>
              {course.location.building} {course.location.room}
            </div>
          );
        });

        // Return for q
        return (
          <tr key={index}>
            <td className="section">{course.section}</td>
            <td className="class">{course.class_number}</td>
            <td className="campus">{course.campus}</td>
            <td className="enrolled">{course.enrollment_total}/{course.enrollment_capacity}</td>
            <td className="dates">{dates}</td>
            <td className="location">{location}</td>
            <td className="instructors">{instructorList}</td>
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
                <td className="section">Section</td>
                <td className="class">Class</td>
                <td className="campus">Campus</td>
                <td className="enrolled">Enrolled</td>
                <td className="dates">Dates</td>
                <td className="location">Location</td>
                <td className="instructors">Instructor(s)</td>
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

    return (
      <div>
        <h3>Course</h3>
        {this.formatCourseData()}
      </div>
    );
  }
}

export default Course;

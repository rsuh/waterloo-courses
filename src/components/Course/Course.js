import React from 'react';

// Import CSS from Course/styles.css
import './styles.css';

class Course extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      test: "hello"
    };
    
    
  }
  
  componentDidUpdate() {
    console.log("receiving");
    console.log(this.props.data);
    this.setState({
      test: this.props.data
    });
  }
  
  render() {
    return (
      <div>
        <h2>Course</h2>
        {this.props.data}
      </div>
    );
  }
}

export default Course;
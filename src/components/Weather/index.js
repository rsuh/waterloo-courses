import React from 'react';
import Api from 'uwaterloo-api';

// Import CSS
import './weather.css';

class Weather extends React.Component {
  render() {
    return (
      <div className="weather-comp">
        <h2>Today's Weather</h2>
        {/* Weather in Celcius, put farenheight later */}
        <p>Current: {this.props.weatherData.data.temperature_current_c}</p>
        <p>High: {this.props.weatherData.data.temperature_24hr_min_c}</p>
        <p>Low: {this.props.weatherData.data.temperature_24hr_max_c}</p>
      </div>
    );
  }
}

export default Weather;

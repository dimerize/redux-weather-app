import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
      location: '',
      changes: 0,
      data: {}
  };
  
  fetchData = (event) => {
    event.preventDefault();

    const API_KEY = "b0043e0f630d7030d52263ad7343273a";
    let location = encodeURIComponent(this.state.location);
    let urlPrefix = "http://api.openweathermap.org/data/2.5/forecast?q=";
    let urlSuffix = "&APPID=" + API_KEY + "&units=imperial";
    let url = urlPrefix + location + urlSuffix;

    fetch(url).then(r => r.json())
      .then(j => this.setState({
        data: j
      }))
      .catch(e => console.log("Error: ", e));
  };

  changeLocation = (event) => {
    this.setState({location: event.target.value, changes: this.state.changes + 1});
  };

  placeholderValue = () => {
    if (this.state.changes === 0) return "City, Country";
    return "";
  }

  render() {
    let currentTemp = "Specify a location!";
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
    }
    return (
      <div>
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <label>I want to know the weather for
            <input
              placeholder={this.placeholderValue()}
              type="text"
              value={this.state.location}
              onChange={this.changeLocation}
            />
          </label>
        </form>
        <p className="temp-wrapper">
          <span className="temp">{currentTemp}</span>
          <span className="temp-symbol">°F</span>
        </p>
      </div>
    );
  }
}

export default App;
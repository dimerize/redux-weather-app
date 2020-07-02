import React from 'react';
import './App.css';
import Plot from './Plot.js';
import { connect } from 'react-redux';
import { changeLocation } from './Actions';

class App extends React.Component {
  state = {
      location: '',
      changes: 0,
      data: {}
  };
  
  fetchData = (event) => {
    event.preventDefault();

    const API_KEY = "b0043e0f630d7030d52263ad7343273a";
    let location = encodeURIComponent(this.props.location);
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
    this.props.dispatch(changeLocation(event.target.value));
  };

  placeholderValue = () => {
    if (this.state.changes === 0) return "City, Country";
    return "";
  }

  render() {
    let currentTemp = "N/A";
    let dates = [];
    let temps = [];
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
      for (let i = 0; i < this.state.data.list.length; i++) {
        dates.push(this.state.data.list[i].dt_txt);
        temps.push(this.state.data.list[i].main.temp);
      }
    }
    return (
      <div class="main-container">
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <label>I want to know the weather for
            <input
              placeholder={this.placeholderValue()}
              type="text"
              value={this.props.location}
              onChange={this.changeLocation}
            />
          </label>
        </form>
        <section>
          <div class="temp-wrapper">
            <p id="temp-wrapper">
              <span className="temp">{currentTemp}</span>
              <span className="temp-symbol">°F</span>
            </p>
          </div>
          <div class="graph-wrapper">
            <Plot
              xData={dates}
              yData={temps}
              type="bar"
            />  
          </div>
        </section>  
      </div>
    );
  }
}

function mapStateToProps(state) {
  
	return {
		location: state.location
	};
}

export default connect(mapStateToProps)(App);
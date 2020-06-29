import React from 'react';
import Plotly from 'plotly.js';

class Plot extends React.Component {
  drawPlot = () => {
    Plotly.newPlot('plot', [{
      x: this.props.xData,
      y: this.props.yData,
      type: this.props.type
    }], {
      margin: {
        t: 0, r: 0, l: 30
      },
      xaxis: {
        gridcolor: 'transparent'
      }, 
      yaxis: {
        gridcolor: 'transparent'
      }
    }, {
      displayModeBar: false
    });
  }
  
  componentDidMount() {
    this.drawPlot();
  }

  componentDidUpdate() {
    this.drawPlot();
  }

  render() {
    return (
      <div id="plot"></div>
    );
  }
}


export default Plot;
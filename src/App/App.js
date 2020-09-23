import React from 'react';
import './App.css';
import { Insight } from '../InSight/InSight';
import { WeatherBox } from '../WeatherBox/WeatherBox';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      solsList: [],
      latestSol: '',
      avTemp: '',
      fahrenheit: false,
      tempSymbol: 'c',
    }


    this.insightData = this.insightData.bind(this);
    this.fahrenheit = this.fahrenheit.bind(this);
    this.toggleTemp = this.toggleTemp.bind(this);
  }

  insightData() {
    Insight.data()
    .then(jsonResponse => {
      const solsList = jsonResponse.sol_keys;
      const solLength = solsList.length;
      const latestSol = solsList[solLength-1];
      const latestAvTemp = Math.round(jsonResponse[latestSol].AT.av);
      

      this.setState({
        data: jsonResponse,
        latestSol: latestSol,
        avTemp: latestAvTemp,
        solsList: solsList
      })
    });
  }

  fahrenheit() {
    const avTemp = Math.round((this.state.avTemp * 1.8) + 32);
    this.setState({
      avTemp: avTemp,
      fahrenheit: true,
      tempSymbol: 'f'
    })
  }

  toggleTemp() {
    if (this.state.fahrenheit) {
      const avTemp = Math.round((this.state.avTemp - 32) / 1.8);
      this.setState({
        avTemp: avTemp,
        fahrenheit: false,
        tempSymbol: 'c',
      })
    } else {
      this.fahrenheit();
    }
  }


  componentDidMount() {
    window.addEventListener('load', (event) => {
      this.insightData();
    });
  }

  render() {

    return (
      <div className="welcome">
        <h1>Welcome to Elysium Planitia</h1>
        <div className="welcome-info">
          <p>Home to NASA's InSight mission on Mars!</p>
          <p>The latest data is from Sol: {this.state.latestSol}. </p>
    <p>Today the Average Temperature is: {this.state.avTemp}&deg;{this.state.tempSymbol}</p>
          <div className="toggle">
            <input onClick={this.toggleTemp} type="checkbox" />
            <label for="" className="onbtn">&deg;c</label>
            <label for="" className="offbtn">&deg;f</label>
          </div>
        </div>
        <WeatherBox data={this.state.data} fahrenheit={this.state.fahrenheit} 
                    tsymbol={this.state.tempSymbol}  solsList={this.state.solsList} />
      </div>
    );
  }


};

export default App;

import React from 'react';
import { Weather } from '../Weather/Weather';
import './WeatherBox.css';

export class WeatherBox extends React.Component {


    render() {
        return (
            <div className="weather-box">
                {this.props.solsList.map(sol => {
                    return <Weather key={sol} sol={sol} minTemp={this.props.data[sol].AT.mn}
                                    maxTemp={this.props.data[sol].AT.mx} fahrenheit={this.props.fahrenheit}
                                    tsymbol={this.props.tsymbol}/>
                })}
            </div>
        );
    }
}
import React from 'react';
import './Weather.css';

export class Weather extends React.Component {



    render() {
        if (!this.props.fahrenheit) {
            return (
                <div className="weather">
                    <h3>Sol {this.props.sol}</h3>
                    <p className="line-seperator"></p>
                    <p>High: {Math.round(this.props.maxTemp)}&deg;c</p>
                    <p>Low: {Math.round(this.props.minTemp)}&deg;c</p>
                </div>
            );
        } else {
            const high = Math.round((this.props.maxTemp * 1.8) + 32);
            const low = Math.round((this.props.minTemp * 1.8) + 32);
            return (
                <div className="weather">
                    <h3>Sol {this.props.sol}</h3>
                    <p className="line-seperator"></p>
                    <p>High: {high}&deg;f</p>
                    <p>Low: {low}&deg;f</p>
                </div>
            );
        }
    }
}
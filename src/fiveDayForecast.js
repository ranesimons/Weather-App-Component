import React, { Component } from "react";

import "./fiveDayForecast.css";

const api = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=current,minutely,hourly,alerts&appid=858112897a31c29a89c2da90c699dd14";

export default class FiveDayForecast extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "0": {maximum: null, minimum: null, image: null, day: null},
            "1": {maximum: null, minimum: null, image: null, day: null},
            "2": {maximum: null, minimum: null, image: null, day: null},
            "3": {maximum: null, minimum: null, image: null, day: null},
            "4": {maximum: null, minimum: null, image: null, day: null},
        }
    }

    kelvinToFahrenheit(t) {
        return Math.round((t * (9 / 5)) - 459.67);
    }

    componentDidMount() {
        fetch(api).then(response => response.json()).then(json => {
            let previousDayCode = -1;
            for (let i = 0; i < 5; i++) {
                console.log(i);
                let today = json.daily[i];
                console.log(today.dt);
                let image = "http://openweathermap.org/img/wn/" + today.weather[0].icon + "@2x.png";
                let dayAsInteger = new Date(today.dt).getDay();
                if (previousDayCode < 0) {
                    previousDayCode = dayAsInteger
                } else {
                    previousDayCode = (previousDayCode + 1) % 7;
                    dayAsInteger = previousDayCode
                }
                let day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayAsInteger]
                let maximum = this.kelvinToFahrenheit(today.temp.max);
                let minimum = this.kelvinToFahrenheit(today.temp.min);
                this.setState({[i]: {maximum, minimum, image, day}})
            }
            console.log(this.state);
        })
    }

    render() {
        return (
            <div className="all">
                <div className="weather">
                    <h1 className="day">{this.state[0].day}</h1>
                    <img className="image" src={this.state[0].image}></img>
                    <div className="temperatures">
                        <h1 className="maximum">{this.state[0].maximum}</h1>
                        <h1 className="minimum">{this.state[0].minimum}</h1>
                    </div>
                </div>
                <div className="weather">
                    <h1 className="day">{this.state[1].day}</h1>
                    <img className="image" src={this.state[1].image}></img>
                    <div className="temperatures">
                        <h1 className="maximum">{this.state[1].maximum}</h1>
                        <h1 className="minimum">{this.state[1].minimum}</h1>
                    </div>
                </div>
                <div className="weather">
                    <h1 className="day">{this.state[2].day}</h1>
                    <img className="image" src={this.state[2].image}></img>
                    <div className="temperatures">
                        <h1 className="maximum">{this.state[2].maximum}</h1>
                        <h1 className="minimum">{this.state[2].minimum}</h1>
                    </div>
                </div>
                <div className="weather">
                    <h1 className="day">{this.state[3].day}</h1>
                    <img className="image" src={this.state[3].image}></img>
                    <div className="temperatures">
                        <h1 className="maximum">{this.state[3].maximum}</h1>
                        <h1 className="minimum">{this.state[3].minimum}</h1>
                    </div>
                </div>
                <div className="weather">
                    <h1 className="day">{this.state[4].day}</h1>
                    <img className="image" src={this.state[4].image}></img>
                    <div className="temperatures">
                        <h1 className="maximum">{this.state[4].maximum}</h1>
                        <h1 className="minimum">{this.state[4].minimum}</h1>
                    </div>
                </div>
            </div>
        );
    }
}
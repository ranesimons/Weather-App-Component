import React, { Component } from "react";
import Weather from "./weather";
import "./fiveDayForecast.css";

const api = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=current,minutely,hourly,alerts&appid=858112897a31c29a89c2da90c699dd14";

export default class FiveDayForecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [
                {maximum: null, minimum: null, image: null, day: null},
                {maximum: null, minimum: null, image: null, day: null},
                {maximum: null, minimum: null, image: null, day: null},
                {maximum: null, minimum: null, image: null, day: null},
                {maximum: null, minimum: null, image: null, day: null},
            ]
        }
    }

    kelvinToFahrenheit(t) {
        return Math.round((t * (9 / 5)) - 459.67);
    }

    getWeekDay(d) {
        let dayAsInteger = new Date(d * 1000).getDay();
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayAsInteger];
    }

    componentDidMount() {
        fetch(api).then(response => response.json()).then(json => {
            let updated = [];
            for (let i = 0; i < 5; i++) {
                let today = json.daily[i];
                let image = "http://openweathermap.org/img/wn/" + today.weather[0].icon + "@2x.png";
                let day = this.getWeekDay(today.dt);
                let maximum = this.kelvinToFahrenheit(today.temp.max);
                let minimum = this.kelvinToFahrenheit(today.temp.min);
                updated.push({maximum, minimum, image, day})
            }
            this.setState({results: updated});
        })
    }

    render() {
        const items = [];
        for (let i = 0; i < 5; i++) {
            items.push(<Weather key={i} day={this.state.results[i].day} image={this.state.results[i].image} maximum = {this.state.results[i].maximum} minimum={this.state.results[i].minimum}/>)
        }
        return (
            <div className="all">
                {items}
            </div>
        );
    }
}
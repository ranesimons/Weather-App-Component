import React, { Component } from "react";

import "./weather.css";

export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maximum: null,
            minimum: null,
            image: null,
            day: null
        }
    }

    componentDidUpdate() {
        // console.log(this.props);
        // console.log(this.state.maximum);
        if (this.props && !this.state.maximum) {
            this.setState(this.props);
        }
    }

    render() {
        return (
            <div className="weather">
                <h1 className="day">{this.state.day}</h1>
                <img className="image" src={this.state.image}></img>
                <div className="temperatures">
                    <h1 className="maximum">{this.state.maximum}</h1>
                    <h1 className="minimum">{this.state.minimum}</h1>
                </div>
            </div>
        );
    }
}
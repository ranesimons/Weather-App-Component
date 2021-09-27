import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";

import FiveDayForecast from "./fiveDayForecast";

class App extends Component {
    render() {
        return (
            <div className="App">
                <FiveDayForecast/>
            </div>
        );
    }
}

export default hot(module)(App);

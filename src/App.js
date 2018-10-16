import React, { Component } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props) 
      this.state = { city: "tehran", result: { temp:'', maxT:'', minT:'', weather:'' } };
    }

    componentDidMount() {
      this.calcWeather();
    }

    handleChange(name, e) {
      this.setState({
        [name]: e.target.value
      });
      console.log(this.state);
    }

    handleClick(e) {
      this.calcWeather();
    }

    calcWeather(){
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${
          this.state.city
        }&APPID=59b1a8aeaf5e5c86c8957f02d447c585&units=metric`
        )
        .then(res => {
          console.log(res);

          this.setState({ result: { temp: res.data.main.temp,
                                    maxT: res.data.main.temp_max,
                                    minT: res.data.main.temp_min,
                                    weather: res.data.weather.description
                                  
           } });
        })
        .catch(err => console.log(err));
    

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        
        <form>
          <p className="App-intro">
            <input
              value={this.state.city}
              onChange={this.handleChange.bind(this, "city")}
              type="text"
            />
            <button type="button" onClick={this.handleClick.bind(this, "city")}>
              show{" "}
            </button>  
          </p>
        </form>

        <p> Temperature: {this.state.result.temp} C </p>
        <p> Max Temperature {this.state.result.maxT} C </p>
        <p> Min Temperature {this.state.result.minT} C </p>
        <p> sky {this.state.result.weather} </p>

      </div>
    );
  }
}

export default App;

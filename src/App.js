import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import EventForm from "./components/EventForm";
import axios from "axios";

class App extends Component {
  render() {
    let message = "";
    return (
      <div className="App">
        <Header message={message} />
        <p className="App-intro">
          Welcome to On The Fly! Find an event near you!
        </p>
      </div>
    );
  }
}

export default App;

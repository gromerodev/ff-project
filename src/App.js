import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import Footer from "./components/Footer";
import { Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    let message = "";
    return (
      <div className="App">
        <Header message={message} />
        <p className="App-intro" />

        <div>
          <Route exact path="/" component={EventForm} />
          // <Route path="/EventsList" component={EventList} />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;

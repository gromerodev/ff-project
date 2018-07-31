import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import EventForm from "./components/EventForm";
import {BrowserRouter,Route} from "react-router-dom";
import EventList from "./components/EventList";
import Footer from "./components/Footer"

class App extends Component {
  render() {
    let message = "";
    return (
      <div className="App">
        <Header message={message} />
        <p className="App-intro">
        </p>

        <BrowserRouter>
        <div>
          <Route exact path="/" component={EventForm}/>
          <Route path = "/EventsList" component={EventList} />
        </div>  
        </BrowserRouter>
        <Footer />

        

      </div>
    );
  }
}

export default App;

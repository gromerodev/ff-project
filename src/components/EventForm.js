import React, { Component } from "react";
import axios from "axios";
import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickedOn: false,
      zipCode: 0,
      valid: false
    };

    // binding
    this.handleClick = this.handleClick.bind(this);
    this.SearchLocation = this.SearchLocation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  getValue(response) {
    let myarray = new Array("item1", "item2", "item3");
    let random = myarray[Math.floor(Math.random() * myarray.length)];
    //alert(random);
    if (response != null) {
      let responseArray = response.data._embedded.events;
      let item1 = responseArray[Math.floor(Math.random() * myarray.length)];
      let item2 = responseArray[Math.floor(Math.random() * myarray.length)];
      let item3 = responseArray[Math.floor(Math.random() * myarray.length)];

      if (this._message != null) {
        this._message.innerHTML = item1.value + item2 + item3;
      }
      console.log(response)

    }
  }
  handleClick() {
    this.setState(prevState => ({
      isClickedOn: !prevState.isClickedOn
    }));
  }

  SearchLocation(event) {
    event.preventDefault();

    navigator.geolocation.getCurrentPosition(
      data => {
        let coords = data.coords;
        if (!coords) {
          console.log("no position ☹️");
          return;
        }
        let lat = coords.latitude;
        let long = coords.longitude;
        console.log(`Lat: ${lat} | lon: ${long}`);
        // let {data}?? -yp
        //  set radius
        axios
          .get(
            `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=` +
              lat +
              `,` +
              long +
              `&radius=100&apikey=dDArWhA7pvjvWuFIsrdLTBUB3qjshF26`
          )
          .then(this.getValue)
          .catch(function(error) {
            console.log(error);
          });
      },
      error => {
        // if error
      }
    );

    Geocode.fromAddress(" ").then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      error => {
        console.error(error);
      }
    );
  }

  handleInputChange(event) {
    console.log(event.target.value);
    this.setState({
      zipCode: event.target.value,
      valid: this.checkValid(event.target.value)
    });
  }

  checkValid(zip) {
    // let someZip = ("" + zip).replace(/\D/g, "");
    // console.log(someZip);
    return (
      zip != null && zip.length === 5 && /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)
    );
  }

  render() {
    // this.location =this.props.coords;??? self suggestion -yp

    return (
      //  <Geolocated geolocated={this.state.geolocated}></Geolocated> -yp
      <div className="EvenFormContainer">
        <form className="EventForm" onSubmit={this.SearchLocation}>
          <h1 className="form-title">On The Fly</h1>
          <h2>Search for events near you</h2>
          <label className="EventFormLabel">
            <input
              className="search"
              placeholder="Enter a valid ZipCode (ex. &quot;90210&quot;)"
              type="text"
              name="search"
              min="0"
              pattern="[0-9]{5}"
              maxLength="5"
              onChange={this.handleInputChange}
            />
          </label>
          <form onSubmit>
            <label />
            <input class="btn2" type="submit" value="Search" />
          </form>
          {/* <button className="btn" type="submit">
          <input type="button" id="btnSearch" value="Search" onClick= {this.getValue()} />
          <p id="message" ref={(message) => this._message = message}></p>
            {this.state.isClickedOn ? "ON" : "OFF"}
            search
          </button> */}
          {/* <Link to={`/EventList=${this.state.zipCode}`}>
            <button className="btn" type="submit">
              Search
            </button>
          </Link> */}
          <ValidatedSubmit
            valid={this.state.valid}
            zipCode={this.state.zipCode}
          />
        </form>
      </div>
    );
  }
}

const ValidatedSubmit = props => {
  if (props.valid) {
    return (
      <Link to={`/EventList=${props.zipCode}`}>
        <button className="btn" type="submit">
          Use my Location
          {/* <input type="button" id="btnSearch" value="Search" onClick= {this.getValue()} />
          <p id="message" ref={(message) => this._message = message}></p> */}
        

        </button>
      </Link>
    );
  } else {
    return (
      <button className="btn" type="submit">
        Use my Location
      </button>
    );
  }
};


export default withRouter(EventForm);

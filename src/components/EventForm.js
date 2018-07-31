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
    this.searchByZip = this.searchByZip.bind(this);
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
      console.log("Response Array:", item1, item2, item3);
    }
  }
  handleClick() {
    this.setState(prevState => ({
      isClickedOn: !prevState.isClickedOn
    }));
  }

  // if we have time we will do state,zip,add
  // state = {
  //   address: {
  //     zipcode: ""
  //   }
  // };
  // Check the status of a single permission
  // componentDidMount() { // we need decide when do we want the "state" to change and what will happen-
  //   // this.setState({lad,long: data});
  // }
  SearchLocation(event, findByZip) {
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
          .then(this.getValue())
          .catch(function(error) {
            console.log(error);
          });
      },
      error => {
        // if error
      }
    );

    Geocode.fromAddress().then(
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
    // console.log(someZip);
    return (
      zip != null && zip.length === 5 && /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)
    );
  }

  async searchByZip(event) {
    event.preventDefault();
    console.log(this.state.zipCode);
    let { data } = await axios.get(
      "http://maps.googleapis.com/maps/api/geocode/json?address=" +
        this.state.zipCode
    );
    console.log(data);
    let lat = data.results[0].geometry.location.lat;
    let long = data.results[0].geometry.location.lng;

    if (!lat || !long) {
      console.log("no position ☹️");
      return;
    }
    console.log(`Lat: ${lat} | lon: ${long}`);
    // let {data}?? -yp
    //  set radius
    let response = await axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=` +
          lat +
          `,` +
          long +
          `&radius=100&apikey=dDArWhA7pvjvWuFIsrdLTBUB3qjshF26`
      )
      .catch(function(error) {
        console.log(error);
      });
    this.getValue(response);
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
          <input
            onClick={this.searchByZip}
            className="btn2"
            type="button"
            value="Search"
            id="search-by-zip"
          />
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

// export default geolocated({
//   positionOptions: {
//     enableHighAccuracy: false,
//   },
//   userDecisionTimeout: 1000,
// })(EventForm);

export default withRouter(EventForm);

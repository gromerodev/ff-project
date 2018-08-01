import React, { Component } from "react";
import axios from "axios";
import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { isV4Format } from "ip";
import EventList from "./EventList";

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickedOn: false,
      zipCode: 0,
      valid: false,
      results: []
    };

    // binding
    this.handleClick = this.handleClick.bind(this);
    this.SearchLocation = this.SearchLocation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getValue = this.getValue.bind(this);
    this.searchByZip = this.searchByZip.bind(this);
  }

  getRandomActivity(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getValue(response) {
    let myEventsArray = [];
    let myarray = [];
    let random = myarray[this.getRandomActivity(myarray.length)];
    if (response != null) {
      let responseArray = response.data._embedded.events;
      if (response.data._embedded.events) {
        let activityOne = responseArray.splice(
            this.getRandomActivity(responseArray.length - 1),
            1
          )[0],
          activityTwo = responseArray.splice(
            this.getRandomActivity(responseArray.length - 1),
            1
          )[0],
          activityThree = responseArray.splice(
            this.getRandomActivity(responseArray.length - 1),
            1
          )[0];
        myarray.push(activityOne, activityTwo, activityThree);
        console.log("data: ", myarray);

        this.mapResponse(myarray);
      }
    }
  }

  handleClick() {
    this.setState(prevState => ({
      isClickedOn: !prevState.isClickedOn
    }));
  }
  async SearchLocation(event) {
    event.preventDefault();
    try {
      navigator.geolocation.getCurrentPosition(async data => {
        let results = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=` +
            data.coords.latitude +
            `,` +
            data.coords.longitude +
            `&radius=100&apikey=dDArWhA7pvjvWuFIsrdLTBUB3qjshF26`
        );
        this.getValue(results);
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  handleInputChange(event) {
    console.log(event.target.value);
    this.setState({
      zipCode: event.target.value,
      valid: this.checkValid(event.target.value)
    });
  }
  checkValid(zip) {
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
    // console.log( data);

    if (data.results.length === 0) {
      console.log(`Please enter a vaild ZIPCODE`);
    } else {
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
  }

  mapResponse(res) {
    this.setState({ results: res });
    //this.props.history.push("/eventlist");
  }

  render() {
    return (
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
          search
        </button>
        {/* <Link to={`/EventList=${this.state.zipCode}`}>
          <button className="btn" type="submit">
            Search
          </button>
        </Link> */}
          <ValidatedSubmit
            valid={this.state.valid}
            zipCode={this.state.zipCode}
          />
          <div>
            <div>
              {this.state.results.map((event, index) => {
                console.log(event);
                return (
                  <div key={"ev" + index}>
                    <a href={event.url}>
                      <p>{event.name}</p>
                    </a>
                  </div>
                );
              })}
            </div>
            {/* <Route
              path="/eventlist"
              render={props => (
                <EventList {...props} results={this.state.results} />
              )}
            /> */}
          </div>
        </form>
      </div>
    );
  }
}

const ValidatedSubmit = props => {
  if (props.valid) {
    return (
      <button className="btn" type="submit" onClick={this.SearchLocation}>
        Use my Location
        {/* <input type="button" id="btnSearch" value="Search" onClick= {this.getValue()} />
        <p id="message" ref={(message) => this._message = message}></p> */}
      </button>
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

import React, { Component } from "react";
import axios from "axios";
import {geolocated} from 'react-geolocated';
import Geocode from "react-geocode";


class EventForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isClickedOn: false,
      zipCode: 0
    };

    // binding
    this.handleClick = this.handleClick.bind(this);
    this.SearchLocation = this.SearchLocation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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

  SearchLocation(event){
    event.preventDefault()

    navigator.geolocation.getCurrentPosition( (data)=>{
      let coords = data.coords;
      if(!coords){
        console.log("no position ☹️")
        return
      }
      let lat = coords.latitude;
      let long = coords.longitude;
      console.log(`Lat: ${lat} | lon: ${long}`)
      // let {data}?? -yp
      //  set radius
      axios
        .get(`https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=`+lat+`,`+long+`&radius=100&apikey=dDArWhA7pvjvWuFIsrdLTBUB3qjshF26`)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });

    },(error)=>{
      // if error
    });
    
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
  

  handleInputChange(event){
    console.log(event.target.value)
    this.setState({
      zipCode: event.target.value
    })
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
              placeholder="Zip Code"
              type="text"
              name="search"
              maxlength="5"
              pattern="[0-9]{5}"              
              onChange={this.handleInputChange}
            />
          </label>
           <button className="btn" type="submit">
                  {this.state.isClickedOn ? 'ON' : 'OFF'}
                   search
          </button>
        </form>
      </div>
    );
  }
}


// export default geolocated({
//   positionOptions: {
//     enableHighAccuracy: false,
//   },
//   userDecisionTimeout: 1000,
// })(EventForm);
export default EventForm;

import React, { Component } from "react";
import axios from "axios";
import {geolocated} from 'react-geolocated';


class EventForm extends Component {
  state = {
    address: {
      zipcode: ""
    }
  };

    // Check the status of a single permission 
    componentDidMount() { // we need decide when do we want the "state" to change and what will happen- 
      // this.setState({lad,long: data});

    
    }

  SearchLocation (){


   navigator.geolocation.getCurrentPosition((data)=>{
     // if sucess
    let coords = data.coords;
      if(!coords){
        return
      }
          let lat = coords.latitude;
          let long = coords.longitude;
         // let {data}?? -yp
          axios
            .get(`https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=`+lat+`,`+long+`&radius=30&size=1&apikey=dDArWhA7pvjvWuFIsrdLTBUB3qjshF26`)
            .then(function(response) {
            console.log(response);
            })
            .catch(function(error) {
            console.log(error);
            });

    },(error)=>{
      // if error
    });

  }


  
  render() {

    // this.location =this.props.coords;??? self suggestion -yp

    return (

      //  <Geolocated geolocated={this.state.geolocated}></Geolocated> -yp
      <div className="EvenFormContainer">
        <form className="EventForm">
          <h1 className="form-title">On The Fly</h1>
          <h2>Search for events near you</h2>
          <label className="EventFormLabel">
            <input
              className="search"
              placeholder="Zip Code"
              type="text"
              name="search"
            />
          </label>
           <button className="btn" onClick={this.SearchLocation()}>search</button>
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

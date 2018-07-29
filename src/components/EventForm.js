import React, { Component } from "react";

class EventForm extends Component {
  state = {
    address: {
      street: "",
      location: "",
      zipcode: ""
    }
  };
  render() {
    return (
      <div class="EvenFormContainer">
        <form class="EventForm">
          <h1 class="form-title">On The Fly</h1>
          <h2>Search for events near you!</h2>
          <label class="EventFormLabel">
            <input
              class="search"
              placeholder="State, City, Address, Zip Code.."
              type="text"
              name="search"
            />
          </label>
          <button class="btn">Search</button>
        </form>
      </div>
    );
  }
}

export default EventForm;

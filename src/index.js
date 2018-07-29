import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
<<<<<<< HEAD
import EventForm from './components/EventForm'
=======
import axios from "axios";




axios
  .get("https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=dDArWhA7pvjvWuFIsrdLTBUB3qjshF26")
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

  















>>>>>>> 163654a8407fb3878d8ab7333c94de8da629ac8f

ReactDOM.render(<EventForm />, document.getElementById('root'));
registerServiceWorker();

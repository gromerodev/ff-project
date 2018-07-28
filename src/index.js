import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import axios from "axios";




axios
  .get("https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=dDArWhA7pvjvWuFIsrdLTBUB3qjshF26")
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

  
















ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

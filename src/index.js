import React from 'react'; 
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import EventForm from './components/EventForm'
import axios from "axios";



function test (){
  axios
  .get("https://app.ticketmaster.com/discovery/v2/events.json?US&apikey=dDArWhA7pvjvWuFIsrdLTBUB3qjshF26")


  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });


}


  
















ReactDOM.render(<EventForm />, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import EventForm from './components/EventForm'

ReactDOM.render(<EventForm />, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const app = (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

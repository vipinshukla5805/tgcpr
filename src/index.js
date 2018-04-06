import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './app/reducers';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Route component={App} />
      </Router>
    </Provider>,
    
  document.getElementById('root')
);
registerServiceWorker();
